import { createGroq } from '@ai-sdk/groq';
import { z } from 'zod';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;
const groq = createGroq({
  // custom settings
});


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
];

const system = [
  `Vas a ser un exelente vendedor que al principio daras un cordiar saludo`,
  `tienes disponible menu para mostrar`,
  `se requiere solicitar al usuario nombre, telefono celular, ubicacion para la entrega del pedido`,
  `al final vas a pedirle confirmar su orden para poder enviarlo al repartidor cocinero`,
].join(', ');

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Call the language model
  const result = await streamText({
    model: groq('llama3-8b-8192'),
    maxTokens: 256, // artificial limit for demo purposes
    maxSteps: 10,
    experimental_continueSteps: true,
    system,
    messages: convertToCoreMessages(messages),
    tools: {
      // server-side tool with execute function:
      showMenu: {
        description: 'Muestra todas las pizzas disponibles del menu',
        parameters: z.object({ message: z.string() }),
        execute: async ({}: { message: string }) => {
          return pizzas;
        },
      },

      askForConfirmation: {
        description: 'Pregunta al usuario si el pedido que fue completado y listo para enviar al cocinero',
        parameters: z.object({ message: z.string() }),
        execute: async ({}: { message: string }) => {
          console.log('');
          // return pizzas;
          return 'test2';
        },
      },

      sendRequest: {
        description: 'Enviar pedido al cocinero',
        parameters: z.object({ message: z.string() }),
        execute: async ({}: { message: string }) => {
          console.log('');
          // return pizzas;
          return 'test1';
        },
      }
    },
  });

  return result.toDataStreamResponse();
}
