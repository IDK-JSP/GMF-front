import React from 'react';
import { Children } from '../../1_types/PropsType';

const ContentWithRightAside:  React.FC<Children> = ({children}) => {
    return (
        <div className="content content-with-right-aside">
            {children}
        </div>
    );
};

export default ContentWithRightAside;