import React from 'react';

interface DietBadgeProps {
    diet: string;
}

const DietBadge: React.FC<DietBadgeProps> = ({ diet }) => {
    let badgeClass: string;
    let badgeColor: string;
    let badgeText: string;

    switch (diet) {
        case 'vegan':
            badgeClass = 'vegetarian-badge';
            badgeColor = 'green';
            badgeText = 'Vegan';
            break;
        case 'vegetarian':
            badgeClass = 'vegetarian-badge';
            badgeColor = 'orange';
            badgeText = 'Vegetarian';
            break;
        case 'gluten-free':
            badgeClass = 'vegetarian-badge';
            badgeColor = 'blue';
            badgeText = 'Gluten-Free';
            break;
        case 'keto':
            badgeClass = 'vegetarian-badge';
            badgeColor = 'purple';
            badgeText = 'Keto';
            break;
        default:
            badgeClass = 'vegetarian-badge';
            badgeColor = 'gray';
            badgeText = 'Unknown';
    }

    return (
        <span style={{ backgroundColor: badgeColor, padding: '5px', borderRadius: '5px', color: 'white' }}>
            {badgeText}
        </span>
    );
};

export default DietBadge;