import React, {useEffect, useState} from "react"
import Velo from '../assets/permR4/velo.png'
import Ligne_de_depart from '../assets/permR4/ligne-de-depart.png'
import Arrivee from '../assets/permR4/arrivee.png'
import R4M from '../assets/permR4/Logo_R4M_contract.png'
import CDF from '../assets/permR4/CDF.jpg'
import Raidut from '../assets/permR4/Logo_RaidUT_vert.png'
import './permR4.css'
import {ajaxPost} from "../utils/Ajax";

const PermR4 = () => {

  const [beers, setBeers] = useState({
    dons10: {
      dons10: {
        id: 17444,
        quantity: 0
      }
    },

    dons50: {
      dons50: {
        id: 17445,
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
    <div className="container">
      <div className="container-jauge">
        <img className="ligne_depart" src={Ligne_de_depart} />
          <div className="container-evol">
            <div className="evol" style={{ '--gap': `${beers.dons10.dons10.quantity * 0.1 + beers.dons50.dons50.quantity * 0.5 - 5}%`}}>
              <hr></hr>
              <img className="velo" src={Velo}/>
            </div>
            <hr color="black" size="8"></hr>
            <div className="graduation">
              <h2>0€</h2>
              <h2>25€</h2>
              <h2>50€</h2>
              <h2>75€</h2>
              <h2>100€</h2>
            </div>
          </div>
        <img className="arrivee" src={Arrivee} />
      </div>
      <div className="Affichage_don">
        <h1>{beers.dons10.dons10.quantity * 0.1 + beers.dons50.dons50.quantity * 0.5}€ pour <img className="CDF" src={CDF}/></h1>
      </div>
      <div className="Logos">
        <img className="R4M" src={R4M}/>
        <h1> Venez sauver la forêt</h1>
        <img className="Raidut" src={Raidut}/>
      </div>
    </div>
  )
}

const getCoordsOnArc = (angle, offset=10) => [
  Math.cos(angle - (Math.PI / 2)) * offset,
  Math.sin(angle - (Math.PI / 2)) * offset,
]

export default PermR4
