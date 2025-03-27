import { createContext, useState } from "react";

export const PlayerContext = createContext();


export const PlayerProvider = ({children}) => {
    const [ playerName, setPlayerName] = useState('');
    const [ nameError, SetNameError ] = useState(''); 

    return (
        <PlayerContext.Provider value={{playerName, setPlayerName, nameError, SetNameError}}>
            {children}
        </PlayerContext.Provider>
    );
};