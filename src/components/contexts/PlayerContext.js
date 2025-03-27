import { createContext, useState } from "react";

export const PlayerContext = createContext();


export const PlayerProvider = ({children}) => {
    const [ playerName, setPlayerName] = useState('');
    const [ nameError, SetNameError ] = useState('');
    const [ level , setLevel] = useState('');

    return (
        <PlayerContext.Provider value={{ playerName, setPlayerName, nameError, SetNameError, level,setLevel }}>
            {children}
        </PlayerContext.Provider>
    );
};