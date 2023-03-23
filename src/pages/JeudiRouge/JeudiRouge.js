import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import './JeudiRouge.css';

class JeudiRouge extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks : [
                {
                    id: 12466,
                    title : 'deli red',
                    total: 0
                },                
                {
                    id: 14821,
                    title : 'rouge max',
                    total: 0
                },
                {
                    id: 17881,
                    title : 'tete de mort',
                    total: 0
                },
                {
                    id: 12492,
                    title : 'rince cochon rouge',
                    total: 0
                },
                {
                    id: 457,
                    title : 'chouffe cherry',
                    total: 0
                },
                {
                    id: 458,
                    title : 'vieux lille',
                    total: 0
                },
                {
                    id: 17835,
                    title : 'walk the red carpet',
                    total: 0
                },
                {
                    id: 20,
                    title : 'red poule',
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
        const deliRed = this.state.drinks.find(x => x.id == 12466).total;
        const rougeMax = this.state.drinks.find(x => x.id == 14821).total;
        const teteDeMort = this.state.drinks.find(x => x.id == 17881).total; 
        const rinceCochonRed = this.state.drinks.find(x => x.id == 12492).total;
        const chouffeCherry = this.state.drinks.find(x => x.id == 457).total;
        const vieuxLille = this.state.drinks.find(x => x.id == 458).total;
        const walktrc = this.state.drinks.find(x => x.id == 17835).total;
        const redPoule = this.state.drinks.find(x => x.id == 20).total; 
        
        console.log(deliRed)

        return (
            <div className='body'>
                <div className='deliRed'>
                    <div className='rectangle' style={{height: deliRed}}></div>
                    <img className='image' src={asset_url("/images/deliRed.png")}></img>
                </div>
                <div className='rougeMax'>
                    <div className='rectangle' style={{height: rougeMax}}></div>
                    <img className='image' src={asset_url("/images/rougeMax.png")}></img>
                </div>
                <div className='teteDeMort'>
                    <div className='rectangle' style={{height: teteDeMort}}></div>
                    <img className='image' src={asset_url("/images/teteDeMort.png")}></img>
                </div>
                <div className='rinceCochonRed'>
                    <div className='rectangle' style={{height: rinceCochonRed}}></div>
                    <img className='image' src={asset_url("/images/rinceCochonRed.png")}></img>
                </div>
                <div className='chouffeCherry'>
                    <div className='rectangle' style={{height: chouffeCherry}}></div>
                    <img className='image' src={asset_url("/images/chouffeCherry.png")}></img>
                </div>
                <div className='vieuxLille'>
                    <div className='rectangle' style={{height: vieuxLille}}></div>
                    <img className='image' src={asset_url("/images/vieuxLille.png")}></img>
                </div>
                <div className='walktrc'>
                    <div className='rectangle' style={{height: walktrc}}></div>
                    <img className='image' src={asset_url("/images/walkTRC.png")}></img>
                </div>
                <div className='redPoule'>
                    <div className='rectangle' style={{height: redPoule}}></div>
                    <img className='image' src={asset_url("/images/redPoule.png")}></img>
                </div>
                <img className="bg" src={asset_url("/images/JeudiRougeBG.png")}></img>
            </div>
        )
    }

}

export default JeudiRouge