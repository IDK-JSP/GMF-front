import React from 'react';
import { Children } from '../../1_types/PropsType';

const ContentWithBothAside: React.FC<Children> = ({children}) => {
    return (
        <div className="content content-with-both-aside">
             {children}
        </div>
    );
};

export default ContentWithBothAside;