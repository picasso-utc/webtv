import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import {ajaxGet} from "../../utils/Ajax";
import './eloRanking.css'
import RankingItem from "../../components/eloRanking/RankingItem";

const EloRanking = () => {
    const [babySoloRanking, setBabySoloRanking] = useState([])
    const [babyDuoRanking, setBabyDuoRanking] = useState([])
    const [eightPoolSoloRanking, setEightPoolSoloRanking] = useState([])
    const [eightPoolDuoRanking, setEightPoolDuoRanking] = useState([])

    const fetchRanking = () => {
        ajaxGet('elo/solo/baby/ranking').then(res =>
            setBabySoloRanking(res.data.filter(({is_active, elo}) => is_active && elo !== null))
        )
        ajaxGet('elo/duo/baby/ranking').then(res =>
            setBabyDuoRanking(res.data.filter(({is_active, elo}) => is_active && elo !== null))
        )
        ajaxGet('elo/solo/8pool/ranking').then(res =>
            setEightPoolSoloRanking(res.data.filter(({is_active, elo}) => is_active && elo !== null))
        )
        ajaxGet('elo/duo/8pool/ranking').then(res =>
            setEightPoolDuoRanking(res.data.filter(({is_active, elo}) => is_active && elo !== null))
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
                        {babySoloRanking.map(({first_name, last_name, elo}, index) => (
                            <RankingItem ranking={index + 1} name={`${first_name} ${last_name}`} elo={elo} />
                        ))}
                    </Grid>
                    <Grid className='elo-ranking-right-column' item xs={6}>
                        <h2>BILLARD</h2>
                        {eightPoolSoloRanking.map(({first_name, last_name, elo}, index) => (
                            <RankingItem ranking={index + 1} name={`${first_name} ${last_name}`} elo={elo} />
                        ))}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default EloRanking