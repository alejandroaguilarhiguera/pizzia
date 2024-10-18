import { createGroq } from '@ai-sdk/groq';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const groq = createGroq({
  // custom settings
});
export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  // Call the language model
  const result = await streamText({
    model: groq('llama3-8b-8192'),
    system: 'vas a contestar text lorem',
    messages: convertToCoreMessages(messages),
    async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
      alert('Finish'+text);
      // implement your own logic here, e.g. for storing messages
      // or recording token usage
    },
  });

  // Respond with the stream
  return result.toDataStreamResponse();
}
