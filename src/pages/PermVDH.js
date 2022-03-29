import React, { useState, useEffect } from 'react'
import { ajaxPost } from '../utils/Ajax'
import Grid from "@material-ui/core/Grid";
import DonsBar from '../components/permVDH/DonsBar'
import './permVDH.css'


const PermVDH = () => {

    const [dons, setDons] = useState({
        dons10: {
            id: 17348,
            quantity: 0,
        },

        dons50: {
            id: 17349,
            quantity: 0,
        },
    })

    const loadDons = () => {
        ajaxPost('payutc/public/beers/sells', {'dons': dons}).then(
            res => {
                setDons(res.data.dons)
            }
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            loadDons()
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <Grid class="mainContainer">
            <div className='blurEffect'>
                <div class="vdhText">
                    <p><strong>PERM VDH</strong></p>
                    <p>Donnez en faveur du Fil d'Ariane !</p>
                    <p><span class="montant">{dons.dons10.quantity * 0.1 + dons.dons50.quantity * 0.5}</span> EUROS RECOLTES</p>
                </div>
                <DonsBar color="#009900"  points={dons.dons10.quantity * 0.1 + dons.dons50.quantity * 0.5} objectif={500}/>
            </div>
        </Grid>
    )
}

export default PermVDH