import React from 'react';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import './PermIFP23.css';

class PermIFP23 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drinks : [
                {
                    id: 17835,
                    title : 'mordue',
                    total: 0
                },                
                {
                    id: 458,
                    title : 'deli',
                    total: 0
                },
                {
                    id: 457,
                    title : 'cuvee',
                    total: 0
                },
                {
                    id: 14821,
                    title : 'kasteel',
                    total: 0
                },
                {
                    id: 12492,
                    title : 'val dieu',
                    total: 0
                },
                {
                    id: 18442,
                    title : 'lbf ipa',
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
        const laMordue = this.state.drinks.find(x => x.id == 17835).total;
        const Delirium = this.state.drinks.find(x => x.id == 458).total;
        const cuveeTroll = this.state.drinks.find(x => x.id == 457).total;
        const kasteel = this.state.drinks.find(x => x.id == 14821).total;
        const valDieu = this.state.drinks.find(x => x.id == 12492).total;
        const LBFIPA = this.state.drinks.find(x => x.id == 18442).total;

        return (
            <div className='body'>
                <div className='samedi'>
                    <div className='rectangle' style={{height: (kasteel+valDieu+LBFIPA)*0.6}}></div>
                </div>
                <div className='dimanche'>
                    <div className='rectangle' style={{height: (laMordue+Delirium+cuveeTroll)*0.6}}></div>
                </div>
                <img className="bg" src={asset_url("/images/BG_IF.png")}></img>
            </div>
        )
    }

}

export default PermIFP23