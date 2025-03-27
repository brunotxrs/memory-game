import React, { useContext } from "react";

import '../homescreen/HomeScreen.css'
import { PlayerContext } from '../contexts/PlayerContext'


function LevelSelector() {

    const { setLevel} = useContext(PlayerContext);

    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };

    return(
        <div className="container-level-selector">

            <div className="box-level">

                <label htmlFor='easy'>
                    <input type="radio" name="level-selector" value='easy' id="easy"
                    onChange={handleLevelChange} />
                    <span>Easy</span>     
                </label>

                <label htmlFor='medium'>
                    <input type="radio" name="level-selector" value='medium' id="medium" onChange={handleLevelChange} />
                    <span>Medium</span>     
                </label>

                <label htmlFor='hard'>
                    <input type="radio" name="level-selector" value='hard' id="hard" onChange={handleLevelChange} />
                    <span>Hard</span>     
                </label>
            </div>

        </div>
    );
};


export default LevelSelector;