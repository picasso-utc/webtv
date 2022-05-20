import React, { useState, useEffect } from 'react'
import { ajaxPost } from '../utils/Ajax'
import Grid from "@material-ui/core/Grid";
import DonsBar from '../components/PermVDH/DonsBar'
import './permVDH.css'


const PermVDH = () => {

    const [beers, setBeers] = useState({
        dons10: {
            dons10: {
                id: 17348,
                quantity: 0
            }
        },

        dons50: {
            dons50: {
                id: 17349,
                quantity: 0
            }
        }
    })

    const loadDons = () => {
        ajaxPost('payutc/public/beers/sells', {'beers': beers}).then(
            res => {
                setBeers(res.data.beers)
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
        <Grid class="mainContainerVDH">
            <div className='blurEffect'>
                <div class="vdhText">
                    <p><strong>PERM VDH</strong></p>
                    <p>Donnez en faveur du Fil d'Ariane !</p>
                    <p><span class="montant">{beers.dons10.dons10.quantity * 0.1 + beers.dons50.dons50.quantity * 0.5}</span> EUROS RECOLTES</p>
                </div>
                <DonsBar color="#009900"  points={beers.dons10.dons10.quantity * 0.1 + beers.dons50.dons50.quantity * 0.5} objectif={500}/>
            </div>
        </Grid>
    )
}

export default PermVDH
