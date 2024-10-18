import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';
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
    // system: 'Vas a ser un exelente vendedor que al principio daras un cordiar saludo y ofrece la opcion de ver el menu de pizzas',
    system: `Vas a ser un exelente vendedor que al principio daras un cordiar saludo`,
    messages: convertToCoreMessages(messages),
    tools: {
      // server-side tool with execute function:
      showMenu: {
        description: 'Muestra todas las pizzas disponibles del menu',
        parameters: z.object({ message: z.string() }),
        execute: async ({}: { message: string }) => {
          const pizzas = [
            {
              name: 'Vegetariana',
              description: 'Pizza con una selección de vegetales frescos, incluyendo champiñones, pimientos y espinacas.',
              price: 240,
              image: 'https://neofungi.com/wp-content/uploads/2022/12/Pizza-Vegana-con-Champinones.jpg',
            },
            {
              name: 'Carnibora',
              description: 'Deliciosa pizza con pepperoni, jamón, salchicha y carne molida.',
              price: 210,
              image: 'https://img-global.cpcdn.com/recipes/8eb69fb7bc0085db/680x482cq70/pizza-la-carnivora-foto-principal.jpg',
            },
            {
              name: 'hawallana',
              description: 'Exquisita combinación de piña y jamón sobre una base de queso.',
              price: 260,
              image: 'https://www.shutterstock.com/image-photo/hawaiian-pizza-top-view-isolated-600w-2489392333.jpg',
            },
          ]
          return pizzas;
          // const weatherOptions = ['sunny', 'cloudy', 'rainy', 'snowy', 'windy'];
          // return weatherOptions[
          //   Math.floor(Math.random() * weatherOptions.length)
          // ];
        },
      },
      // client-side tool that starts user interaction:
      // askForConfirmation: {
      //   description: 'Ask the user for confirmation.',
      //   parameters: z.object({
      //     message: z.string().describe('The message to ask for confirmation.'),
      //   }),
      // },
      // // client-side tool that is automatically executed on the client:
      // getLocation: {
      //   description:
      //     'Get the user location. Always ask for confirmation before using this tool.',
      //   parameters: z.object({}),
      // },
    },
  });

  return result.toDataStreamResponse();
}
