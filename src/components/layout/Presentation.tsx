import React, {FC} from "react";
import {Children, PresentationProps} from "../../1_types/PropsType";


const Presentation: FC<PresentationProps> = ({children, imgUrl, carousel}) => {
    return (
        <div
            className="presentation"
            style={{
                backgroundImage: imgUrl && !carousel ? `url("${imgUrl}")` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                width: "100%",
            }}
        >
            {/* Carrousel en arrière-plan */}
            {carousel && (
                <div style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0}}>
                    {carousel}
                </div>
            )}

            {/* Contenu au premier plan */}
            <div style={{position: "relative", zIndex: 1, textAlign: "center", color: "white", fontSize: "2rem"}}>
                {children}
            </div>
        </div>
    );
};

export default Presentation;
