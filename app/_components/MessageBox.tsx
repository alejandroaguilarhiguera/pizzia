import { FC } from 'react';
import dayjs from 'dayjs';
import { Message } from 'ai/react';
import IconBox from './IconBox';

export interface MessageBoxProps {
    message: Message
}

const MessageBox: FC<MessageBoxProps> = ({ message: m }) => {
    return (
        <>
          {m.role === 'user' && (
            <div className="flex gap-2 justify-end mb-4">
              <div className="relative bg-green-500 text-white p-3 rounded-b-lg rounded-l-lg min-w-96 max-w-xs">
                <p>{m.content}</p>
                <span className="text-xs text-gray-200 float-right">{dayjs(m.createdAt).format('HH:mm A')}</span>
              </div>
                <IconBox icon={m.role} />
            </div>
          )}

          {m.role === 'assistant' && m.content && (
            <div className="flex gap-2 justify-start mb-4">
                <IconBox icon={m.role} />
                <div className="bg-gray-300 text-black p-3 rounded-b-lg rounded-r-lg max-w-xs">
                  <p>{m.content}</p>
                  <span className="text-xs text-gray-600 float-right">{dayjs(m.createdAt).format('HH:mm A')}</span>
                </div>
            </div>
          )}
        </>
    )
}

export default MessageBox;