import { createContext, useState } from "react";

export const PlayerContext = createContext();

export const PlayerProvider = ({children}) => {
    const [ playerName, setPlayerName] = useState('');
    const [ nameError, SetNameError ] = useState('');
    const [ level , setLevel ] = useState('');
    const [ classeAdicional, setClasseAdicional ] = useState('');
    const [ score, setScore ] = useState(0);
    const [ lives, setLives] = useState(0);
    const [ timeRemaining, setTimeRemaining ] = useState(0);
    const [ gameOver, setGameOver ] = useState(false);
    const [ point , setPoint ] = useState(0);
    const [ pairsMatched, setPairsMatched ] = useState(0);
    const [ bonus ,  setBonus ] = useState(0)

    return (
        <PlayerContext.Provider value={{ playerName, setPlayerName, nameError, SetNameError, level,setLevel, classeAdicional, setClasseAdicional, score, setScore, lives, setLives, timeRemaining, setTimeRemaining, gameOver, setGameOver, point , setPoint, pairsMatched, setPairsMatched, bonus ,  setBonus }}>
            {children}
        </PlayerContext.Provider>
    );
};