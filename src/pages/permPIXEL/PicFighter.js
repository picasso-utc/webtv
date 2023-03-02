import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import Grid from '@material-ui/core/Grid';
import { Typography, Box } from '@material-ui/core';
import './PicFighter.css';


class PicFighter extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            drinks : [
                {
                    id: 14821,
                    title : 'kasteel',
                    total: 0,
                    team: "right"
                },
                {
                    id: 17881,
                    title : 'bush',
                    total: 0,
                    team: "right"
                },
                {
                    id: 12492,
                    title : 'valdieu',
                    total: 0,
                    team: "right"
                },
                {
                    id: 457,
                    title : 'cuvee',
                    total: 0,
                    team: "left"
                },
                {
                    id: 458,
                    title : 'delirium',
                    total: 0,
                    team: "left"
                },
                {
                    id: 17835,
                    title : 'mordue',
                    total: 0,
                    team: "left"
                },
            ],
            attackQueue : [],
            attacking : false,
            animationUrl : 'images/idle.gif',
            selected: ''
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
        setInterval(() => this.loadDrinks(), 10 * 1000);
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    async handleAttack(){
        if(this.state.attacking) return;
        if(this.state.attackQueue.length <= 0) return;

        // LOCK
        this.setState({
            attacking : true
        })

        // RETRIEVE AND UPDATE
        let tempAttackQueue = this.state.attackQueue;

        const item = tempAttackQueue.splice(Math.floor(Math.random()*tempAttackQueue.length), 1)[0];

        this.setState({
            attackQueue : tempAttackQueue,
            selected: item.title
        })

        await this.playAttackAnimation(item.team)

        this.handleAttack();
    }

    async playAttackAnimation(side) {
        if (side == 'left') this.state.animationUrl = asset_url("/images/left_hit.gif")
        if (side == 'right') this.state.animationUrl = asset_url("/images/right_hit.gif")
        
        await this.sleep(700)

        // UNLOCK
        this.setState({
            attacking : false,
            selected: '',
            animationUrl : asset_url("/images/idle.gif")
        })

        return new Promise(resolve  => {}); 
    }

    loadDrinks(){
        ajaxPost('payutc/public/drinks/sells', {'drinks' : this.state.drinks}).then(
            res => {

                for(let i = 0; i < this.state.drinks.length; i++) {
                    const delta = res.data.drinks[i].total - this.state.drinks[i].total;
                    
                    for(let j = 0; j < delta; j++)
                        this.state.attackQueue.push({'title' : this.state.drinks[i].title, 'team' : this.state.drinks[i].team})
                }

                this.setState({
                    drinks : res.data.drinks
                });
            }
        )
    }

	render() {
        const { classes } = this.props;
        const { drinks, attackQueue } = this.state;
        const listItems = attackQueue.map((d) => <li>{d.team}</li>);
        const animationUrl = this.state.animationUrl

		return (
            <Box className={classes.root}>
                    <div className="HUD">
                        <img src = {asset_url("/images/HUD.png")}></img>
                    </div>
                    <div className="fight">
                        <img className="attack"
                                src={this.state.animationUrl}
                                alt="attack">
                            </img>
                    </div>
                    <br></br>
                    <div className="left">
                        <div className="beer_wrapper">
                            <img className={`beer_img delirium ${(this.state.selected === "delirium") ? "beer_img-selected" : ""}`}
                                src={asset_url("/images/deliPixel.png")}
                                alt="delirium">
                            </img>
                            <p className="beer_label">x{this.state.drinks.filter((element) => element.title === "delirium")[0].total}</p>
                        </div>
                        <div className="beer_wrapper">
                            <img className={`beer_img delirium ${(this.state.selected === "cuvee") ? "beer_img-selected" : ""}`}
                                src={asset_url("/images/cuveePixel.png")}
                                alt="cuvée">
                            </img>
                            <p className="beer_label">x{this.state.drinks.filter((element) => element.title === "cuvee")[0].total}</p>
                        </div>
                        <div className="beer_wrapper">
                            <img className={`beer_img delirium ${(this.state.selected === "mordue") ? "beer_img-selected" : ""}`}
                                src={asset_url("/images/morduePixel.png")}
                                alt="mordue">
                            </img>
                            <p className="beer_label">x{this.state.drinks.filter((element) => element.title === "mordue")[0].total}</p>    
                        </div>
                    </div>
                    <div className="right">
                        <div className="beer_wrapper">
                            <p className="beer_label">x{this.state.drinks.filter((element) => element.title === "kasteel")[0].total}</p>
                            <img className={`beer_img delirium ${(this.state.selected === "kasteel") ? "beer_img-selected" : ""}`}
                                src={asset_url("/images/kasteelPixel.png")}
                                alt="right">
                            </img>
                        </div>
                        <div className="beer_wrapper">
                        <p className="beer_label">x{this.state.drinks.filter((element) => element.title === "bush")[0].total}</p>
                            <img className={`beer_img delirium ${(this.state.selected === "bush") ? "beer_img-selected" : ""}`}
                                src={asset_url("/images/bushPixel.png")}
                                alt="bush">
                            </img>
                        </div>
                        <div className="beer_wrapper">
                        <p className="beer_label">x{this.state.drinks.filter((element) => element.title === "valdieu")[0].total}</p>
                            <img className={`beer_img delirium ${(this.state.selected === "valdieu") ? "beer_img-selected" : ""}`}
                                src={asset_url("/images/valdieuPixel.png")}
                                alt="valdieu">
                            </img>  
                        </div>   
                    </div>
                </Box>
                
		);
	}
}

const styles = theme => ({
    root: {
      height: '100vh',
      width: '100vw',
      backgroundImage: 'url(./images/background.jpg)',
      backgroundColor: 'black',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundOpacity: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '90%',
        height: '90%',
        objectFit: 'cover',
      },
    text: {
      color: '#fff',
      zIndex: 2,    
    }
  });

export default withStyles (styles) (PicFighter)

