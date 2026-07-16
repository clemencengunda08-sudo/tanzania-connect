'use server';

/**
 * ElevenLabs Integration
 * Text-to-Speech and Music Generation
 */

export async function generateSpeech(params: {
  text: string;
  voiceId?: string;
  modelId?: string;
  stability?: number;
  similarityBoost?: number;
}): Promise<ArrayBuffer | null> {
  const apiKey = getElevenLabsKey();
  if (!apiKey) return null;

  const {
    text,
    voiceId = '21m00Tcm4TlvDq8ikWAM', // Rachel - default voice
    modelId = 'eleven_multilingual_v2',
    stability = 0.5,
    similarityBoost = 0.75,
  } = params;

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          voice_settings: {
            stability,
            similarity_boost: similarityBoost,
          },
        }),
      }
    );

    if (!res.ok) {
      console.warn(`[ElevenLabs] TTS failed: ${res.status}`);
      return null;
    }

    return res.arrayBuffer();
  } catch (error) {
    console.warn('[ElevenLabs] Error:', error);
    return null;
  }
}

export async function getElevenLabsVoices() {
  const apiKey = getElevenLabsKey();
  if (!apiKey) return [];

  try {
    const res = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: { 'xi-api-key': apiKey },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.voices || [];
  } catch {
    return [];
  }
}

function getElevenLabsKey(): string | null {
  // Try all keys from the user's list - rotate through fallbacks
  const keys = [
    process.env.ELEVENLABS_API_KEY,
    ...(process.env.ELEVENLABS_FALLBACK_KEYS || '').split(',').filter(Boolean),
  ];

  for (const key of keys) {
    if (key && key.startsWith('sk_')) return key;
  }
  return null;
}