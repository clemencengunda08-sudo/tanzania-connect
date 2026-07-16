/**
 * AI Provider Integration
 * 
 * Uses multi-provider fallback: OpenRouter → Groq → Cerebras → Google AI (Gemini)
 * Falls back gracefully if the primary provider is unavailable.
 * 
 * For direct Genkit flows (structured output, tool use), Google AI (Gemini) is used
 * via @genkit-ai/google-genai. For general chat completion, the unified client
 * with fallback is used.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Google AI key is required for Genkit structured flows
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

export { aiChatCompletion } from './client';
export type { AIChatMessage, AIChatRequest, AIChatResponse } from './client';
export { getAIProvidersConfig, getProviderFallbackChain } from './providers';
export type { AIProvider, AIProvidersConfig, ProviderConfig } from './providers';