import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import './duelSillyDeliP23.css';

class DuelSillyDeliP23 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks : [
                {
                    id: 19812,
                    title : 'PtsDeli',
                    total: 0
                },
                {
                    id: 19811,
                    title : 'PtsSilly',
                    total: 0
                },
                {
                    id: 19820,
                    title : 'averbode',
                    total: 0
                },
                {
                    id: 19817,
                    title : 'corsaire',
                    total: 0
                },
                {
                    id: 19815,
                    title : 'deliRed',
                    total: 0
                },
                {
                    id: 19822,
                    title : 'enghien',
                    total: 0
                },
                {
                    id: 19818,
                    title : 'florisMango',
                    total: 0
                },
                {
                    id: 19816,
                    title : 'forest',
                    total: 0
                },
                {
                    id: 19821,
                    title : 'saison',
                    total: 0
                },
                {
                    id: 19819,
                    title : 'sillyRed',
                    total: 0
                },
            ],
            quantitéL : 135,
            ventes : 0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.attackQueue !== this.attackQueue) {
            this.handleAttack();
        }
    }

    componentDidMount(){
        this.loadDrinks();
        setInterval(() => this.loadDrinks(), 15 * 1000);
    }

    loadDrinks(){
        ajaxPost('payutc/public/drinks/sells', {'drinks' : this.state.drinks}).then(
            res => {
                this.setState({
                    drinks : res.data.drinks
                });
            }
        )
    }

    render() {
        const qty = this.state.quantitéL
        const ventes = this.state.ventes
        const PtsDeli = this.state.drinks.find(x => x.id == 19812).total;
        const PtsSilly = this.state.drinks.find(x => x.id == 19811).total;
        const averbode = this.state.drinks.find(x => x.id == 19820).total;
        const corsaire = this.state.drinks.find(x => x.id == 19817).total;
        const deliRed = this.state.drinks.find(x => x.id == 19815).total;
        const enghien = this.state.drinks.find(x => x.id == 19822).total;
        const florisMango = this.state.drinks.find(x => x.id == 19818).total;
        const forest = this.state.drinks.find(x => x.id == 19816).total;
        const saison = this.state.drinks.find(x => x.id == 19821).total;
        const sillyRed = this.state.drinks.find(x => x.id == 19819).total;


        return (
            <div className='body'>
                <div className='averbode'>
                    <div className='jauge' style={{width: 487-(averbode*2.95)}}>
                        <p className='Nb_Gauche' >{165-averbode}</p>
                    </div>
                </div>
                <div className='corsaire'>
                    <div className='jauge' style={{width: 487-(corsaire*6)}}>
                        <p className='Nb_Gauche'>{81-corsaire}</p>
                    </div>
                </div>
                <div className='deliRed'>
                    <div className='jauge' style={{width: 487-(deliRed*2.95)}}>
                        <p className='Nb_Gauche'>{165-deliRed}</p>
                    </div>
                </div>
                <div className='Floris'>
                    <div className='jauge' style={{width: 487-(florisMango*2.7)}}>
                        <p className='Nb_Gauche'>{111-florisMango}</p>
                    </div>
                </div>
                <div className='enghien'>
                    <div className='jauge' style={{width: 487-(enghien*2.7)}}>
                        <p className='Nb_Droit'>{165-enghien}</p>
                    </div>
                </div>
                <div className='forest'>
                    <div className='jauge' style={{width: 487-(forest*2.7)}}>
                        <p className='Nb_Droit' >{53-forest}</p>
                    </div>
                </div>
                <div className='sillyRed'>
                    <div className='jauge' style={{width: 487-(sillyRed*2.95)}}>
                        <p className='Nb_Droit' >{165-sillyRed}</p>
                    </div>
                </div>
                <div className='sesion'>
                        <div className='jauge' style={{width: 487-(saison*4.4)}}>
                            <p className='Nb_Droit'>{111 - saison}</p>
                        </div>
                </div>

                <div className='PtsDeli'>
                    <p>{PtsDeli}</p>
                </div>

                <div className='PtsSilly'>
                    <p>{PtsSilly}</p>
                </div>
                    <img className="bg" src={asset_url("/images/duelDesBrasseursP23/duelSillyDeliBG.png")}></img>
            </div>
        )
    }

}



export default DuelSillyDeliP23