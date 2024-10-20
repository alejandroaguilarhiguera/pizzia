import { FC } from 'react';
import { ChatOption } from '@/app/types/ChatOption';

export interface ChatOptionProps {
    option: ChatOption;
}

const ChatOptionBox: FC<ChatOptionProps> = ({ option }) => {
    
    return (
        <div className='size-1/3 min-w-96 p-2 rounded bg-gray-100 text-left hover:bg-blue-100 hover:text-blue-800 transition-colors duration-300'>
            <p className='text-bold'>{option.title}</p>
            <p className='text-gray-500'>{option.description}</p>
        </div>
    )
}

export default ChatOptionBox;
