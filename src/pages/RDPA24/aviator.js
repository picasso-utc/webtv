import React, { useState, useEffect } from "react";
import "./aviator.css";
import { asset_url } from '../../utils/Config';

const Aviator = () => {
  // Définition des hooks
  const [score, setScore] = useState(1.0);        // Initalisation du score à 1
  const [scoreDirection, setScoreDirection] = useState(1);  // Direction initiale du score croissant
  const [mise, setMise] = useState(0);            // Mise de départ à 0
  const [running, setRunning] = useState(false);  // Le jeu attend d'être lancé
  const [result, setResult] = useState("");       // Variable de résultat
  const [multiplayer, setMultiplayer] = useState(false);     // Booléan de solo/multiplayer


  // Définition des variables du modèle statistique
  let increament_step_value = Math.random() + 0.1;
  const step_proba_rate = 0.05;
  const timestep = 250;
  const score_direction_proba_rate = 0.001;

  // Définition de l'effet de variation de la croissance du score
  useEffect(() => {
    if (!running) return;
  
    const score_direction_interval = setInterval(() => {
      setScoreDirection((prev) => {
        if (score >= 2) {
          if ((prev > 0 && Math.random() < score_direction_proba_rate) || (Math.random() < score_direction_proba_rate + 0.3)) {
            return -prev
          }
          return prev
        }
        return 1; // Si score < 2, on laisse croissant
      });
    }, 100);
  
    return () => clearInterval(score_direction_interval);
  }, [running, score]);
  
  
  


  // Définition de l'effet de variation du score
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setScore((prev) => {
        const newScore = prev + scoreDirection * increament_step_value;
        if (Math.random() < step_proba_rate * newScore) {
          clearInterval(interval);
          setRunning(false);
          setMise(0);
          setResult("Crash ! Vous avez perdu !");
        }
        return newScore;
      });
    }, timestep);

    return () => clearInterval(interval);
  }, [running, scoreDirection]);

  
  // Récupération du gain 
  const handleCashout = () => {
    setRunning(false);
    setResult(`Vous avez encaissé à x${score.toFixed(0)} !`);
    setMise(mise*score.toFixed(0))
  };


  // Gestion de la mise
  const handleSetMise = (userMise) => {
    if (!isNaN(userMise) && userMise > 0) {
      setMise(userMise);
    }
  };

  // Démarrage du jeu
  const startGame = () => {
    setScore(1.0);
    setResult("");
    setRunning(true);
    setScoreDirection(1);
  };


  // Render
  return (
    <div className="aviator-body">
      <div className={`game-container ${running ? "running" : ""} ${scoreDirection>0 ? "up" : ""} ${scoreDirection<0 ? "down" : ""}`}>
        <div class="player-panel">
          Multiplayer
          <label class="switch">
            <input class="toggle" type="checkbox" checked={multiplayer} onChange={() => setMultiplayer(!multiplayer)}></input>
            <span class="slider"></span>
            <span class="card-side"></span>
          </label>
        </div>
        {!multiplayer && <div className="mise">
          Mise actuelle
          <input
            className="miseinput"
            type="number"
            value={mise}
            onChange={(e) => {
              const newMise = parseFloat(e.target.value); 
              setMise(newMise);
            }}
            onWheel={(e) => e.preventDefault()}
          />
        </div>}
        <div className={`ground ${running ? "running" : ""}`}/>
        <div className="panel">
          <div className="slot">
            {score.toFixed(0)}
          </div>
          <div className="button-raw">
          <button className="button" onClick={running ? handleCashout : startGame}>
            {running ? "Encaisser" : "Jouer"}
          </button>
        </div>
        </div>
        <div className={`airplane-container ${running ? "running" : ""} ${scoreDirection>0 ? "up" : ""} ${scoreDirection<0 ? "down" : ""}`}>
          <img src={asset_url("/images/rdpA24/teddy_plane.png")} className={`airplane ${running ? "running" : ""}`}/>
          <div className={`smoke ${running ? "running" : ""}`}></div>
        </div>
        <div className="result">{result}</div>
      </div>
    </div>
  );
};

export default Aviator;
