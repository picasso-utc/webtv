import React from 'react';
import { Typography, Box } from '@material-ui/core';
import {ajaxGet, ajaxPost} from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import './duelGKA24.css';

const CUVEE_ID = 457;
const RASTA_ID = 20383;
const LUPULUS_ID = 20500;
const VALDIEU_ID = 12492;
const STFEUILLIEN_ID = 890;
const RUBUS_ID = 20417;

const MAX_JAUGE_PX = 375;

// Duel Gnome Knight A24

class duelGKA24 extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            drinks : [
                {
                    id: CUVEE_ID,
                    title : 'Croissant',
                    total: 0
                },
                {
                    id: RASTA_ID,
                    title : 'Café',
                    total: 0
                },
                {
                    id: LUPULUS_ID,
                    title : 'Rauch Orange',
                    total: 0
                },
                {
                    id: VALDIEU_ID,
                    title : 'So Chips Oignons caramélisés',
                    total: 0
                },
                {
                    id: STFEUILLIEN_ID,
                    title : 'So Chips Nature',
                    total: 0
                },
                {
                    id: RUBUS_ID,
                    title : 'So Chips Epices',
                    total: 0
                },
            ],
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
        const drinkNames = this.state.drinks.map(drink => drink.title);
        const queryString = drinkNames.join(';');
        console.log(queryString);
        const url = `/get-sales/${encodeURIComponent(queryString)}`;
        console.log(url)
        ajaxGet(url).then(
            res => {
                this.setState({
                    drinks : res.data.drinks
                });
            }
        )
    }

    render() {
        
        const cuvee = this.state.drinks.find(x => x.id === CUVEE_ID).total;
        const rasta = this.state.drinks.find(x => x.id === RASTA_ID).total;
        const lupulus = this.state.drinks.find(x => x.id === LUPULUS_ID).total;
        const valdieu = this.state.drinks.find(x => x.id === VALDIEU_ID).total;
        const stfeuillien = this.state.drinks.find(x => x.id === STFEUILLIEN_ID).total;
        const rubus = this.state.drinks.find(x => x.id === RUBUS_ID).total;




        const PtsGnome = cuvee + rasta + lupulus
        const PtsKnight = valdieu + stfeuillien + rubus
       
        const max_biere = Math.max(cuvee, rasta, lupulus, valdieu, stfeuillien, rubus) 
        
        return (
            <div className='body'>
                <div className='cuvee'>
                    <div className='jauge' style={{width: (cuvee * MAX_JAUGE_PX / max_biere)}}>
                        <p className='Nb_Gauche' >{cuvee}</p>
                    </div>
                </div>
                <div className='rasta'>
                    <div className='jauge' style={{width: (rasta * MAX_JAUGE_PX / max_biere)}}>
                        <p className='Nb_Gauche'>{rasta}</p>
                    </div>
                </div>
                <div className='lupulus'>
                    <div className='jauge' style={{width: (lupulus * MAX_JAUGE_PX / max_biere)}}>
                        <p className='Nb_Gauche'>{lupulus}</p>
                    </div>
                </div>
                <div className='valdieu'>
                    <div className='jauge' style={{width: (valdieu * MAX_JAUGE_PX / max_biere)}}>
                        <p className='Nb_Droit'>{valdieu}</p>
                    </div>
                </div>
                <div className='stfeuillien'>
                    <div className='jauge' style={{width: (stfeuillien * MAX_JAUGE_PX / max_biere)}}>
                        <p className='Nb_Droit'>{stfeuillien}</p>
                    </div>
                </div>
                <div className='rubus'>
                    <div className='jauge' style={{width: (rubus * MAX_JAUGE_PX / max_biere)}}>
                        <p className='Nb_Droit' >{rubus}</p>
                    </div>
                </div>
                <div className='PtsGnome'>
                    <p>{PtsGnome}</p>
                </div>
                <div className='PtsKnight'>
                    <p>{PtsKnight}</p>
                </div>
                <img className="bg" src={asset_url("/images/fond_GKA24.png")}></img>
            </div>
        )
    }

}

export default duelGKA24