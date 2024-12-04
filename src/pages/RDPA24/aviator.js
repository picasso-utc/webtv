import React, { useState, useEffect } from "react";
import "./aviator.css";
import { asset_url } from '../../utils/Config';

const Aviator = () => {
  // Définition des hooks
  const [score, setScore] = useState(1.0);        // Initalisation du score à 1
  const [mise, setMise] = useState(0);            // Mise de départ à 0
  const [ranking, setRanking] = useState([]);     // Classement de départ vide
  const [running, setRunning] = useState(false);  // Le jeu attend d'être lancé
  const [result, setResult] = useState("");       // Variable de résultat

  // Définition des variables du modèle statistique
  let increament_step = 0.1;
  const proba_rate = 0.01;
  const timestep = 200;

  // Définition de l'effet de variation du score
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setScore((prev) => {
        const newMultiplier = prev + increament_step;
        if (Math.random() < proba_rate * newMultiplier) {
          clearInterval(interval);
          setRunning(false);
          setMise(0);
          setResult("Crash ! Vous avez perdu !");
        }
        return newMultiplier;
      });
    }, timestep);

    return () => clearInterval(interval);
  }, [running]);

  
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
  };


  // Render
  return (
    <div className="aviator-body">
      <div className={`game-container ${running ? "running" : ""}`}>
        <div className="mise">
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
        <div className={`ground ${running ? "running" : ""}`}/>
        <div className="panel">
          <div className="slot">
            x{score.toFixed(0)}
          </div>
          <div className="button-raw">
          {
            running && <button className="button" onClick={handleCashout}>
              Encaisser
            </button>}
          {
            !running && <button className="button" onClick={startGame}>
              Jouer
            </button>
          }
        </div>
        </div>
        <div className={`airplane-container ${running ? "running" : ""}`}>
          <img src={asset_url("/images/rdpA24/teddy_plane.png")} className={`airplane ${running ? "running" : ""}`}/>
          <div className={`smoke ${running ? "running" : ""}`}></div>
        </div>
        <div className="result">{result}</div>
      </div>
    </div>
  );
};

export default Aviator;
