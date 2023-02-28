import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';
import Grid from '@material-ui/core/Grid';


class PicFighter extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            drinks : [
                {
                    id: 17348,
                    title: "Bonne bière 1",
                    total: 0,
                    team: "left"
                },
                {
                    id: 17349,
                    title: "Bonne bière 2",
                    total: 0,
                    team: "right"
                }
            ],
            attackQueue : [],
            attacking : false
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

    handleAttack(){
        if(this.state.attacking) return;
        if(this.state.attackQueue.length <= 0) return;

        // LOCK
        this.state.attacking = true;

        // RETRIEVE AND UPDATE
        let tempAttackQueue = this.state.attackQueue;
        const attack = tempAttackQueue.shift();
        this.setState({
            attackQueue : tempAttackQueue
        })

        // ATTACK
        this.playAttackAnimation(attack);

        this.sleep(2000).then(r => {
            // UNLOCK
            this.state.attacking = false;

            // if attack queue is not empty
            this.handleAttack();
        })
    }

    playAttackAnimation(attack) {
        console.log(attack);
    }

    loadDrinks(){
        ajaxPost('payutc/public/drinks/sells', {'drinks' : this.state.drinks}).then(
            res => {

                for(let i = 0; i < this.state.drinks.length; i++) {
                    const delta = res.data.drinks[i].total - this.state.drinks[i].total;
                    
                    for(let j = 0; j < delta; j++)
                        this.state.attackQueue.push(this.state.drinks[i].team)
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
        const listItems = attackQueue.map((d) => <li>{d}</li>);

		return (
            
            <Grid className="mainContainerPicFighter">
                <p>
                    {drinks[0].id}
                </p>
                <p>
                    {drinks[0].title}
                </p>
                <p>
                    {drinks[0].total}
                </p>

                <div>
                    {listItems }
                </div>
            </Grid>   

		);
	}
}

const styles = theme => ({});

export default withStyles (styles) (PicFighter)

