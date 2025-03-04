import React from 'react';
import { Children } from '../../1_types/PropsType';


const Presentation: React.FC<Children> = ({children}) => {
    return (
        <div className='presentation'
        style={{ 
            backgroundImage: `url("/test.jpeg")`,  
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            width: "100%"
            }}><div>
             {children}
             </div>
        </div>
    );
};

export default Presentation;