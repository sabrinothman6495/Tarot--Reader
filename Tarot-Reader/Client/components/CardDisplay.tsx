import React from 'react';

interface CardProps {
    name: string;
    description: string;
    image: string;
    quote: string;
 
}

const CardDisplay: React.FC<CardProps> = ({ name, description, image, quote }) => {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <p>{description}</p>
            <p>{quote}</p>
        </div>
    );
};