import React, { useState, useEffect } from 'react'
import { ajaxPost } from '../../utils/Ajax'
import {Grid} from '@mui/material'
import './permIF.css'
import Bar from "../../components/permIF/bar";

const PermIF = () => {
    const [beers, setBeers] = useState({
        cosmo: {
            barbar: {
                id: 1403,
                quantity: 0
            },
            kasteel: {
                id: 14821,
                quantity: 0
            }
        },
        chapiteau: {
            cuvee: {
                id: 457,
                quantity: 0
            },
            pechemel: {
                id: 17881,
                quantity: 0
            }
        },
        main: {
            delirium: {
                id: 458,
                quantity: 0
            },
            mordue: {
                id: 17835,
                quantity: 0
            }
        }
    })

    const [sceneRender, setSceneRender] = useState([
        [
            {
                sceneName: 'Cosmodocks',
                points : beers.cosmo.barbar.quantity + beers.cosmo.kasteel.quantity,
                beers : ["barbar", "kasteel"]
            },
            {
                sceneName: 'Chapiteau',
                points : beers.chapiteau.cuvee.quantity + beers.chapiteau.pechemel.quantity,
                beers : ["cuvee", "pechemel"]
            },
            {
                sceneName: 'Main Stage',
                points : beers.main.delirium.quantity + beers.main.mordue.quantity,
                beers : ["delirium", "mordue"]
            }
        ].sort((a, b) => b.points - a.points)
    ])

    const [maxPoints, setMaxPoints] = useState(1)
    const [totalSells, setTotalSells] = useState(0)

    const loadBeerSells = async () => {
        await ajaxPost('payutc/public/beers/sells', {'beers': beers}).then(
            res => {
                setBeers(res.data.beers)
            }
        )
    }

    useEffect(() => {
        setMaxPoints(Math.max(
            beers.cosmo.barbar.quantity + beers.cosmo.kasteel.quantity,
            beers.chapiteau.cuvee.quantity + beers.chapiteau.pechemel.quantity,
            beers.main.delirium.quantity + beers.main.mordue.quantity,
            1
        ))

        setSceneRender(
            [
                {
                    sceneName: 'Cosmodocks',
                    points : beers.cosmo.barbar.quantity + beers.cosmo.kasteel.quantity,
                    beers : ["barbar", "kasteel"]
                },
                {
                    sceneName: 'Chapiteau',
                    points : beers.chapiteau.cuvee.quantity + beers.chapiteau.pechemel.quantity,
                    beers : ["cuvee", "pechemel"]
                },
                {
                    sceneName: 'Main Stage',
                    points : beers.main.delirium.quantity + beers.main.mordue.quantity,
                    beers : ["delirium", "mordue"]
                }
            ].sort((a, b) => b.points - a.points)
        )

        setTotalSells(beers.cosmo.barbar.quantity + beers.cosmo.kasteel.quantity + beers.chapiteau.cuvee.quantity + beers.chapiteau.pechemel.quantity + beers.main.delirium.quantity + beers.main.mordue.quantity)
    }, [beers])

    useEffect(() => {
        const interval = setInterval(() => {
            loadBeerSells()
        }, 10 * 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <Grid class="mainContainer">
            <div className='blurEffect'>
                <div className='header'><img src={require('../../assets/permIF/IF20_long_blanc.png')} className='logo' alt='feur'/></div>
                <div className='bars'>
                    {
                        sceneRender.map((scene, index) => (
                            <Bar
                                key={index}
                                name={scene.sceneName}
                                points={scene.points}
                                maxPoints={maxPoints}
                                totalSells={totalSells}
                                classement={index}
                                beers={scene.beers}
                            />
                        )
                    )}
                </div>
            </div>
        </Grid>
    )
}

export default PermIF