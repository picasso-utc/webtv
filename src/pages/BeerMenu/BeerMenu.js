import React from 'react';
import { Typography, Box } from '@material-ui/core';
import {ajaxGet2, ajaxGet} from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import './BeerMenu.css';
import {deDE} from "@material-ui/core/locale";

const MAX_JAUGE_PX = 375;

// Duel Gnome Knight A24

class BeerMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            drinks : [
            ],
            currentPage : 0

        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.attackQueue !== this.attackQueue) {
            this.handleAttack();
        }
    }

    componentDidMount(){
        this.loadDrinks2();
        setInterval(() => this.loadDrinks2(), 60 * 1000);
        this.interval = setInterval(this.nextPage, 5*1000); // Changer toutes les 10 secondes
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    nextPage = () => {
        const totalPages = Math.ceil(this.state.drinks.length / 12);
        this.setState((prevState) => ({
            currentPage: (prevState.currentPage + 1) % totalPages, // Passer à la page suivante
        }));
    };

    getCurrentDrinks = () => {
        const startIndex = this.state.currentPage * 10;
        const endIndex = startIndex + 12;
        return this.state.drinks.slice(startIndex, endIndex); // Prendre les 10 bières actuelles
    };


    loadDrinks2(){
        const url = `/payutc/public/articles`;
        ajaxGet(url).then(
            res => {
                this.setState({
                    drinks : res.data.find(category => category.name === "Bouteilles").products
                })
            });
        console.log(this.state.drinks);
    }

    render() {
        const currentDrinks = this.getCurrentDrinks();
        console.log(this.state.drinks);
        console.log("current drinks :", currentDrinks)
        return (
            <div className='body'>
                {/* Image de fond */}
                <img className="bg" src={asset_url("/images/westernBeer.webp")} alt="background"/>

                {/* Affichage des bouteilles */}
                <div className="bouteilles-list">
                    {currentDrinks.map((bouteille) => (
                        <div key={bouteille.id} className="bouteille-item">
                            <h2>{bouteille.name}</h2>
                            <p>Prix : {bouteille.price / 100}€</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default BeerMenu;
