import React, { useState, useEffect } from "react";
import "./aviator.css";
import { asset_url } from '../../utils/Config';

const Aviator = () => {
  // Définition des hooks
  const [score, setScore] = useState(1.0);        // Initialisation du score à 1
  const [scoreDirection, setScoreDirection] = useState(1);  // Direction initiale du score croissant
  const [mise, setMise] = useState(0);            // Mise de départ à 0
  const [running, setRunning] = useState(false);  // Le jeu attend d'être lancé
  const [result, setResult] = useState("");       // Variable de résultat
  const [multiplayer, setMultiplayer] = useState(false);     // Booléen de solo/multijoueur
  const [cashoutScores, setCashoutScores] = useState([]);    // Liste des scores encaissés en mode multijoueur

  // Définition des variables du modèle statistique
  let increament_step_value = Math.random() + 0.1;
  const step_proba_rate = 0.025 * Math.random();
  const timestep = 250;
  const score_direction_proba_rate = 0.001;

  // Définition de l'effet de variation de la croissance du score
  useEffect(() => {
    if (!running) return;

    const score_direction_interval = setInterval(() => {
      setScoreDirection((prev) => {
        if (score >= 2) {
          if ((prev > 0 && Math.random() < score_direction_proba_rate) || (Math.random() < score_direction_proba_rate + 0.3)) {
            return -prev;
          }
          return prev;
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
    if (multiplayer) {
      setCashoutScores((prev) => [...prev, score.toFixed(0)]);
    } else {
      setRunning(false);
      setResult(`Vous avez encaissé à x${score.toFixed(0)} !`);
      setMise(mise * score.toFixed(0));
    }
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
    setCashoutScores([]); 
  };

  const endGame = () => {
    setScore(1.0);
    setResult("");
    setRunning(false);
  };

  // Render
  return (
    <div className="aviator-body">
      <div className={`game-container ${running ? "running" : ""} ${scoreDirection > 0 ? "up" : ""} ${scoreDirection < 0 ? "down" : ""}`}> 
        {running ?
        <div className="right-panel">
          <button className="button" onClick={endGame}>
            Quitter
          </button>
        </div>
        : 
        <div className="right-panel">
            Multiplayer
          <label className="switch">
            <input
              className="toggle"
              type="checkbox"
              checked={multiplayer}
              onChange={() => setMultiplayer(!multiplayer)}
            />
            <span className="slider"></span>
            <span className="card-side"></span>
          </label>
        </div>
        }
        {multiplayer ? (
          <div className="left-panel">
            Scores encaissés :
            {cashoutScores.map((entry, index) => (
              <div>
                Joueur {index + 1} : {entry}
              </div>
            ))}
          </div>) 
          : (
          <div className="left-panel">
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
          </div>
          )
        }
        <div className={`ground ${running ? "running" : ""}`} />
        <div className="middle-panel">
          <div className="score-display">{score.toFixed(0)}</div>
          <div className="button-raw">
            <button className="button" onClick={running ? handleCashout : startGame}>
              {running ? "Encaisser" : "Jouer"}
            </button>
          </div>
        </div>
        <div className={`airplane-container ${running ? "running" : ""} ${scoreDirection > 0 ? "up" : ""} ${scoreDirection < 0 ? "down" : ""}`}>
          <img
            src={asset_url("/images/rdpA24/teddy_plane.png")}
            className={`airplane ${running ? "running" : ""}`}
          />
        </div>
        <div className="result">
          {result}
        </div>
      </div>
    </div>
  );
};

export default Aviator;
