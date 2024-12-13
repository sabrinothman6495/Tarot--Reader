import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import CardDisplay from '/components/CardDisplay';

interface Card {
    name: string;
    description: string;
    type: string;
}

const App: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            const { data } = await axios.get('http://localhost:5000/api/tarot/cards');
            setCards(data.cards);
        };

        fetchCards();
    }, []);

    return (
        <div>
            <h1>Tarot Card Reading</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {cards.map((card) => (
                    <CardDisplay key={card.name} name={card.name} description={card.desc} image="" />
                ))}
            </div>
        </div>
    );
};

export default App;
