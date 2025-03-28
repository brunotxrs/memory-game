import React from "react";

import '../gamescreen/GameScreen.css'
import DaschboardGame from "./Dashboard";
import Game from "./Game";



function GameScreen() {


    return (

        <div className="container-gamescreen">
            <DaschboardGame />
            <Game />

        </div>

    );
};

export default GameScreen;