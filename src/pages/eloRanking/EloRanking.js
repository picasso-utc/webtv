import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import {ajaxGet} from "../../utils/Ajax";
import './eloRanking.css'
import RankingItem from "../../components/eloRanking/RankingItem";

const EloRanking = () => {
    const [babySoloRanking, setBabySoloRanking] = useState([])
    const [eightPoolSoloRanking, setEightPoolSoloRanking] = useState([])
    const [babySoloMatches, setBabySoloMatches] = useState([])
    const [eightPoolSoloMatches, setEightPoolSoloMatches] = useState([])

    const fetchRanking = () => {
        ajaxGet('elo/solo/baby/ranking').then(res =>
            setBabySoloRanking(res.data.filter(({is_active, elo}) => is_active && elo !== null))
        )
        ajaxGet('elo/solo/8pool/ranking').then(res =>
            setEightPoolSoloRanking(res.data.filter(({is_active, elo}) => is_active && elo !== null))
        )
        ajaxGet('elo/solo/baby/matches').then(res =>
            setBabySoloMatches(res.data)
        )
        ajaxGet('elo/solo/8pool/matches').then(res =>
            setEightPoolSoloMatches(res.data)
        )
    }

    useEffect(() => {
        fetchRanking()
        const interval = setInterval(() => {
            fetchRanking()
        }, 5 * 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='elo-ranking-main-container'>
            <div className='elo-ranking-red-square'>
                <h1>Classement Elo Pic</h1>
                <Grid container columns={{ xs: 2 }}>
                    <Grid className='elo-ranking-left-column' item xs={6}>
                        <h2>BABYFOOT</h2>
                        <RankingItem ranking='Rang' name='Prénom Nom' nbGame='Matchs' elo='Elo' />
                        <hr />
                        {babySoloRanking.map(({id, first_name, last_name, nb_game, elo}, index) => (
                            <RankingItem
                                ranking={index + 1}
                                name={`${first_name} ${last_name}`}
                                nbWin={babySoloMatches.filter(({ winner }) => winner === id).length}
                                nbGame={nb_game}
                                elo={elo}
                            />
                        ))}
                    </Grid>
                    <Grid className='elo-ranking-right-column' item xs={6}>
                        <h2>BILLARD</h2>
                        <RankingItem ranking='Rang' name='Prénom Nom' nbGame='Matchs' elo='Elo' />
                        <hr />
                        {eightPoolSoloRanking.map(({id, first_name, last_name, nb_game, elo}, index) => (
                            <RankingItem
                                ranking={index + 1}
                                name={`${first_name} ${last_name}`}
                                nbWin={eightPoolSoloMatches.filter(({ winner }) => winner === id).length}
                                nbGame={nb_game}
                                elo={elo}
                            />
                        ))}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default EloRanking