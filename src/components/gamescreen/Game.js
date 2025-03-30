import React, { useEffect, useState, useContext } from "react";

import '../../components/gamescreen/GameScreen.css';
import { PlayerContext } from '../contexts/PlayerContext';
import { useLocation, useNavigate } from 'react-router-dom';

const allEmojis = [
    "😎", "😎", "😛", "😛", "👽", "👽", "🤖", "🤖",
    "👻", "👻", "🐧", "🐧", "🍕", "🍕", "💻", "💻",
    "✨", "✨", "🌈", "🌈", "⚽", "⚽", "🎧", "🎧",
    "💡", "💡", "🔑", "🔑", "🎵", "🎵", "⭐", "⭐"
];


function Game() {
    const { playerName, setPlayerName, level , setLevel, gameOver, setGameOver, pairsMatched, setPairsMatched, bonus, setBonus, lives, setLives } = useContext(PlayerContext);
    const [ cards, setCards ] = useState([]);
    const [ flippedCards, setFlippedCards ] = useState([]);
    const [ matchedCards, setMatchedCards ] = useState([]);
    const location = useLocation();
    const classeAdicional = location.state?.classeAdicional || '';
    const navigate = useNavigate();
    const [isGameActive, setIsGameActive] = useState(true);
    const [showErrorEmoji, setShowErrorEmoji] = useState(false);

    useEffect(() => {
        
        if(gameOver) {
            setIsGameActive(false);
            setTimeout(() => {
                navigate('/scoredashboard');
            }, 2000);
        }
    }, [gameOver, navigate])

    useEffect(() => {

        const storedName = localStorage.getItem('playerName');
        const storedLevel = localStorage.getItem('level');

        if(storedName) {
            setPlayerName(storedName);
            
        }

        if(storedLevel) {
            setLevel(storedLevel);
            
        }

        if(!playerName || !level) {
            navigate('/');
        }

    }, [ navigate, playerName, level, setPlayerName, setLevel ]);

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
                setPairsMatched(prevCount => prevCount + 1);

                let pointsToAdd = 0;
                if (level === 'easy') {
                    if (pairsMatched < 2) pointsToAdd = 150;
                    else pointsToAdd = 100;

                } else if (level === "medium") {
                    if(pairsMatched < 3) pointsToAdd = 200; else pointsToAdd = 150;
                    
                } else if (level === "hard") {
                    if(pairsMatched < 4) pointsToAdd = 250; else pointsToAdd = 200;
                    
                }

                setBonus(prevScore => prevScore + pointsToAdd);

                if (matchedCards.length + 2 === cards.length && cards.length > 0) {

                    setGameOver(true);
                }

            } else {

                setShowErrorEmoji(true);


                setTimeout(() => {
                    const newCards = cards.map((c) =>
                        c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c
                    );
                    setCards(newCards);
                    setFlippedCards([]);
                    setLives(prevLives => prevLives - 1);

                    if(lives <= 1 ){
                        setGameOver(true);
                        
                    }

                    setShowErrorEmoji(false);

                }, 1000);
            }
        }
    }, [ flippedCards, cards, matchedCards, level, pairsMatched, setBonus, setGameOver, setLives, lives ]);


    const boxGameClass = `box-game grid-cols-${gridColumns}`;

    return(

        <div className="container-game">

            {showErrorEmoji && (
                <div className="error-emoji">💔</div>
            )}

            {isGameActive ? (
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

            ) : (

                <div className="game-over-message">
                    <h2>Game Over</h2>
                    <p>Sua pontuação será exibida em breve...</p>
                </div>
                
            )}
        </div>
    );
};


export default Game;