import React from 'react';
import { Children } from '../../1_types/PropsType';

const ContentWithoutAside: React.FC<Children> = ({children}) => {
    return (
        <div className="content">
            {children}
        </div>
    );
};

export default ContentWithoutAside;