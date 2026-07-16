'use server';
/**
 * @fileOverview An upgraded AI assistant that provides structured information and advice to foreigners in Tanzania.
 * 
 * - foreignerLocalAssistantQuery - A function that handles natural language queries and logs them to Firestore.
 * - ForeignerAssistantInput - The input type including query and sector context.
 * - ForeignerAssistantOutput - Structured response from Gemini with key points and follow-ups.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { db } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const InputSchema = z.object({
  query: z.string().describe('The natural language question from the user.'),
  sector: z.string().optional().describe('The sector context where the user is asking from.'),
  sourcePage: z.string().optional().describe('The URL or page name where the query originated.'),
  userType: z.string().optional().describe('Type of user: guest, investor, expat, etc.'),
  sessionId: z.string().optional().describe('Unique session identifier for tracking journeys.'),
});
export type ForeignerAssistantInput = z.infer<typeof InputSchema>;

const OutputSchema = z.object({
  answer: z.string().describe('The main AI-generated answer.'),
  relatedSectors: z.array(z.string()).describe('List of related sectors in the app.'),
  confidence: z.enum(['high', 'medium', 'low']).describe('AI confidence level.'),
  keyPoints: z.array(z.string()).optional().describe('Key takeaways or mandatory steps for the user.'),
  followUpQuestions: z.array(z.string()).optional().describe('Suggested next questions for the user.'),
});
export type ForeignerAssistantOutput = z.infer<typeof OutputSchema>;

export async function foreignerLocalAssistantQuery(
  input: ForeignerAssistantInput | string
): Promise<ForeignerAssistantOutput> {
  const normalizedInput = typeof input === 'string' 
    ? { query: input, sector: 'general' } 
    : input;
  return foreignerAssistantFlow(normalizedInput);
}

const prompt = ai.definePrompt({
  name: 'foreignerAssistantPrompt',
  input: { schema: InputSchema },
  output: { schema: OutputSchema },
  prompt: `You are Tanzania Reach's professional local assistant for foreigners, experts, and investors.
Your goal is to provide accurate, concise, and highly practical information about Tanzanian regulations, culture, and business environment.

Context Sector: {{{sector}}}
User Question: {{{query}}}

INSTRUCTIONS:
1. Be specific to Tanzania. Mention relevant agencies (TIC, BRELA, TRA, Immigration Dept) where applicable.
2. Maintain a professional, welcoming, and expert tone.
3. If the confidence is not 'high', provide a subtle note that the user should verify with official sources.
4. Extract 3-4 'keyPoints' that are most critical for the user to remember.
5. Suggest 2-3 'followUpQuestions' that would naturally follow this query.
6. Suggest related sectors from this list ONLY: [Immigration, Corporate, Agriculture, Infrastructure, Banking, Wildlife, Healthcare, Housing, Culture, Transport, Food & Drink, Entertainment].`,
});

const foreignerAssistantFlow = ai.defineFlow(
  {
    name: 'foreignerAssistantFlow',
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    if (!output) throw new Error('AI failed to generate a response.');

    if (db) {
      try {
        addDoc(collection(db, 'ai_queries'), {
          query: input.query,
          sector: input.sector || 'general',
          confidence: output.confidence,
          relatedSectors: output.relatedSectors,
          sourcePage: input.sourcePage || null,
          userType: input.userType || 'guest',
          sessionId: input.sessionId || null,
          timestamp: serverTimestamp(),
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        // Silent fail for logging to not block user response
      }
    }

    return output;
  }
);
