import React from "react";

import '../homescreen/HomeScreen.css'


function LevelSelector() {


    return(
        <div className="container-level-selector">

            <div className="box-level">

                <label htmlFor='easy'>
                    <input type="radio" name="level-selector" value='easy' id="easy"/>
                    <span>Easy</span>     
                </label>

                <label htmlFor='medium'>
                    <input type="radio" name="level-selector" value='medium' id="medium"/>
                    <span>Medium</span>     
                </label>

                <label htmlFor='hard'>
                    <input type="radio" name="level-selector" value='hard' id="hard"/>
                    <span>Hard</span>     
                </label>
            </div>

        </div>
    );
};


export default LevelSelector;