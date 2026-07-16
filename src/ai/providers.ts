/**
 * AI Provider Configuration
 * 
 * Multi-provider setup with automatic fallback.
 * Providers are tried in order: OpenRouter → Groq → Cerebras → Google AI (Gemini)
 * 
 * Environment variables are loaded from .env.local (not committed to git).
 */

export type AIProvider = 'openrouter' | 'groq' | 'cerebras' | 'google' | 'ollama';

export interface ProviderConfig {
  name: AIProvider;
  apiKey: string;
  baseUrl: string;
  models: string[];
  enabled: boolean;
}

export interface AIProvidersConfig {
  primary: AIProvider;
  providers: Record<AIProvider, ProviderConfig>;
}

/**
 * Load API keys from environment variables and build provider config.
 */
export function getAIProvidersConfig(): AIProvidersConfig {
  const providers: Record<AIProvider, ProviderConfig> = {
    openrouter: {
      name: 'openrouter',
      apiKey: process.env.OPENROUTER_API_KEY || '',
      baseUrl: 'https://openrouter.ai/api/v1',
      models: ['openai/gpt-4o', 'anthropic/claude-3.5-sonnet', 'google/gemini-2.5-flash'],
      enabled: !!process.env.OPENROUTER_API_KEY,
    },
    groq: {
      name: 'groq',
      apiKey: process.env.GROQ_API_KEY || '',
      baseUrl: 'https://api.groq.com/openai/v1',
      models: ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768', 'gemma2-9b-it'],
      enabled: !!process.env.GROQ_API_KEY,
    },
    cerebras: {
      name: 'cerebras',
      apiKey: process.env.CEREBRAS_API_KEY || '',
      baseUrl: 'https://api.cerebras.ai/v1',
      models: ['llama3.1-8b', 'llama3.1-70b'],
      enabled: !!process.env.CEREBRAS_API_KEY,
    },
    google: {
      name: 'google',
      apiKey: process.env.GOOGLE_GENAI_API_KEY || '',
      baseUrl: 'https://generativelanguage.googleapis.com/v1beta',
      models: ['gemini-2.5-flash'],
      enabled: !!process.env.GOOGLE_GENAI_API_KEY,
    },
    ollama: {
      name: 'ollama',
      apiKey: process.env.OLLAMA_API_KEY || '',
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      models: ['llama3', 'mistral'],
      enabled: !!process.env.OLLAMA_API_KEY,
    },
  };

  return {
    primary: (process.env.AI_PRIMARY_PROVIDER as AIProvider) || 'openrouter',
    providers,
  };
}

/**
 * Resolve the fallback chain of providers.
 * Returns providers in priority order (primary first, then fallbacks).
 */
export function getProviderFallbackChain(): ProviderConfig[] {
  const config = getAIProvidersConfig();
  const chain: ProviderConfig[] = [];

  // Primary first
  if (config.providers[config.primary]?.enabled) {
    chain.push(config.providers[config.primary]);
  }

  // Fallbacks in order (skip primary since already added)
  const fallbackOrder: AIProvider[] = ['openrouter', 'groq', 'cerebras', 'google', 'ollama'];
  for (const name of fallbackOrder) {
    if (name !== config.primary && config.providers[name]?.enabled) {
      chain.push(config.providers[name]);
    }
  }

  return chain;
}