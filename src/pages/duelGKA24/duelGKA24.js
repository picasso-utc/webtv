import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import './duelGKA24.css';

// Duel Gnome Knight A24


class duelGKA24 extends React.Component {

    constructor(props) {
        super(props);

        const PTS_GNOME_ID = 19812;
        const PTS_KNIGHT_ID = 19811;
        const CUVEE_ID = 19820;
        const RASTA_ID = 19817;
        const LUPULUS_ID = 19815;
        const VALDIEU_ID = 19822;
        const ANGELUS_ID = 19816;
        const RUBUS_ID = 19819;

    
        this.state = {
            drinks : [
                {
                    id: PTS_GNOME_ID,
                    title : 'PtsGnome',
                    total: 0
                },
                {
                    id: PTS_KNIGHT_ID,
                    title : 'PtsKnight',
                    total: 0
                },
                {
                    id: CUVEE_ID,
                    title : 'cuvee',
                    total: 0
                },
                {
                    id: RASTA_ID,
                    title : 'rasta',
                    total: 0
                },
                {
                    id: LUPULUS_ID,
                    title : 'lupulus',
                    total: 0
                },
                {
                    id: VALDIEU_ID,
                    title : 'valdieu',
                    total: 0
                },
                {
                    id: ANGELUS_ID,
                    title : 'angelus',
                    total: 0
                },
                {
                    id: RUBUS_ID,
                    title : 'rubus',
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
        
        const PtsGnome = this.state.drinks.find(x => x.id === PTS_GNOME_ID).total;
        const PtsKnight = this.state.drinks.find(x => x.id === PTS_KNIGHT_ID).total;
        const cuvee = this.state.drinks.find(x => x.id === CUVEE_ID).total;
        const rasta = this.state.drinks.find(x => x.id === RASTA_ID).total;
        const lupulus = this.state.drinks.find(x => x.id === LUPULUS_ID).total;
        const valdieu = this.state.drinks.find(x => x.id === VALDIEU_ID).total;
        const angelus = this.state.drinks.find(x => x.id === ANGELUS_ID).total;
        const rubus = this.state.drinks.find(x => x.id === RUBUS_ID).total;


        return (
            <div className='body'>
                <div className='cuvee'>
                    <div className='jauge' style={{width: 487-(cuvee*2.95)}}>
                        <p className='Nb_Gauche' >{165-cuvee}</p>
                    </div>
                </div>
                <div className='rasta'>
                    <div className='jauge' style={{width: 487-(rasta*6)}}>
                        <p className='Nb_Gauche'>{81-rasta}</p>
                    </div>
                </div>
                <div className='lupulus'>
                    <div className='jauge' style={{width: 487-(lupulus*2.95)}}>
                        <p className='Nb_Gauche'>{165-lupulus}</p>
                    </div>
                </div>
                <div className='valdieu'>
                    <div className='jauge' style={{width: 487-(valdieu*2.7)}}>
                        <p className='Nb_Droit'>{165-valdieu}</p>
                    </div>
                </div>
                <div className='angelus'>
                    <div className='jauge' style={{width: 487-(angelus*2.7)}}>
                        <p className='Nb_Droit' >{53-angelus}</p>
                    </div>
                </div>
                <div className='rubus'>
                    <div className='jauge' style={{width: 487-(rubus*2.95)}}>
                        <p className='Nb_Droit' >{165-rubus}</p>
                    </div>
                </div>

                <div className='PtsGnome'>
                    <p>{PtsGnome}</p>
                </div>

                <div className='PtsKnight'>
                    <p>{PtsKnight}</p>
                </div>
                    <img className="bg" src={asset_url("/images/duelDesBrasseursP23/duelSillyDeliBG.png")}></img>
            </div>
        )
    }

}



export default duelGKA24