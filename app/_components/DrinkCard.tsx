import { FC } from 'react';

import { Drink }from '@/app/types/Drink';
export interface DrinkCardProps {
    drink: Drink
}

const DrinkCard: FC<DrinkCardProps> = ({ drink }) => {
  return (
    <div className='rounded overflow-hidden shadow-lg bg-white'>
      <img className='w-full h-40' src={drink.image} alt={drink.name} />
      <div className='p-1'>
        <div className='font-bold text-base mb-1'>{drink.name}</div>
      </div>
      <div className='pt-4 pb-2'>
        <span className='text-gray-900 font-bold'>${drink.price}</span>
      </div>
      <div>
      </div>
    </div>
  )
}

export default DrinkCard;