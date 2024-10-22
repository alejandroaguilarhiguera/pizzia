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
    sizes: [
      {
        name: 'Mediana',
        description: '8 Pedazos',
        price: 240,
      },
      {
        name: 'Grande',
        description: '20 Pedazos, pizza cuadrada',
        price: 300,
      }
    ],
    image: 'https://neofungi.com/wp-content/uploads/2022/12/Pizza-Vegana-con-Champinones.jpg',
  },
  {
    name: 'Carnibora',
    description: 'Deliciosa pizza con pepperoni, jamón, salchicha y carne molida.',
    sizes: [
      {
        name: 'Mediana',
        description: '8 Pedazos',
        price: 210,
      },
      {
        name: 'Grande',
        description: '20 Pedazos, pizza cuadrada',
        price: 280,
      }
    ],
    image: 'https://img-global.cpcdn.com/recipes/8eb69fb7bc0085db/680x482cq70/pizza-la-carnivora-foto-principal.jpg',
  },
  {
    name: 'hawallana',
    description: 'Exquisita combinación de piña y jamón sobre una base de queso.',
    sizes: [
      {
        name: 'Mediana',
        description: '8 Pedazos',
        price: 260,
      },
      {
        name: 'Grande',
        description: '20 Pedazos, pizza cuadrada',
        price: 340,
      }
    ],
    image: 'https://www.shutterstock.com/image-photo/hawaiian-pizza-top-view-isolated-600w-2489392333.jpg',
  },
];


const drinks = [
  {
    image: 'https://comercialtrevino.com/images/832.jpg',
    name: 'Coca-cola 600ml',
    price: 30,
  },
  {
    image: 'https://www.cityclub.com.mx/dw/image/v2/BGBD_PRD/on/demandware.static/-/Sites-soriana-grocery-master-catalog/default/dw361441d5/images/product/7501055302925_A.jpg?sw=1000&amp;sh=1000&amp;sm=fit',
    name: 'Coca-cola 2 litros',
    price: 60,
  },
]
const prompt = {
  pizzas,
  drinks,
}

const system = [
  `Vas a ser un exelente vendedor que al principio daras un cordiar saludo`,
  `tienes que tomar la orden al usuario el cual tienes que recabar la siguiente informacion: [tipo de pizza, tamaño, bebidas, ubicacion, nombre y telefono]`,
  `despues de recabar toda la informacion mostraras la cantidad total de dinero que sera el costo del pedido`,
  `Solo puedes enviar al cocinero cuando tengas el nombre, telefono, tipo de pizza y ubicacion del usuario`,
  `Una vez que se mande a llamar una funcion no envies mensaje`,
  `y preguntaras si quiere agregar algo mas a la orden o enviar el pedido al cocinero`,
  `1. para mostrar el menu de pizzas se tiene que mandar a llamar "showMenu"`,
  `2. para mostrar las bebidas disponibles se tiene que mandar a llamar "showDrinks"`,
  `3. una vez selecionada la pizza y las bebidas(opcional) se tiene que presentar el total de la orden y preguntar si el pedido esta listo para eso se llama "askForConfirmation"`,
  `4. una vez que el usuario confirma la orden entonces para enviar el pedido al cocinero se tiene que mandar a llamar "sendRequest"`,
  `json data: ${JSON.stringify(prompt)}`

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
        parameters: z.object({}),
        execute: async ({}: {}) => {
          console.log('pizza!!!!!!!!!!');
          return pizzas;
        },
      },

      showDrinks: {
        description: 'Muestra todas las bebidas disponibles a elegir',
        parameters: z.object({}),
        execute: async ({}: {}) => {
          console.log('drinks !!!!!!!!!')
          return drinks;
        },
      },

      askForConfirmation: {
        description: 'El asistente le pregunta al usuario si ya completo la orden',
        // parameters: z.object({ message: z.string() }),
        parameters: z.object({
          pizzaSelected: z.object({
            type: z.string().describe('Tipo de pizza que eligio el usuario'),
            size: z.string().describe('Tamaño de la pizza seleccionada'),
          }).describe('Pizza que selecciono el usuario'),
          drinks: z.array(z.string().describe('Bebida que seleciono el usuario')).describe('Bebidas que elige el usuario'),
          userName: z.string().describe('Nombre del usuario'),
          userPhone: z.string().describe('Telefono del usuario'),
          userLocation: z.string().describe('Ubicacion del usuario para la entrega'),
        }),
        execute: async (order: any) => {
          console.log('order------------', order );
          // return pizzas;
          // return '';
        },
      },

      sendRequest: {
        description: 'Enviar pedido al cocinero',
        parameters: z.object({}),
        execute: async ({}: { }) => {
          console.log('+++++++++++++ Se envia la orden a procesar');
          // return pizzas;
          
        },
      }
    },
  });

  return result.toDataStreamResponse();
}
