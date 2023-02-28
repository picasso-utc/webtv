import React, { useState, useEffect } from 'react'
import { ajaxPost } from '../../utils/Ajax'
import Grid from "@material-ui/core/Grid";
import './PicFighter.css'


const PicFighter = () => {
    const [player1Health, setPlayer1Health] = useState(100);
    const [player2Health, setPlayer2Health] = useState(100);
    const [animation, setAnimation] = useState('idle');

    const [drinks, setDrinks] = useState([
            {
                id: 17348,
                title: "Bonne bière 1",
                qtty: 0,
                total: 0,
                team: "left"
            },
            {
                id: 17349,
                title: "Bonne bière 2",
                qtty: 0,
                total: 0,
                team: "right"
            }
        ]
    )

    const loadDrinks = () => {
        ajaxPost('payutc/public/drinks/sells', {'drinks' : drinks}).then(
            res => {
                setDrinks(res.data.drinks)
            }
        )
    }

    useEffect(() => { 
        updateDrinks() 
    }, [drinks])

    const updateDrinks = () => {
        /*
        for(let i = 0; i < drinks.length; i++) {
            for(drinks[i].qtty; drinks[i].qtty < drinks[i].total; drinks[i].qtty++) {
                if(drinks[i].team === "left") 
                    console.log("left");
                else
                    console.log("right");
            }
        }
        */
    }

    useEffect(() => {
        const interval = setInterval(() => {
            loadDrinks()
        }, 10 * 1000);

        return () => clearInterval(interval);
    }, [])

    return (
        <Grid className="mainContainerPicFighter">
            <p>Blablablou</p>
        </Grid>
    )
}

export default PicFighter
