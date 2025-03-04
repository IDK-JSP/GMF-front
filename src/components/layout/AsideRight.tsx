import React from 'react';
import { Children } from '../../1_types/PropsType';

const AsideRight: React.FC<Children> = ({children}) => {
    return (
        <aside className="abs-right">
            <div>
             {children}
             </div>
        </aside>
    );
};

export default AsideRight;