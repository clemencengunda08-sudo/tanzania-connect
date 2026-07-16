'use server';
/**
 * @fileOverview AI Flow for automatically generating professional sector manuals for Tanzania Connect.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const InputSchema = z.object({
  sectorName: z.string().describe('The name of the sector (e.g., Agriculture, Mining, Tourism).'),
});
export type GenerateSectorInput = z.infer<typeof InputSchema>;

const OutputSchema = z.object({
  title: z.string().describe('Professional title for the manual.'),
  description: z.string().describe('A detailed, professional overview for experts and investors.'),
});
export type GenerateSectorOutput = z.infer<typeof OutputSchema>;

export async function generateSectorManual(input: GenerateSectorInput): Promise<GenerateSectorOutput> {
  return generateSectorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSectorPrompt',
  input: { schema: InputSchema },
  output: { schema: OutputSchema },
  prompt: `You are an expert economic consultant for the United Republic of Tanzania. 
Your task is to write a professional "Expert Manual" for the sector: {{{sectorName}}}.

REQUIREMENTS:
1. Tone: Highly professional, accurate, and welcoming for international investors and experts.
2. Content: Mention relevant Tanzanian regulatory bodies, opportunities for 2026, and practical logistical advice.
3. Length: Provide a comprehensive paragraph that covers the strategic importance of the sector.

Format the response as a JSON object with 'title' and 'description'.`,
});

const generateSectorFlow = ai.defineFlow(
  {
    name: 'generateSectorFlow',
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) throw new Error('AI failed to generate content.');
    return output;
  }
);
