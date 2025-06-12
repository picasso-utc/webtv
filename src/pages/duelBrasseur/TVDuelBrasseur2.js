import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';

const StyledBody = styled('div')({
  fontWeight: 500
});

const StyledMain = styled('div')({
  height: '100vh', 
        backgroundColor: '#000223', 
        color: 'white', 
        padding: '2% 1%',
        fontWeight: 600,
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '5% 50%',
        backgroundSize: '10%'
});

const StyledPic = styled('div')({
  backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '95% 50%',
        backgroundSize: '10%',
        height: '100%', 
        border: '1.5px solid #B22132'
});

const StyledDuel_img = styled('div')({
  objectFit: 'contain', 
        height: '100%',
        width: '100%'
});

const StyledImg_div_left = styled('div')({
  height: '100%', 
        paddingRight: 0,
        textAlign: 'right',
        paddingTop: 15
});

const StyledImg_div_right = styled('div')({
  height: '100%', 
        paddingRight: 0,
        textAlign: 'left',
        paddingTop: 15
});

const StyledBeer_img = styled('div')({
  objectFit: 'contain', 
        height: '80%',
        borderRadius: 5
});

const StyledBeer_name = styled('div')({
  height: '20%',
        fontSize: 20,
        display: 'block',
        marginTop: -5
});

const StyledLeft = styled('div')({
  textAlign: 'right'
});

const StyledRight = styled('div')({
  textAlign: 'left'
});

const StyledDiv_score = styled('div')({
  height: '100%',
        position: 'relative'
});

const StyledLeft_score_img = styled('div')({
  borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
});

const StyledRight_score_img = styled('div')({
  borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
});

const StyledLeft_score = styled('div')({
  right: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        top: '35%',
        height: '30%',
        width: '80%',
        position: 'absolute',
        backgroundColor: '#B22132'
});

const StyledRight_score = styled('div')({
  left: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        top: '35%',
        height: '30%',
        width: '80%',
        position: 'absolute',
        backgroundColor: '#B22132'
});


class TVDuelBrasseur2 extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            beers : {
                duel_1 : {
                    delirium : {
                        id: 458,
                        percentage: ''
                    },
                    cuvee: {
                        id: 457,
                        percentage: ''
                    },
                },
                duel_2 : {
                    delired: {
                        id: 13565,
                        percentage: ''
                    },
                    pechemel: {
                        id: 15707,
                        percentage: ''
                    }
                },
                duel_3 : {
                    delinoel: {
                        id : 15705,
                        percentage: ''
                    },
                    bush: {
                        id: 13798,
                        percentage: ''
                    }
                },
                duel_4 : {
                    argentum: {
                        id: 15706,
                        percentage: ''
                    },
                    surfine: {
                        id: 15704,
                        percentage: ''
                    }
                }
            }
        }
	}

	componentDidMount(){
        this.loadBeerSells();
        setInterval(() => this.loadBeerSells(), 60*1000);
    }


    loadBeerSells(){
        ajaxPost('payutc/public/beers/sells', {'beers' :this.state.beers}).then(res => {
            let beers = res.data.beers;
            const duels = Object.keys(beers);
            for (let index = 0; index < duels.length; index++) {
                const duel_beers = Object.keys(beers[duels[index]]);
                let duel_total_sells = 0
                for (let beer_index = 0; beer_index < duel_beers.length; beer_index++) {
                    duel_total_sells += beers[duels[index]][duel_beers[beer_index]].quantity;
                }
                for (let beer_index = 0; beer_index < duel_beers.length; beer_index++) {
                    const beer_sells = beers[duels[index]][duel_beers[beer_index]].quantity;
                    console.log(duel_beers[beer_index])
                    const beer_div = document.getElementById(duel_beers[beer_index]);
                    if (beer_sells === 0) {
                        beers[duels[index]][duel_beers[beer_index]].percentage = "0.0%"
                        beer_div.style.width = '0%';
                    } else {
                        const percentage = 85 * (beer_sells/duel_total_sells);
                        beers[duels[index]][duel_beers[beer_index]].percentage = (100*(beer_sells/duel_total_sells)).toFixed(1) + "%"
                        beer_div.style.width = percentage + '%';
                    }
                }
            }
            this.setState({beers: beers})
        }).catch(error => {
            console.log(error);
        })
    }


	render() {

        const {} = this.props;
        const { beers } = this.state;
        const backgroundImage = {
            backgroundImage: 'url(\'' + asset_url('/images/background_logo.png') + '\')'
        }

		return (
            
            <div component={StyledMain} style={backgroundImage}>
                
                <div style={backgroundImage} component={StyledPic}>
                    <Grid container direction="row" style={{height: '3%'}}>
                    </Grid>
                    <Grid container direction="row" style={{height: '12%'}}>
                        <img src={asset_url("/images/duel_fredo.png")} component={StyledDuel_img} alt="Duel des brasseurs"/>
                    </Grid>


                    {/* DUEL 1 */}
                    <Grid container direction="row" style={{height: '20%'}}>
                        <Grid item xs={3} component={StyledImg_div_left} id="deli">
                            <img alt="deli_beer" src={asset_url("/images/delirium.jpg")} component={StyledBeer_img}/>
                            <span component={StyledBeer_name}>Délirium ({beers.duel_1.delirium.percentage})</span>
                        </Grid>
                        <Grid item xs={3} component={StyledDiv_score}>
                            <div component={StyledLeft_score} id="delirium">
                                <img alt="deli_score" src={asset_url("/images/beer_3.jpg")} component={StyledLeft_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} component={StyledDiv_score}>
                            <div component={StyledRight_score} id="cuvee">
                                <img alt="cuvee_score" src={asset_url("/images/beer_3.jpg")} component={StyledRight_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} component={StyledImg_div_right}>
                            <img alt="cuvee_beer" src={asset_url("/images/cuvee.png")} component={StyledBeer_img}/>
                            <span component={StyledBeer_name}>Cuvée ({beers.duel_1.cuvee.percentage})</span>
                        </Grid>
                    </Grid>


                    {/* DUEL 2 */}
                    <Grid container direction="row" style={{height: '20%'}}>
                        <Grid item xs={3} component={StyledImg_div_left}>
                            <img alt="delired_beer" src={asset_url("/images/deli_red.png")} component={StyledBeer_img}/>
                            <span component={StyledBeer_name}>Déli Red ({beers.duel_2.delired.percentage})</span>
                        </Grid>
                        <Grid item xs={3} component={StyledDiv_score}>
                            <div component={StyledLeft_score} id="delired">
                                <img alt="delired_score" src={asset_url("/images/beer_3.jpg")} component={StyledLeft_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} component={StyledDiv_score}>
                            <div component={StyledRight_score} id="pechemel">
                                <img alt="pechemel_score" src={asset_url("/images/beer_3.jpg")} component={StyledRight_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} component={StyledImg_div_right}>
                            <img alt="pechemel_beer" src={asset_url("/images/pechemel.jpg")} component={StyledBeer_img}/>
                            <span component={StyledBeer_name}>Pêche Mel ({beers.duel_2.pechemel.percentage})</span>
                        </Grid>
                    </Grid>


                    {/* DUEL 3 */}
                    <Grid container direction="row" style={{height: '20%'}}>
                        <Grid item xs={3} component={StyledImg_div_left}>
                            <img alt="delinoel_beer" src={asset_url("/images/delinoel.jpg")} component={StyledBeer_img}/>
                            <span component={StyledBeer_name}>Déli Noël ({beers.duel_3.delinoel.percentage})</span>
                        </Grid>
                        <Grid item xs={3} component={StyledDiv_score}>
                            <div component={StyledLeft_score} id="delinoel">
                                <img alt="delinoel_score" src={asset_url("/images/beer_3.jpg")} component={StyledLeft_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} component={StyledDiv_score}>
                            <div component={StyledRight_score} id="bush">
                                <img alt="bush_score" src={asset_url("/images/beer_3.jpg")} component={StyledRight_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} component={StyledImg_div_right}>
                            <img alt="bush_beer" src={asset_url("/images/bush.jpg")} component={StyledBeer_img}/>
                            <span component={StyledBeer_name}>Bush Triple ({beers.duel_3.bush.percentage})</span>
                        </Grid>
                    </Grid>
                    

                    {/* DUEL 4 */}
                    <Grid container direction="row" style={{height: '20%'}}>
                        <Grid item xs={3} component={StyledImg_div_left}>
                            <img alt="argentum_beer" src={asset_url("/images/argentum.jpg")} component={StyledBeer_img}/>
                            <span component={StyledBeer_name}>Argentum ({beers.duel_4.argentum.percentage})</span>
                        </Grid>
                        <Grid item xs={3} component={StyledDiv_score}>
                            <div component={StyledLeft_score} id="argentum">
                                <img alt="argentum_score" src={asset_url("/images/beer_3.jpg")} component={StyledLeft_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} component={StyledDiv_score}>
                            <div component={StyledRight_score} id="surfine">
                                <img alt="surfine_score" src={asset_url("/images/beer_3.jpg")} component={StyledRight_score_img}/>
                            </div>
                        </Grid>
                        <Grid item xs={3} component={StyledImg_div_right}>
                            <img alt="surfine_beer" src={asset_url("/images/surfine.png")} component={StyledBeer_img}/>
                            <span component={StyledBeer_name}>Surfine ({beers.duel_4.surfine.percentage})</span>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" style={{height: '5%'}}></Grid>

                </div>
            
            </div>        
		);
	}
}

export default TVDuelBrasseur2

