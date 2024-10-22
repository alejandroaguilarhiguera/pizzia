import { FC } from 'react';
import DrinkCard from './DrinkCard';
import { Drink }from '@/app/types/Drink';

export interface DrinkListProps {
    drinks: Drink[]
}

const DrinkList: FC<DrinkListProps> = ({ drinks }) => {
    return (
        <div className='flex gap-2'>
            {drinks.map((drink) => (<DrinkCard drink={drink} />))}
        </div>
    )
}

export default DrinkList;