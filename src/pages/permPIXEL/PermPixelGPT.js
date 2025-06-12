import React, { useState, useEffect } from 'react';
import './index.css';
import React from 'react';


function App() {
  const [player1Health, setPlayer1Health] = useState(100);
  const [player2Health, setPlayer2Health] = useState(100);
  const [animation, setAnimation] = useState('idle');

  const handleAttack = (attacker) => {
    const drinks = Object.keys(attacker);
    for (let index = 0; index < drinks.length; index++) {
        drink = drinks[index]['id']
        if ([14821, 17881, 12492].includes(drink)) {
            for i in drinks[index]['quantity']:
                setPlayer2Health(player2Health - 10);
                handleAnimation('attack1');
        } else {
        setPlayer1Health(player1Health - 10);
        handleAnimation('attack2');
        }
  };

  const handleAnimation = (animation) => {
    setAnimation(animation);
    setTimeout(() => {
      setAnimation('idle');
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const url = 'payutc/public/beers/sells'; // Replace with your API endpoint
      drinks = [
        14821, // Kasteel
        17881, // Bush
        12492, // Valdieu
        457,   // Cuvee
        458,   // Deli
        17835, // Mordue        
      ]
      axios.post(url, drinks)
        .then(response => {
          handleAttack(response);
        })
        .catch(error => {
          console.log('Error: ' + error);
        });
    }, 30000); // Make API call every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (player1Health <= 0 || player2Health <= 0) {
      setPlayer1Health(100);
      setPlayer2Health(100);
    }
  }, [player1Health, player2Health]);

  return (
    <div className="background">
      {player1Health <= 0 || player2Health <= 0 ?
        <h1>A new fight has started!</h1> :
        <>
          <div className="character">
            <img src={`./${animation}.png`} alt="Animation" />
            <h1>Player 1 Health: {player1Health}</h1>
          </div>
          <div className="character">
            <img src={`./${animation}.png`} alt="Animation" />
            <h1>Player 2 Health: {player2Health}</h1>
          </div>
        </>
      }
    </div>
  );
}

export default App;