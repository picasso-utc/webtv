import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import Grid from '@material-ui/core/Grid';
import { Typography, Box } from '@material-ui/core';
import './DuelDesBrasseursP23.css';


class DuelDesBrasseursP23 extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            drinks : [
                {
                    id: 19673,
                    title : 'LBF DIPA',
                    total: 0,
                    team: "left"
                },
                {
                    id: 18442,
                    title : 'LBF IPA',
                    total: 0,
                    team: "left"
                },
                {
                    id: 19672,
                    title : 'LBF NEIPA',
                    total: 0,
                    team: "left"
                },
                {
                    id: 19671,
                    title : 'LBF TRIPLE',
                    total: 0,
                    team: "left"
                },
                {
                    id: 19669,
                    title : 'Lupulus Fructus',
                    total: 0,
                    team: "right"
                },
                {
                    id: 19668,
                    title : 'Lupulus Hopera',
                    total: 0,
                    team: "right"
                },
                {
                    id: 19670,
                    title : 'Lupulus Organicus',
                    total: 0,
                    team: "right"
                },
                {
                    id : 19667,
                    title : 'Lupulus Triple',
                    total : 0,
                    team : "right"
                }
            ],
            attackQueue : [],
            attacking : false,
            animationUrl : 'images/duelDesBrasseursP23/idle.gif',
            selected: '',
            leftHealth : 290,
            rightHealth : 290
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
        if(this.state.leftHealth <= 0) {
            this.setState({leftHealth : 290});
            this.setState({rightHealth : 290});
            return;            
        }
        if(this.state.rightHealth <= 0) {
            this.setState({leftHealth : 290});
            this.setState({rightHealth : 290});
            return;            
        }
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
        if (side == 'left') this.state.animationUrl = asset_url("/images/duelDesBrasseursP23/hit_left.gif")
        if (side == 'right') this.state.animationUrl = asset_url("/images/duelDesBrasseursP23/hit_right.gif")
        
        // HEALTH
        if (side === 'left')
            this.setState({
                leftHealth : this.state.leftHealth - 5
            });
        if (side === 'right')
            this.setState({
                rightHealth : this.state.rightHealth - 5
            });

        await this.sleep(700)

        // UNLOCK
        this.setState({
            attacking : false,
            selected: '',
            animationUrl : asset_url("/images/duelDesBrasseursP23/idle.gif")
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
                        <img src = {asset_url("/images/duelDesBrasseursP23/HUD.png")} class="hud"></img>
                        <div className={`hp-rectangle ${classes.rectangleLeft}`} style={{ width: this.state.rightHealth }}></div>
                        <div className={`hp-rectangle ${classes.rectangleRight}`} style={{ width: this.state.leftHealth }}></div>
                    </div>
                    <div className="fight">
                        <img className="attack"
                                src={this.state.animationUrl}
                                alt="attack">
                            </img>
                    </div>
                    <br></br>
                    <div className="left">
                        <p class="scoreText">{drinks.filter(e => e.team === 'left').map(e => e.total).reduce((a,b) => a + b)}x</p>
                    </div>
                    <div className="right">
                        <p class="scoreText">x{drinks.filter(e => e.team === 'right').map(e => e.total).reduce((a,b) => a + b)}</p>
                    </div>
                </Box>
                
		);
	}
}

const styles = theme => ({
    root: {
      height: '100vh',
      width: '100vw',
      backgroundImage: 'url(./images/backgroundDuel.gif)',
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
    },
    rectangleLeft :{
        position: 'absolute',
        left: '127px',
        top: '60px',
        height: '38px',
        background: '#01FF36',
    },
    rectangleRight :{
        position: 'absolute',
        right: '127px',
        top: '60px',
        height: '38px',
        background: '#01FF36',
    }
  });

export default withStyles (styles) (DuelDesBrasseursP23)

