import { FC } from 'react';
import { Pizza }from '@/app/types/Pizza';

export interface PizzaCardProps {
    pizza: Pizza
}

const PizzaCard: FC<PizzaCardProps> = ({ pizza }) => {

  return (
    <div className='rounded overflow-hidden shadow-lg bg-white'>
      <img className='w-full' src={pizza.image} alt={pizza.name} />
      <div className='p-1'>
        <div className='font-bold text-base mb-1'>{pizza.name}</div>
        <p className='text-gray-700 text-xs'>{pizza.description}</p>
      </div>
      <div className='pt-4 pb-2'>
        <span className='text-gray-900 font-bold'>${pizza.price}</span>
      </div>
      <div>
      </div>
    </div>
  )
}

export default PizzaCard;