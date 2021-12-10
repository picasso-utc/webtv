import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ajaxPost } from '../utils/Ajax';
import { asset_url } from '../utils/Config';
import Grid from '@material-ui/core/Grid';


class PermFormule1 extends React.Component {

    // Mercedes - Deli => 458
    // Red Bull Racing - Cuvée =>  457
    // Ferrari - Kastell => 14821
    // McLaren - Cidre => 16581
    // Alpine - Queue de charue => 16650
    // Alpha Tauri - Val Dieu => 12492
    // Aston Martin - Castor => 16755
    // Williams - Harmony => 12463
    // Alfa Romeo - Chimay Rouge => 16870
    // Haas - Limonade => 1800
    constructor(props) {
        super(props);
        this.state = {
            beers : {
                mercedes : {
                    delirium:{
                        name: 'Mercedes - Delirium',
                        id: 458,
                        nb: 0,
                        color:'#00D2BE',
                        img:'/images/mercedes.png',
                    }
                },
                redBull:{
                    cuvee:{
                        name: 'Red Bull - Cuvée',
                        id: 457,
                        nb: 0,
                        color:'#0600EF',
                        img:'redbull.png',
                    },
                },
                ferrari:{
                    kastell:{
                        name: 'Ferrari - Kastell red',
                        id: 14821,
                        nb:0,
                        color:'#DC0000',
                        img:'ferrari.png',
                    }
                },
                mclaren:{
                    cidre:{
                        color:'#FF8700',
                        name: 'McLaren - Cidre brut',
                        id:16581,
                        nb:0,
                        img:'mclaren.png',
                    }
                },
                alpine:{
                    queue:{
                        color:'#0090FF',
                        name: 'Alpine - Queue de charue',
                        id: 16650,
                        nb:0,
                        img:'alpine.png',
                    }
                },
                alphaTauri:{
                    valDieu:{
                        color:'#2B4562',
                        name:'Alpha Tauri - Val Dieu',
                        id:12492,
                        nb:0,
                        img:'alphatauri.png',
                    }
                },
                astonMartin:{
                    castor:{
                        color:'#006F62',
                        name:'Aston Martin - Castor IPA',
                        id:16755,
                        nb:0,
                        img:'aston.png',
                    }
                },
                williams:{
                    harmony:{
                        color:'#005AFF',
                        name: 'Williams - Harmony',
                        id:16715,
                        nb:0,
                        img:'williams.png',
                    }
                },
                alphaRomeo:{
                    chimayRed:{
                        color:'#900000',
                        name:'Alfa Roméo - Chimay Red',
                        id:16870,
                        nb:0,
                        img:'alfaromeo.png',
                    }
                },
                haas:{
                    limonade:{
                        color:'#FFFFFF',
                        name:'Haas - BarBar',
                        id: 1403,
                        nb: 0,
                        img:'haas.png',
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
            let beersToday = res.data.beers;
            let nouvelleValue = this.state.beers
            for (let ecurie in beersToday){
                let keysEcurie = Object.keys(beersToday[ecurie])
                nouvelleValue[ecurie][keysEcurie[0]].nb = beersToday[ecurie][keysEcurie[0]].quantity
            }

        this.setState({beers:nouvelleValue})
        }).catch(error => {
            console.log(error);
        })
    }


    render() {
        const { classes } = this.props;
        const { beers } = this.state;

        const keysBeer = Object.keys(beers).sort(function(a,b){
            let aKeys = Object.keys(beers[a])
            let bKeys = Object.keys(beers[b])
            return  beers[b][[bKeys][0]].nb - beers[a][[aKeys][0]].nb
        })

        let test = [];

        keysBeer.map((value) =>{
            Object.keys(beers[value]).map((ecurie) =>{
                test.push({
                    name:beers[value][ecurie].name,
                    nb:beers[value][ecurie].nb,
                    color:beers[value][ecurie].color,
                    img:beers[value][ecurie].img,
                })
            })
        })

        console.log(test)
        const backgroundImage = {
            backgroundImage: 'url(\'' + asset_url('/images/f1_background.jpg') + '\')',
        }

        return (
            // <Grid container alignItems="center" justifyContent="center" className={classes.main} style={backgroundImage}>
            <Grid container alignItems="center" justifyContent="center" className={classes.main} style={backgroundImage}>
                {
                    <Grid container alignItems="center" justifyContent="center"  className={classes.mainContainer}>
                        <Grid item container direction={"column"}>
                            <h1 className={classes.title}>FORMULA 1</h1>
                            <h2 className={classes.title}>PIC GRAND PRIX</h2>
                        </Grid>
                        <Grid item container direction={"row"} className={classes.containerTeam}>
                            <Grid item direction={"column"} className={classes.containerLeader}>
                                <h1 className={classes.title}>LEADERS</h1>
                                <img item src={asset_url(test[0].img)} className={classes.leaderLogo}/>
                            </Grid>
                            <Grid  item  direction={"column"}>
                                <h1 className={classes.title}>CONSTRUCTOR CHAMPIONSHIP</h1>
                                {
                                    test.map(((value,index) => {
                                        const style = {
                                            width: '5px',
                                            height: '20px',
                                            backgroundColor : value.color
                                        }
                                        console.log(value)
                                        return(
                                            <Grid direction={"row"} container justify={"space-between"}>
                                                <p item className={classes.rank}> {index+1}</p>
                                                <div item style={style}></div>
                                                <Grid item justify={"flex-start"}>
                                                    <p item className={classes.nameEcurie}>{value.name}</p>
                                                </Grid>
                                                <p item className={classes.nameEcurie}>{value.nb} pts</p>
                                            </Grid>
                                            )
                                    }))
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                }
            </Grid>
        );
    }
}

const styles = theme => ({
    main: {
        backgroundColor: "#000000",
        height: '100vh',
    },
    title : {
        color:'#FFFFFF',
        marginTop: '0px',
    },
    nameEcurie : {
        color : 'white',
        marginTop: '0px',
    },
    containerLeader:{
        marginRight:'35px'
    },
    mainContainer:{
        borderTopWidth:'2px',
        borderTopStyle:'solid',
        borderTopColor: '#FFFFFF',
        borderLeftWidth:'2px',
        borderLeftStyle:'solid',
        borderLeftColor: '#FFFFFF',
        borderTopLeftRadius:'25px',
        padding:'25px',
        borderBottomRightRadius:'25px',
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        width:'60%',
        margin:'auto',
    },
    rank:{
        color : 'black',
        backgroundColor: 'white',
        width: '20px',
        height : '20px',
        textAlign : 'center'
    },
    containerTeam:{
        borderTopWidth:'2px',
        borderTopStyle:'solid',
        borderTopColor: '#FF0000',
        verticalAlign:"middle",
    },
    leaderLogo:{
        fit : 'contain',
    },

});

export default withStyles (styles) (PermFormule1)

