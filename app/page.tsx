'use client';
import { ToolInvocation } from 'ai';
import { useChat } from 'ai/react';
import { Pizza }from '@/app/types/Pizza';
import { Drink } from '@/app/types/Drink';
import PizzaList from './_components/PizzaList';
import DrinkList from './_components/DrinkList';
import PizzaCardSkeleton from './_components/PizzaCardSkeleton';
import MessageBox from './_components/MessageBox';
import ChatOptionBox from './_components/ChatOptionBox';
import EmptyMessageBox from './_components/EmptyMessageBox';

export default function Chat() {
  const {
    error,
    addToolResult,
    input,
    setInput,
    isLoading,
    handleInputChange,
    handleSubmit,
    messages,
    reload,
    stop,
  } = useChat({
    api: '/api/use-chat-continue',
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === 'showMenu') {
        console.log('showMenu toolCall.args !!!!!!!!!', toolCall.args);
        console.log('showMenu toolCall.toolCallId !!!!!!!!!', toolCall.toolCallId);
      }

      if (toolCall.toolName === 'askForConfirmation') {
        console.log('askForConfirmation toolCall.args !!!!!!!!!', toolCall.args);
        console.log('askForConfirmation toolCall.toolCallId !!!!!!!!!', toolCall.toolCallId);
      }

      if (toolCall.toolName === 'sendRequest') {
        console.log('sendRequest toolCall.args !!!!!!!!!', toolCall.args);
        console.log('sendRequest toolCall.toolCallId !!!!!!!!!', toolCall.toolCallId);

      }
    },
    keepLastMessageOnError: true,
  });

  
  return (
    <div className="mb-40 flex flex-col w-full max-w-xl  mx-auto stretch">
      {messages.length === 0 && (<EmptyMessageBox />)} 

      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
            const toolCallId = toolInvocation.toolCallId;
            const addResult = (result: string) =>
              addToolResult({ toolCallId, result });
            
            

            if (toolInvocation.toolName === 'showMenu') {
              let pizzas: Pizza[] = [];
              if ('result' in toolInvocation) {
                pizzas = toolInvocation.result;
              }
              switch (toolInvocation.state) {
                case 'partial-call':
                  return <>TODO: Partial-call showMenu</>;
                case 'call':
                  return <div className='flex gap-2'>
                    {Array(3).fill(null).map(() => (<PizzaCardSkeleton />))}
                  </div>;
                case 'result':
                  return <>
                    <div key={toolCallId} className='mb-3'>
                      <PizzaList pizzas={pizzas} />
                    </div>
                  </>;

                default:
                  return (
                    <>
                      TODO: el envio de orden...
                    </>
                  )
              }
            }            

            if (toolInvocation.toolName === 'showDrinks') {
              let drinks: Drink[] = [];
              if ('result' in toolInvocation) {
                drinks = toolInvocation.result;
              }
              switch (toolInvocation.state) {
                case 'partial-call':
                  return <>TODO: Partial-call showDrinks</>;
                case 'call':
                  return <div className='flex gap-2'>
                    {Array(3).fill(null).map(() => (<PizzaCardSkeleton />))}
                  </div>;
                case 'result':
                  return <>
                    <div key={toolCallId} className='mb-3'>
                      <DrinkList drinks={drinks} />
                    </div>
                  </>;

                default:
                  return (
                    <>
                      TODO: Bebidas...
                    </>
                  )
              }
            }



            if (toolInvocation.toolName === 'askForConfirmation') {
              switch (toolInvocation.state) {
                case 'partial-call':
                  return <>TODO: Partial-call askForConfirmation</>;
                case 'call':
                  return <div className='flex gap-2'>
                    TODO: Skeleton preguntar por la confirmacion...
                  </div>;
                case 'result':
                  return <>
                    <div key={toolCallId} className='mb-3'>
                     TODO: Confirmar el envio de orden...
                    </div>
                  </>;

                default:
                  return (
                    <>
                      TODO: el envio de orden...
                    </>
                  )
              }
            }
            if (toolInvocation.toolName === 'sendRequest') {
              switch (toolInvocation.state) {
                case 'partial-call':
                  return <>TODO: Partial-call sendRequest</>;
                case 'call':
                  return <div className='flex gap-2'>
                    TODO: Skeleton pedido enviado...
                  </div>;
                case 'result':
                  return <>
                    <div key={toolCallId} className='mb-3'>
                     Tu pedido ha sido enviado...
                    </div>
                  </>;
                  default:
                    return (
                      <>
                        TODO: default pedido enviado...
                      </>
                    )
              }
            }

            
            return (<>{toolInvocation.toolName}</>)
            
          })}
          
           <MessageBox message={m} />
           
        </div>
      ))}

      {isLoading && (
        <div className="mt-4 text-gray-500">
          <div className="flex space-x-1">
          <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></div>
          <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce delay-300"></div>
        </div>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={stop}
          >
            Stop
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4">
          <div className="text-red-500">An error occurred.</div>
          <button
            type="button"
            className="px-4 py-2 mt-4 text-blue-500 border border-blue-500 rounded-md"
            onClick={() => reload()}
          >
            Retry
          </button>
        </div>
      )}


        <div className='fixed w-full bottom-0'>
        <form onSubmit={handleSubmit}>
          {messages.length === 0 && (
          <div className='flex flex-col gap-1 text-left mb-4'>
            <button
              onClick={() => {
                setInput('Muestrame el menu');
                handleSubmit();
              }}>
              <ChatOptionBox option={{ title: 'Mostrar menu', description: 'El chatbot te mostrara un listado de nuestras mejores pizzas'}} />
            </button>
          </div>
          )}

          <input
            className="w-full max-w-md p-2 mb-8 border b order-gray-300 rounded-full shadow-xl"
            value={input}
            placeholder="Enviame un mensaje..."
            onChange={handleInputChange}
            disabled={isLoading || error != null}
          />

          <button type="submit" className="bg-green-500 text-white ml-2 p-2 rounded-full hover:bg-green-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
              <path fill-rule="evenodd" d="M6.293 16.707a1 1 0 010-1.414L12.586 10 6.293 3.707a1 1 0 011.414-1.414l7 7a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>

      </form>
        </div>
    </div>
  );
}
