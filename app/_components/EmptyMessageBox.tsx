import { FC } from 'react';
import dayjs from 'dayjs';
import { Message } from 'ai/react';
import IconBox from './IconBox';

const EmptyMessageBox: FC = () => {
    return (
        <div className='p-2 bg-gray-300'>
            <section className="bg-cover bg-center">
              <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center text-white p-4">
                <h5 className="text-2xl md:text-3xl font-bold mb-4">¡Las Mejores Pizzas con nuestro mejor asistente!</h5>
                <p className="text-xl md:text-2xl mb-8">Haz tu pedido fácil y rápido a través de nuestro chat interactivo.</p>
              </div>
            </section>
        </div>
    )
}

export default EmptyMessageBox;