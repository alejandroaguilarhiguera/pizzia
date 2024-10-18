'use client';
import { ToolInvocation } from 'ai';
import { useChat } from 'ai/react';
import { Pizza }from '@/app/types/Pizza';

export default function Chat() {
  const {
    error,
    addToolResult,
    input,
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

        console.log('getAllPizzas toolCall.args !!!!!!!!!', toolCall.args);
        console.log('getAllPizzas toolCall.toolCallId !!!!!!!!!', toolCall.toolCallId);

      }
    },
    keepLastMessageOnError: true,
  });

  
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {




            // switch (toolInvocation.state) {
            //   case 'partial-call':
            //     return <>render partial tool call======</>;
            //   case 'call':
            //     return <>render full tool call+++++++++++</>;
            //   case 'result':
            //     return <>render tool result????????????</>;
            // }


            const toolCallId = toolInvocation.toolCallId;
            const addResult = (result: string) =>
              addToolResult({ toolCallId, result });

            // render confirmation tool (client-side tool with user interaction)
            if (toolInvocation.toolName === 'showMenu') {

              let pizzas: Pizza[] = [];
              if ('result' in toolInvocation) {
                pizzas = toolInvocation.result;
              }


              return (
                <div key={toolCallId}>
                  {toolInvocation.args.message}

                  <div>



                    {pizzas.map((pizza) => (
                      <div className='m-2 p-2 rounded overflow-hidden shadow-lg bg-white'>
                        <img className='w-full rounded' src={pizza.image} alt={pizza.name} />
                        <div className='px-6 py-4'>
                          <div className='font-bold text-xl mb-2'>{pizza.name}</div>
                          <p className='text-gray-700 text-base'>{pizza.description}</p>
                        </div>
                        <div className='px-6 pt-4 pb-2'>
                          <span className='text-gray-900 font-bold'>${pizza.price}</span>
                        </div>
                        <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                          Elegir
                        </button>
                        </div>
                      </div>
                    ))}
                  </div> 
                </div>
              );
            }



          })}
          {/* {m.role === 'user' ? 'User: ' : 'AI: '} */}
          {m.content}
        </div>
      ))}

      {isLoading && (
        <div className="mt-4 text-gray-500">
          <div>Loading...</div>
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

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          disabled={isLoading || error != null}
        />
      </form>
    </div>
  );
}
