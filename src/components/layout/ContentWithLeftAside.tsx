import React from 'react';
import { Children } from '../../1_types/PropsType';

const ContentWithLeftAside: React.FC<Children> = ({children}) => {
    return (
        <div className="content content-with-left-aside">
             {children}
        </div>
    );
};

export default ContentWithLeftAside;