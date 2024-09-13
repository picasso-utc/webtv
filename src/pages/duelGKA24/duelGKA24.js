import React from 'react';
import { Typography, Box } from '@material-ui/core';
import {ajaxGet2} from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import './duelGKA24.css';
import {deDE} from "@material-ui/core/locale";

const MAX_JAUGE_PX = 375;

// Duel Gnome Knight A24

class duelGKA24 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drinks : [
                { title : 'Cuvée des Trolls PC', total: 0 },
                { title : 'Kasteel Rubus PC', total: 0 },
                { title : 'Angelus triple', total: 0 },
                { title : 'Lupulus Triple PC', total: 0 },
                { title : 'Val Dieu Triple PC', total: 0 },
                { title : 'Rasta troll', total: 0 },
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
        // console.log(this.state.drinks);
    }

    loadDrinks(){
        const drinkNames = this.state.drinks.map(drink => drink.title);
        const queryString = drinkNames.join(';');
        console.log(queryString);
        const url = `/get-sales/${encodeURIComponent(queryString)}`;
        ajaxGet2(url).then(
            res => {
                const reformattedDrinks = Object.keys(res.data).map(key => ({
                    title: key,
                    total: res.data[key]
                }));
                this.setState({
                    drinks : reformattedDrinks
                });
            }
        )
    }

    render() {
        const getTotal = (title) => {
            let drink = null;
            for (let i = 0; i < this.state.drinks.length; i++) {
                const currentDrink = this.state.drinks[i];
                if (currentDrink.title === title) {
                    drink = currentDrink;
                    break;
                }
            }
            return drink ? drink.total : 0;
        };

        const cuvee = getTotal('Cuvée des Trolls PC');
        const rasta = getTotal('Rasta troll');
        const lupulus = getTotal('Lupulus Triple PC');
        const valdieu = getTotal('Val Dieu Triple PC');
        const stfeuillien = getTotal('Angelus triple');
        const rubus = getTotal('Kasteel Rubus PC');

        const PtsGnome = cuvee + rasta + lupulus;
        const PtsKnight = valdieu + stfeuillien + rubus;

        const max_biere = Math.max(cuvee, rasta, lupulus, valdieu, stfeuillien, rubus);

        return (
            <div className='body'>
                <div className='cuvee'>
                    <div className='jauge' style={{width: (cuvee * MAX_JAUGE_PX / max_biere)}}>
                        <p className='Nb_Gauche'>{cuvee}</p>
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
                        <p className='Nb_Droit'>{rubus}</p>
                    </div>
                </div>
                <div className='PtsGnome'>
                    <p>{PtsGnome}</p>
                </div>
                <div className='PtsKnight'>
                    <p>{PtsKnight}</p>
                </div>
                <img className="bg" src={asset_url("/images/fond_GKA24.png")} alt="background" />
            </div>
        )
    }
}

export default duelGKA24;
