import React, { useState, useEffect } from 'react'
import { ajaxPost } from '../utils/Ajax'
import Grid from '@material-ui/core/Grid'
import ClanBar from '../components/permChef/ClanBar'
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
            barbar: {
                id: 1403,
                quantity: 0
            }
        },
        kb: {
            deli: {
                id: 458,
                quantity: 0
            },
            rebelle: {
                id: 17554,
                quantity: 0
            }
        },
        youa: {
            wildebeest: {
                id: 17545,
                quantity: 0
            },
            valdieu: {
                id: 12492,
                quantity: 0
            }
        },
        vb: {
            cidre: {
                id: 17310,
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
            beers.kb.rebelle.quantity + beers.kb.deli.quantity,
            beers.vb.cidre.quantity,
            beers.tampi.barbar.quantity,
            beers.youa.wildebeest.quantity + beers.youa.valdieu.quantity,
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
                <ClanBar logo={logoKB} color="#ff0000" points={(beers.kb.rebelle.quantity + beers.kb.deli.quantity) * 1000} maxPoints={maxPoints * 1000} />
                <ClanBar logo={logoVB} color="#00ff00" points={(beers.vb.cidre.quantity) * 1000} maxPoints={maxPoints * 1000} />
                <ClanBar logo={logoTampi} color="#ffff00" points={(beers.tampi.barbar.quantity) * 1000} maxPoints={maxPoints * 1000} />
                <ClanBar logo={logoYoua} color="#0000ff" points={(beers.youa.wildebeest.quantity + beers.youa.valdieu.quantity) * 1000} maxPoints={maxPoints * 1000} />
            </div>
        </Grid>
    )
}

export default PermChef