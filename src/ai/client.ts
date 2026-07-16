'use server';

/**
 * Unified AI Client with multi-provider fallback.
 * 
 * Tries providers in order: OpenRouter → Groq → Cerebras → Google AI (Gemini)
 * Falls through if one provider fails or is rate-limited.
 */

import { getProviderFallbackChain, type ProviderConfig } from './providers';

export interface AIChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIChatRequest {
  messages: AIChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIChatResponse {
  content: string;
  provider: string;
  model: string;
}

/**
 * Send a chat completion request with automatic provider fallback.
 */
export async function aiChatCompletion(request: AIChatRequest): Promise<AIChatResponse> {
  const chain = getProviderFallbackChain();

  if (chain.length === 0) {
    throw new Error('No AI providers are configured. Set at least one API key in .env.local');
  }

  const lastError: Error[] = [];

  for (const provider of chain) {
    try {
      const result = await tryProvider(provider, request);
      console.log(`[AI] ${provider.name} succeeded with model ${result.model}`);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.warn(`[AI] ${provider.name} failed: ${err.message}`);
      lastError.push(err);
    }
  }

  throw new Error(
    `All AI providers failed. Last errors: ${lastError.map(e => e.message).join('; ')}`
  );
}

/**
 * Extract the model to use for a given provider.
 */
function resolveModel(provider: ProviderConfig, preferred?: string): string {
  if (preferred && provider.models.includes(preferred)) return preferred;
  return provider.models[0];
}

/**
 * Try a single provider.
 */
async function tryProvider(
  provider: ProviderConfig,
  request: AIChatRequest
): Promise<AIChatResponse> {
  const model = resolveModel(provider, request.model);

  switch (provider.name) {
    case 'openrouter':
      return callOpenRouter(provider, request, model);
    case 'groq':
      return callGroq(provider, request, model);
    case 'cerebras':
      return callCerebras(provider, request, model);
    case 'google':
      return callGemini(provider, request, model);
    default:
      throw new Error(`Provider ${provider.name} not implemented`);
  }
}

/**
 * Call OpenRouter API.
 */
async function callOpenRouter(
  provider: ProviderConfig,
  request: AIChatRequest,
  model: string
): Promise<AIChatResponse> {
  const res = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'Tanzania Connect',
    },
    body: JSON.stringify({
      model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 4096,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter (${res.status}): ${text}`);
  }

  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    provider: 'openrouter',
    model: data.model,
  };
}

/**
 * Call Groq API.
 */
async function callGroq(
  provider: ProviderConfig,
  request: AIChatRequest,
  model: string
): Promise<AIChatResponse> {
  const res = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 4096,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Groq (${res.status}): ${text}`);
  }

  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    provider: 'groq',
    model: data.model,
  };
}

/**
 * Call Cerebras API.
 */
async function callCerebras(
  provider: ProviderConfig,
  request: AIChatRequest,
  model: string
): Promise<AIChatResponse> {
  const res = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${provider.apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: request.messages,
      temperature: request.temperature ?? 0.7,
      max_tokens: request.maxTokens ?? 4096,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cerebras (${res.status}): ${text}`);
  }

  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    provider: 'cerebras',
    model: data.model,
  };
}

/**
 * Call Google Gemini API.
 */
async function callGemini(
  provider: ProviderConfig,
  request: AIChatRequest,
  model: string
): Promise<AIChatResponse> {
  // Convert OpenAI-style messages to Gemini format
  const systemMsg = request.messages.find(m => m.role === 'system');
  const contents = request.messages
    .filter(m => m.role !== 'system')
    .map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

  const body: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature: request.temperature ?? 0.7,
      maxOutputTokens: request.maxTokens ?? 4096,
    },
  };

  // Gemini 2.5 supports system instruction via this field
  if (systemMsg) {
    body.systemInstruction = {
      parts: [{ text: systemMsg.content }],
    };
  }

  const res = await fetch(
    `${provider.baseUrl}/models/${model}:generateContent?key=${provider.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini (${res.status}): ${text}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  return {
    content: text,
    provider: 'google',
    model,
  };
}