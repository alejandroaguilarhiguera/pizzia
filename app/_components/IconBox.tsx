import { FC } from 'react'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import { faRobot } from '@fortawesome/free-solid-svg-icons';  // Ícono específico que deseas usar
import { faUser} from '@fortawesome/free-regular-svg-icons';  // Ícono específico que deseas usar

export interface IconBoxProps {
    icon: string;
}

const icons: { [key: string]: any } = {
    'assistant': faRobot,
    'user':faUser
}

const IconBox: FC<IconBoxProps> = ({ icon }) => {
    return (
        <div style={{ height: '30px' }} className=' border rounded px-1'>
            <FontAwesomeIcon icon={icons[icon]} />
        </div>
    )
}

export default IconBox;
