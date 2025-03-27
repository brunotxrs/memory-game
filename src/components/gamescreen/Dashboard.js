import React from "react";

import '../gamescreen/GameScreen.css'


function DaschboardGame() {


    return (

        <div className="container-dashboard-game">

            <div className="box-dashboard">
                <div>
                    <span>ico</span>
                    <span>Name</span>
                </div>

                <div>
                    <span>icoTimer</span>
                    <span>Number</span>
                </div>

                <div>
                    <span>icoLife</span>
                    <span>X Number</span>
                </div>
            </div>

        </div>
    );
};

export default DaschboardGame;