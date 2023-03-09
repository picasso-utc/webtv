import React from 'react';
import { Typography, Box } from '@material-ui/core';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import './Barbar.css';

class Barbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks : [
                {
                    id: 14821,
                    title : 'barbar',
                    total: 0
                }
            ],
            quantitéL : 135,
            ventes : 0
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
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

                for(let i = 0; i < this.state.drinks.length; i++) {
                    this.setState({
                        ventes : res.data.drinks[i].total,
                        quantitéL : (135 - res.data.drinks[i].total/3).toFixed(2)
                    })
                    

                }

                this.setState({
                    drinks : res.data.drinks
                });
            }
        )
    }

    render() {
        const qty = this.state.quantitéL
        const ventes = this.state.ventes


        return (
            <div className="bg">
                <div className='ventes'>
                    <p>Barbar vendues : {ventes}</p>
                </div>
                <div className='litres'>
                    <p>{qty}L restants</p>    
                </div>                  
                    <img className="biere" src={asset_url("/images/beer.gif")} style={{ bottom: (qty-135)*(6.5)}}></img>
                <div id="footerx">
                </div>
            </div>
        )
    }

}

const styles = theme => ({})

export default Barbar