import React from "react";

import '../gamescreen/GameScreen.css'
import DashboardGame from "./Dashboard";
import Game from "./Game";



function GameScreen() {


    return (

        <div className="container-gamescreen">
            <DashboardGame />
            <Game />

        </div>

    );
};

export default GameScreen;