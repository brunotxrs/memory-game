import React, { useEffect, useState, useContext } from "react";

import '../../components/gamescreen/GameScreen.css';
import { PlayerContext } from '../contexts/PlayerContext';
import { useLocation } from 'react-router-dom';

const allEmojis = [
    "😎", "😎", "😛", "😛", "👽", "👽", "🤖", "🤖",
    "👻", "👻", "🐧", "🐧", "🍕", "🍕", "💻", "💻",
    "✨", "✨", "🌈", "🌈", "⚽", "⚽", "🎧", "🎧",
    "💡", "💡", "🔑", "🔑", "🎵", "🎵", "⭐", "⭐"
];


function Game() {
    const { level } = useContext(PlayerContext);
    const [ cards, setCards ] = useState([]);
    const [ flippedCards, setFlippedCards ] = useState([]);
    const [ matchedCards, setMatchedCards ] = useState([]);
    const location = useLocation();
    const classeAdicional = location.state?.classeAdicional || '';

    useEffect(() => {
        document.body.className = classeAdicional;
        return () => {
            document.body.className = '';
        };
    }, [classeAdicional]);

    useEffect(() => {
        const shuffleArray = (array) => {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        };

        const createCards = () => {

            let selectedEmojis = [];
            let numColumns = 2;

            if(level === 'easy') {
                selectedEmojis = allEmojis.slice(0, 4);
                numColumns = 2;
            } else if(level === 'medium') {
                selectedEmojis = allEmojis.slice(0, 8);
                numColumns = 4;
            } else if(level === 'hard') {
                selectedEmojis = allEmojis.slice(0, 12);
                numColumns = 4;
            } else {
                selectedEmojis = allEmojis.slice(0, 4);
                numColumns = 2;
            };
            
            const duplicatedEmojis = [...selectedEmojis];

            const initialCards = duplicatedEmojis.map((emoji, index) => ({
                id: index,
                emoji,
                isFlipped: false,
                isMatched: false,
            }));

            const shuffledCards = shuffleArray(initialCards);
            setCards(shuffledCards);
            setFlippedCards([]);
            setMatchedCards([]);
            setGridColumns(numColumns);
        };

        createCards();
    }, [level]);


    const [gridColumns, setGridColumns] = useState(2);


    const handleCardClick = (card) => {
        if (!card.isFlipped && !card.isMatched && flippedCards.length < 2) {
            const newCards = cards.map((c) =>
                c.id === card.id ? { ...c, isFlipped: true } : c
            );
            setCards(newCards);
            setFlippedCards([...flippedCards, card]);
        }
    };

    useEffect(() => {
        if (flippedCards.length === 2) {
            const [card1, card2] = flippedCards;
            if (card1.emoji === card2.emoji) {
                setMatchedCards([...matchedCards, card1.id, card2.id]);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    const newCards = cards.map((c) =>
                        c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c
                    );
                    setCards(newCards);
                    setFlippedCards([]);
                }, 1000);
            }
        }
    }, [flippedCards, cards, matchedCards]);


    const boxGameClass = `box-game grid-cols-${gridColumns}`;

    return(

        <div className="container-game">
            <div className={boxGameClass}>
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
                        onClick={() => handleCardClick(card)}
                    >
                        <div className="card-inner">
                            <div className="card-front"></div>
                            <div className="card-back">{card.emoji}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Game;