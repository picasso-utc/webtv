import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';

import './duelbrasseurP24.css';

const StyledRoot = styled('div')({
  height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundOpacity: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
});

const StyledAnimationUrl = styled('div')({
  size : '100%',
        width : '500px'
});

const StyledOverlay = styled('div')({
  position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(73,20,62,0.5)',
        zIndex: 1
});

const StyledVideo = styled('div')({
  position: 'absolute',
        top: 0,
        left: 0,
        width: '90%',
        height: '90%',
        objectFit: 'cover'
});

const StyledText = styled('div')({
  color: '#fff',
        zIndex: 2
});

const StyledRectangleLeft = styled('div')({
  position: 'absolute',
        left: '0px',
        top: '200px',
        height: '38px',
        background: '#ff80b5',
        border : 'solid white'
});

const StyledRectangleLeftBorder = styled('div')({
  position: 'absolute',
        left: '0px',
        top: '200px',
        height: '38px',
        background: 'rgba(255,1,107,0)',
        border : 'solid white',
        index : '1'
});

const StyledRectangleRight = styled('div')({
  position: 'absolute',
        right: '0px',
        top: '200px',
        height: '38px',
        background: '#969696',
        border : 'solid white'
});

const StyledRectangleRightBorder = styled('div')({
  position: 'absolute',
        right: '0px',
        top: '200px',
        height: '38px',
        background: 'rgba(255,1,107,0)',
        border : 'solid white',
        index : '1'
});

class DuelKasteel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            drinks : [
                {
                    id : 19824,
                    title : 'Delirium Tremens',
                    total : 0,
                    team : "left"
                },
                {
                    id : 20379,
                    title : 'Paranoia',
                    total : 0,
                    team : "left"
                },
                {
                    id : 20500,
                    title : 'Lupulus Triple',
                    total : 0,
                    team : "right"
                },
                {
                    id : 20586,
                    title : 'Lupulus Hopera',
                    total : 0,
                    team : "right"
                }
            ],
            attackQueue : [],
            attacking : false,
            animationUrl : 'images/duelbrasseurP24/idle.gif',
            selected : '',
            leftHealth : 342,
            rightHealth : 342
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
            this.setState({leftHealth : 342});
            this.setState({rightHealth : 342});
            return;
        }
        if(this.state.rightHealth <= 0) {
            this.setState({leftHealth : 342});
            this.setState({rightHealth : 342});
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
        if (side == 'left') this.state.animationUrl = asset_url("/images/duelbrasseurP24/lefthit.gif")
        if (side == 'right') this.state.animationUrl = asset_url("/images/duelbrasseurP24/righthit.gif")

        // HEALTH
        if (side === 'left')
            this.setState({
                rightHealth : this.state.rightHealth - 1
            });
        if (side === 'right')
            this.setState({
                leftHealth : this.state.leftHealth - 1
            });

        await this.sleep(2160)

        // UNLOCK
        this.setState({
            attacking : false,
            selected: '',
            animationUrl : asset_url("/images/duelbrasseurP24/idle.gif")
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
        const {} = this.props;
        const { drinks, attackQueue } = this.state;
        const listItems = attackQueue.map((d) => <li>{d.team}</li>);
        const animationUrl = this.state.animationUrl

        return (
            <Box component={StyledRoot}>
                <div className="HUD">
                    <img src={asset_url("/images/duelbrasseurP24/HUD.png")} className="hud"></img>
                    <div className="left">
                        <p className="scoreText">{drinks.filter(e => e.team === 'left').map(e => e.total).reduce((a, b) => a + b)}x</p>
                    </div>
                    <div className="right">
                        <p className="scoreText">x{drinks.filter(e => e.team === 'right').map(e => e.total).reduce((a, b) => a + b)}</p>
                    </div>
                </div>
                <div className="fight">
                    <img className="attack"
                         src={this.state.animationUrl}
                         alt="attack" loop>
                    </img>
                </div>
                <br></br>

            </Box>

        );
    }

}

export default DuelKasteel