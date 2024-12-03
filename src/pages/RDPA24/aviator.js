import React, { useState, useEffect } from "react";
import "./aviator.css";
import { asset_url } from '../../utils/Config';

const Aviator = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setMultiplier((prev) => {
        const newMultiplier = prev + 0.1;
        if (Math.random() < 0.01 * newMultiplier) {
          clearInterval(interval);
          setRunning(false);
          setResult("Crash ! Vous avez perdu !");
        }
        return newMultiplier;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [running]);

  const handleCashout = () => {
    setRunning(false);
    setResult(`Vous avez encaissé à x${multiplier.toFixed(2)} !`);
  };

  const startGame = () => {
    setMultiplier(1.0);
    setResult("");
    setRunning(true);
  };

  return (
    <div className="aviator-body">
      <div className={`game-container ${running ? "running" : ""}`}>
        <div className="panel">
          <div className="slot">
            x{multiplier.toFixed(2)}
          </div>
          <div className="button-raw">
          <button className="button" onClick={handleCashout} disabled={!running}>
            Encaisser
          </button>
          <button className="button" onClick={startGame} disabled={running}>
            Rejouer
          </button>
        </div>
        </div>
        <img src={asset_url("/images/rdpA24/teddy_plane.png")} className={`airplane ${running ? "running" : ""}`} />
        <div className="result">{result}</div>
      </div>
    </div>
  );
};

export default Aviator;
