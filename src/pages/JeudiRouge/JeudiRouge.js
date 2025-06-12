import React from 'react';
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
                    id: 19281,
                    title : 'rouge max',
                    total: 0
                },
                {
                    id: 19280,
                    title : 'tete de mort',
                    total: 0
                },
                {
                    id: 19279,
                    title : 'rince cochon rouge',
                    total: 0
                },
                {
                    id: 19278,
                    title : 'chouffe cherry',
                    total: 0
                },
                {
                    id: 19283,
                    title : 'vieux lille',
                    total: 0
                },
                {
                    id: 19025,
                    title : 'walk the red carpet',
                    total: 0
                },
                {
                    id: 19282,
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
        const rougeMax = this.state.drinks.find(x => x.id == 19281).total;
        const teteDeMort = this.state.drinks.find(x => x.id == 19280).total; 
        const rinceCochonRed = this.state.drinks.find(x => x.id == 19279).total;
        const chouffeCherry = this.state.drinks.find(x => x.id == 19278).total;
        const vieuxLille = this.state.drinks.find(x => x.id == 19283).total;
        const walktrc = this.state.drinks.find(x => x.id == 19025).total;
        const redPoule = this.state.drinks.find(x => x.id == 19282).total; 

        console.log(rinceCochonRed)

        return (
            <div className='body'>
                <div className='deliRed'>
                    <div className='rectangle' style={{height: deliRed*1.75}}></div>
                    <img className='image' src={asset_url("/images/deliRed.png")}></img>
                </div>
                <div className='rougeMax'>
                    <div className='rectangle' style={{height: rougeMax*1.75}}></div>
                    <img className='image' src={asset_url("/images/rougeMax.png")}></img>
                </div>
                <div className='teteDeMort'>
                    <div className='rectangle' style={{height: teteDeMort*1.75}}></div>
                    <img className='image' src={asset_url("/images/teteDeMort.png")}></img>
                </div>
                <div className='rinceCochonRed'>
                    <div className='rectangle' style={{height: rinceCochonRed*1.75}}></div>
                    <img className='image' src={asset_url("/images/rinceCochonRed.png")}></img>
                </div>
                <div className='chouffeCherry'>
                    <div className='rectangle' style={{height: chouffeCherry*1.75}}></div>
                    <img className='image' src={asset_url("/images/chouffeCherry.png")}></img>
                </div>
                <div className='vieuxLille'>
                    <div className='rectangle' style={{height: vieuxLille*1.75}}></div>
                    <img className='image' src={asset_url("/images/vieuxLille.png")}></img>
                </div>
                <div className='walktrc'>
                    <div className='rectangle' style={{height: walktrc*1.75}}></div>
                    <img className='image' src={asset_url("/images/walkTRC.png")}></img>
                </div>
                <div className='redPoule'>
                    <div className='rectangle' style={{height: redPoule*1.75}}></div>
                    <img className='image' src={asset_url("/images/redPoule.png")}></img>
                </div>
                <img className="bg" src={asset_url("/images/JeudiRougeBG.png")}></img>
            </div>
        )
    }

}

export default JeudiRouge