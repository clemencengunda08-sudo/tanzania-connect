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
 * Get all available keys for a provider (primary + fallbacks).
 * Rotates through keys if one gets rate-limited.
 */
export function getProviderKeys(envVar: string, fallbackEnvVar: string): string[] {
  const primary = process.env[envVar] || '';
  const fallbackStr = process.env[fallbackEnvVar] || '';
  const fallbacks = fallbackStr.split(',').filter(k => k.trim().length > 0);
  return [primary, ...fallbacks].filter(k => k.length > 0);
}

/**
 * Load API keys from environment variables and build provider config.
 */
export function getAIProvidersConfig(): AIProvidersConfig {
  const openrouterKeys = getProviderKeys('OPENROUTER_API_KEY', 'OPENROUTER_FALLBACK_KEYS');
  const groqKeys = getProviderKeys('GROQ_API_KEY', 'GROQ_FALLBACK_KEYS');
  const cerebrasKeys = getProviderKeys('CEREBRAS_API_KEY', 'CEREBRAS_FALLBACK_KEYS');
  const ollamaKeys = getProviderKeys('OLLAMA_API_KEY', 'OLLAMA_FALLBACK_KEYS');

  const providers: Record<AIProvider, ProviderConfig> = {
    openrouter: {
      name: 'openrouter',
      apiKey: openrouterKeys[0] || '',
      baseUrl: 'https://openrouter.ai/api/v1',
      models: ['openai/gpt-4o', 'anthropic/claude-3.5-sonnet', 'google/gemini-2.5-flash'],
      enabled: openrouterKeys.length > 0,
    },
    groq: {
      name: 'groq',
      apiKey: groqKeys[0] || '',
      baseUrl: 'https://api.groq.com/openai/v1',
      models: ['llama-3.3-70b-versatile', 'mixtral-8x7b-32768', 'gemma2-9b-it'],
      enabled: groqKeys.length > 0,
    },
    cerebras: {
      name: 'cerebras',
      apiKey: cerebrasKeys[0] || '',
      baseUrl: 'https://api.cerebras.ai/v1',
      models: ['llama3.1-8b', 'llama3.1-70b'],
      enabled: cerebrasKeys.length > 0,
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
      apiKey: ollamaKeys[0] || '',
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      models: ['llama3', 'mistral'],
      enabled: ollamaKeys.length > 0,
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