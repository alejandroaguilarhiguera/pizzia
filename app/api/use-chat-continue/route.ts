import { createGroq } from '@ai-sdk/groq';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;
const groq = createGroq({
  // custom settings
});
export async function POST(req: Request) {
  const { messages } = await req.json();

  // Call the language model
  const result = await streamText({
    model: groq('llama3-8b-8192'),
    maxTokens: 256, // artificial limit for demo purposes
    maxSteps: 10,
    experimental_continueSteps: true,
    system: 'vas a contestar con emojis, sin ningun texto',
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
