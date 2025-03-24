import React from "react";
import {useNavigate} from "react-router";

interface DietBadgeProps {
    diet: string;
    sizeInPixels: number;
}

const DietBadge: React.FC<DietBadgeProps> = ({diet, sizeInPixels}) => {
    const navigate = useNavigate();
    let badgeImage: string;
    let badgeColor: string;
    let badgeText: string;
    let badgePath: string;

    switch (diet) {
        case "Végan":
            badgeImage = "vegan.png";
            badgeColor = "green";
            badgeText = "Végan";
            badgePath = "/vegan"
            break;
        case "Végétarien":
            badgeImage = "vege.png";
            badgeColor = "orange";
            badgeText = "Végétarien";
            badgePath = "/vege"
            break;
        case "Non renseigné":
            badgeImage = "";
            badgeColor = "grey";
            badgeText = "Non renseigné";
            badgePath = ""
            break;
        default:
            badgeImage = "";
            badgeColor = "black";
            badgeText = "Unknown";
            badgePath = "";
    }

    return (
        <>
            {badgeImage != "" ? (
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                        navigate(("/CategoryList" + badgePath))
                    }}
                    style={{
                        backgroundColor: badgeColor,
                        boxSizing: "border-box",
                        padding: "5px",
                        width: sizeInPixels + "px",
                        height: sizeInPixels + "px",
                        borderRadius: "50%",
                        color: "white",
                        backgroundImage: `url(/${badgeImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: "0 0 10px 0 rgba(255, 255, 255, 0.8)",
                    }}
                ></div>
            ) : (
                ""
            )}
        </>
    );
};

export default DietBadge;
