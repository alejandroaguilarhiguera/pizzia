import { FC } from 'react';

const PizzaCardSkeleton: FC = () => {
    return (
        <div className='w-32 rounded overflow-hidden shadow-lg bg-white animate-pulse'>
          <div className='w-full h-20 bg-gray-300'></div>
          <div className='p-1'>
            <div className='h-4 bg-gray-300 rounded mb-1 w-3/4'></div>
            <div className='h-3 bg-gray-300 rounded w-full'></div>
            <div className='h-3 bg-gray-300 rounded w-5/6 mt-1'></div>
          </div>
          <div className='pt-4 pb-2'>
            <div className='h-4 bg-gray-300 rounded w-1/4'></div>
          </div>
        </div>
    )
}

export default PizzaCardSkeleton;