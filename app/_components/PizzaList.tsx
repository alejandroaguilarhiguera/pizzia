import { FC } from 'react';
import PizzaCard from './PizzaCard';
import { Pizza }from '@/app/types/Pizza';

export interface PizzaListProps {
    pizzas: Pizza[]
}

const PizzaList: FC<PizzaListProps> = ({ pizzas }) => {
    return (
        <div className='flex gap-2'>
            {pizzas.map((pizza) => (<PizzaCard pizza={pizza} />))}
        </div>
    )
}

export default PizzaList;