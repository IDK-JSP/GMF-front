import React from 'react';

interface DietBadgeProps {
    diet: string;
    sizeInPixels: number;
}

const DietBadge: React.FC<DietBadgeProps> = ({ diet, sizeInPixels }) => {
    let badgeImage: string;
    let badgeColor: string;
    let badgeText: string;

    switch (diet) {
        case 'Végan':
            badgeImage = 'vegan.png';
            badgeColor = 'green';
            badgeText = 'Végan';
            break;
        case 'Végétarien':
            badgeImage = 'vege.png';
            badgeColor = 'orange';
            badgeText = 'Végétarien';
            break;
        case 'Non renseigné':
            badgeImage = '';
            badgeColor = 'grey';
            badgeText = 'Non renseigné';
            break;
        default:
            badgeImage = '';
            badgeColor = 'black';
            badgeText = 'Unknown';
    }

    return (
        <>
        {badgeImage != ''
        ? <span style={{
            backgroundColor: badgeColor,
            padding: '5px',
            width: sizeInPixels + 'px',
            height: sizeInPixels + 'px',
            borderRadius: '50%',
            color: 'white',
            backgroundImage: `url(/${badgeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}>
        </span>
        : ''}
        </>
    );
};

export default DietBadge;
