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
                        color:'#FF0000',
                        img:'',
                    }
                },
                redBull:{
                    cuvee:{
                        name: 'Red Bull - Cuvée',
                        id: 457,
                        nb: 0,
                        color:'#FF0000',
                        img:'',
                    },
                },
                ferrari:{
                    kastell:{
                        name: 'Ferrari - Kastell red',
                        id: 14821,
                        nb:0,
                        color:'#FF0000',
                        img:'',
                    }
                },
                mclaren:{
                    cidre:{
                        color:'#FF0000',
                        name: 'McLaren - Cidre brut',
                        id:16581,
                        nb:0,
                        img:'',
                    }
                },
                alpine:{
                    queue:{
                        color:'#FF0000',
                        name: 'Alpine - Queue de charue',
                        id: 16650,
                        nb:0,
                        img:'',
                    }
                },
                alphaTauri:{
                    valDieu:{
                        color:'#FF0000',
                        name:'Alpha Tauri - Val Dieu',
                        id:12492,
                        nb:0,
                        img:'',
                    }
                },
                astonMartin:{
                    castor:{
                        color:'#FF0000',
                        name:'Aston Martin - Castor IPA',
                        id:16755,
                        nb:0,
                        img:'',
                    }
                },
                williams:{
                    harmony:{
                        color:'#FF0000',
                        name: 'Williams - Harmony',
                        id:16715,
                        nb:0,
                        img:'',
                    }
                },
                alphaRomeo:{
                    chimayRed:{
                        color:'#FF0000',
                        name:'Alpha Roméo - Chimay Red',
                        id:16870,
                        nb:0,
                        img:'',
                    }
                },
                haas:{
                    limonade:{
                        color:'#FF0000',
                        name:'Haas - BarBar',
                        id: 1403,
                        nb: 0,
                        img:'',
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
                test.push({name:beers[value][ecurie].name, nb:beers[value][ecurie].nb})
            })
        })

        console.log(test)
        const backgroundImage = {
            backgroundImage: 'url(\'' + asset_url('/images/f1_background.jpg') + '\')',
        }
        return (
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
                                <p className={classes.title}>Image constructor : {test[0].name}</p>
                            </Grid>
                            <Grid  item  direction={"column"}>
                                <h1 className={classes.title}>CONSTRUCTOR CHAMPIONSHIP</h1>
                                {
                                    test.map((value => {
                                        return(
                                            <Grid direction={"row"} container justify={"space-between"}>
                                                <div item className={classes.ecurieSquare} style={{backgroundColor:'#FF0000'}}></div>
                                                <p item className={classes.nameEcurie}>{value.name}</p>
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
    ecurieSquare:{
      width: '5px',
      height: '20px'
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
    containerTeam:{
        borderTopWidth:'2px',
        borderTopStyle:'solid',
        borderTopColor: '#FF0000',
        verticalAlign:"middle",
    },

});

export default withStyles (styles) (PermFormule1)

