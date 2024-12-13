import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Card {
    name: string;
    name_short: string;
    desc: string;
    meaning_up: string;
    meaning_rev: string;
    type: string;
}

const App: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/tarot/cards/random?n=3');
                setCards(data.cards);
            } catch (error) {
                console.error('Error fetching Tarot cards:', error);
            }
        };

        fetchCards();
    }, []);

    return (
        <div>
            <h1>Tarot Card Reading</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {cards.map((card) => (
                    <div key={card.name_short} style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>
                        <h3>{card.name}</h3>
                        <p>{card.desc}</p>
                        <p><strong>Upright Meaning:</strong> {card.meaning_up}</p>
                        <p><strong>Reversed Meaning:</strong> {card.meaning_rev}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
