import React, { useState, useEffect } from 'react'
import { ajaxPost } from '../utils/Ajax'
import Grid from '@material-ui/core/Grid'
import ClanBar from '../components/permChef/ClanBar'
import logoDuri from '../assets/logoDuri.jpg'
import logoDagul from '../assets/logoDagul.jpg'
import logoKB from '../assets/logoKB.png'
import logoVB from '../assets/logoVB.png'
import logoYoua from '../assets/logoYoua.png'
import logoTampi from '../assets/logoTampi.png'
import './permChef.css'

const PermChef = () => {
    // Cuvée =>  457
    // Deli => 458
    // Kastell => 14821
    // Cidre => 16581
    // Val Dieu => 12492
    // Castor => 16755
    // Harmony => 12463
    // Chimay Rouge => 16870
    // Barbar => 1403
    const [beers, setBeers] = useState({
        tampi: {
            kastel: {
                id: 14821,
                quantity: 0
            }
        },
        kb: {
            cuvee: {
                id: 457,
                quantity: 0
            }
        },
        youa: {
            cidre: {
                id: 16581,
                quantity: 0
            }
        },
        vb: {
            barbar: {
                id: 1403,
                quantity: 0
            }
        },
        dagul: {
            delirium: {
                id: 458,
                quantity: 0
            }
        },
        duri: {
            valDieu: {
                id: 12492,
                quantity: 0
            }
        }
    })
    const [maxPoints, setMaxPoints] = useState(1)

    const loadBeerSells = () => {
        ajaxPost('payutc/public/beers/sells', {'beers': beers}).then(
            res => {
                setBeers(res.data.beers)
            }
        )
    }

    useEffect(() => {
        setMaxPoints(Math.max(
            beers.dagul.delirium.quantity,
            beers.kb.cuvee.quantity,
            beers.vb.barbar.quantity,
            beers.tampi.kastel.quantity,
            beers.youa.cidre.quantity,
            beers.duri.valDieu.quantity,
            1
        ))
    }, [beers])

    useEffect(() => {
        const interval = setInterval(() => {
            loadBeerSells()
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <Grid class="mainContainer">
            <div className='blurEffect'>
                <ClanBar logo={logoDagul} color="#000000"  points={beers.dagul.delirium.quantity * 1000} maxPoints={maxPoints * 1000} />
                <ClanBar logo={logoKB} color="#ff0000" points={beers.kb.cuvee.quantity * 1000} maxPoints={maxPoints * 1000} />
                <ClanBar logo={logoVB} color="#00ff00" points={beers.vb.barbar.quantity * 1000} maxPoints={maxPoints * 1000} />
                <ClanBar logo={logoTampi} color="#ffff00" points={beers.tampi.kastel.quantity * 1000} maxPoints={maxPoints * 1000} />
                <ClanBar logo={logoYoua} color="#0000ff" points={beers.youa.cidre.quantity * 1000} maxPoints={maxPoints * 1000} />
                <ClanBar logo={logoDuri} color="#ffffff" points={beers.duri.valDieu.quantity * 1000} maxPoints={maxPoints * 1000} />
            </div>
        </Grid>
    )
}

export default PermChef