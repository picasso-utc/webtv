import React, { useState, useEffect } from "react";
import "./newYear.css";
import { asset_url } from '../../utils/Config';

const NewYearA24 = () => {

  // Hooks and variables
  const [showExplosion, setShowExplosion] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isCountdownFinished, setIsCountdownFinished] = useState(false);


  const dancers = [
    { id: 1, src: asset_url(`/images/newYearA24/dancer1.gif`), className: "dancer1" },
    { id: 2, src: asset_url(`/images/newYearA24/dancer2.gif`), className: "dancer2" },
    { id: 3, src: asset_url(`/images/newYearA24/dancer3.gif`), className: "dancer3" },
    { id: 4, src: asset_url(`/images/newYearA24/dancer4.gif`), className: "dancer4" },
    { id: 5, src: asset_url(`/images/newYearA24/dancer5.gif`), className: "dancer5" },
    { id: 6, src: asset_url(`/images/newYearA24/dancer6.gif`), className: "dancer6" },
    { id: 7, src: asset_url(`/images/newYearA24/dancer7.gif`), className: "dancer7" },
    { id: 8, src: asset_url(`/images/newYearA24/dancer8.gif`), className: "dancer8" },
    { id: 9, src: asset_url(`/images/newYearA24/dancer9.gif`), className: "dancer9" },
    { id: 10, src: asset_url(`/images/newYearA24/dancer10.gif`), className: "dancer10" },
    { id: 11, src: asset_url(`/images/newYearA24/dancer11.gif`), className: "dancer11" },
    { id: 12, src: asset_url(`/images/newYearA24/dancer12.gif`), className: "dancer12" },
  ];


  // Compte à rebours
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const todayAt22h = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0, 0); // Aujourd'hui à 22h

      const difference = todayAt22h - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
      } else {
        setIsCountdownFinished(true);
        setTimeLeft("EXTEEEEEENSION"); 
      }
    };

    // Mettre à jour chaque seconde
    const interval = setInterval(calculateTimeLeft, 1000);

    // Nettoyage de l'intervalle à la fin du composant
    return () => clearInterval(interval);
  }, []);


  // Explosion de conffetis
  useEffect(() => {
    // Déclencher l'explosion toutes les 10 secondes
    const interval = setInterval(() => {
      setShowExplosion(true); // Montrer l'explosion
      setTimeout(() => setShowExplosion(false), 2500); // Masquer l'explosion après 2 secondes
    }, 10000);

    return () => clearInterval(interval); // Nettoyer l'intervalle
  }, []);


  // Render
  return (
    <div className="newyear-body ">
      <img src={asset_url(`/images/newYearA24/background.png`)} className="background"/> 
      {showExplosion && <img src={asset_url(`/images/newYearA24/explosion.gif`)} className="explosion"/>}
      <div className={`countdown ${isCountdownFinished ? "finished" : ""}`}>{timeLeft}</div>
      {dancers.map((dancer) => (
        <img
          key={dancer.id}
          src={dancer.src}
          className={`dancer ${dancer.className}`}
          alt={`dancer ${dancer.id}`}
        />
      ))}
    </div>
  );
};

export default NewYearA24;
