import React from "react";
import '../../components/homescreen/HomeScreen.css';

function StartButton() {
    return(
        <div className="container-start-button">
            <div className="text-info">Encontre todos os pares de cartas!</div>
            <div className="box-Button">
                <button className="btn-start">
                    <p>start</p>
                </button>
            </div>
        </div>
    );
}

export default StartButton;