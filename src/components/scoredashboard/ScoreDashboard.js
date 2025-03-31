import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import './ScoreDashboard.css';
import { PlayerContext } from '../contexts/PlayerContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import songScore from '../../assets/music/song-score.mp4';

function ScoreDashboard() {
    const { playerName, score, bonus, level } = useContext(PlayerContext);
    const [players, setPlayers] = useState([]);
    const pointTotal = score + bonus;
    const [ showWin, setShowWin ] = useState(false);
    const navigate  = useNavigate();
    const location = useLocation()
    const classeNew = location.state?.classeNew || '';
    const songScoreRef = useRef(new Audio(songScore));

    useEffect(() => {
        document.body.className = classeNew;

        return() => {
            document.body.className = '';
        }
    }, [classeNew]);

    useEffect(() => {
        let currentPlayers = [];

        if (level === 'easy') {
            currentPlayers = [
                { name: 'Fred', punctuation: 450 },
                { name: 'Helga', punctuation: 350 },
                { name: playerName, punctuation: pointTotal },
            ].sort((a, b) => b.punctuation - a.punctuation);
        } else if (level === 'medium') {
            currentPlayers = [
                { name: 'Zara', punctuation: 800 },
                { name: 'Kenji', punctuation: 650 },
                { name: playerName, punctuation: pointTotal },
            ].sort((a, b) => b.punctuation - a.punctuation);
        } else if (level === 'hard') {
            currentPlayers = [
                { name: 'Astrid', punctuation: 1200 },
                { name: 'Ragnar', punctuation: 1050 },
                { name: playerName, punctuation: pointTotal },
            ].sort((a, b) => b.punctuation - a.punctuation);
        }

        setPlayers(currentPlayers);

    }, [playerName, pointTotal, level]);

    useEffect(() => {
        if(players.length > 0 && players[0].name === playerName){
            songScoreRef.current.loop = true;
            songScoreRef.current.play().catch(error => {
                console.error("Erro ao reproduzir áudio de acerto:", error);
            })
            setShowWin(true);

        } else {
            setShowWin(false)
        }
    }, [players, playerName]);

    const handleRestart = () => {
        navigate('/');
        window.location.reload();
    };


    return (
        <div className="container-score" translate="no">
            <div className="box-score">
                {players.map((player, index) => (
                    <div className="player" key={player.name}>
                        <p className="name-player">{player.name}</p>
                        {index === 0 && (
                            <div className="box-trophy">
                                <p>1°</p>
                                <p><FontAwesomeIcon icon={faTrophy} /></p>
                                <p>{player.punctuation}</p>
                            </div>
                        )}
                        {index === 1 && (
                            <div className="box-trophy">
                                <p>2°</p>
                                <p><FontAwesomeIcon icon={faMedal} /></p>
                                <p>{player.punctuation}</p>
                            </div>
                        )}
                        {index === 2 && (
                            <div className="box-trophy">
                                <p>3°</p>
                                <p><FontAwesomeIcon icon={faMedal} /></p>
                                <p>{player.punctuation}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="box-win-btn">
                <div className={`win ${showWin ? 'show' : ''}`}></div>
                <div className="box-btn">
                    <div className="btn">

                        <button className="btn-restart" onClick={handleRestart}>
                            <span>restart</span>
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default ScoreDashboard;