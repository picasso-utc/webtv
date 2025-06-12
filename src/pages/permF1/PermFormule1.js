import React from 'react';
import {Grid } from '@mui/material';
import { styled } from '@mui/material';
import { ajaxPost } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';

const StyledMain = styled('div')({
  backgroundColor: "#000000",
        height: '100vh'
});

const StyledTitleBig = styled('div')({
  fontSize: '30px',
        color:'#FFFFFF',
        marginTop: '0px'
});

const StyledTitleMedium = styled('div')({
  fontSize: '30px',
        color:'#FFFFFF',
        marginTop: '0px'
});

const StyledTitle = styled('div')({
  fontSize: '25px',
        color:'#FFFFFF',
        marginTop: '0px'
});

const StyledNameEcurie = styled('div')({
  fontSize: '24px',
        color : 'white',
        margin: '0px'
});

const StyledContainerLeader = styled('div')({
  marginRight:'35px'
});

const StyledEcurieContainer = styled('div')({
  marginBottom:'10px'
});

const StyledMainContainer = styled('div')({
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
        margin:'auto'
});

const StyledRank = styled('div')({
  fontSize: '24px',
        margin:'0px',
        color : 'black',
        backgroundColor: 'white',
        width: '20px',
        height : '28px',
        textAlign : 'center'
});

const StyledContainerTeam = styled('div')({
  borderTopWidth:'2px',
        borderTopStyle:'solid',
        borderTopColor: '#FF0000',
        verticalAlign:"middle"
});

const StyledLeaderLogo = styled('div')({
  width:'300px',
        height:'295px',
        fit : 'contain'
});

const StyledEcurieNameContainer = styled('div')({
  width:'70%'
});


class PermFormule1 extends React.Component {

    // Mercedes - Di => 458
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
                    cuvee:{
                        name: 'Mercedes - Cuvée',
                        id: 457,
                        nb: 0,
                        color:'#00D2BE',
                        img:'/images/mercedes.png',
                    }
                },
                redBull:{
                    kastel:{
                        name: 'Red Bull - Kasteel red',
                        id: 14821,
                        nb: 0,
                        color:'#0600EF',
                        img:'/images/redbull.png',
                    },
                },
                ferrari:{
                    delirium:{
                        name: 'Ferrari - Delirium',
                        id: 458,
                        nb:0,
                        color:'#DC0000',
                        img:'/images/ferrari.png',
                    }
                },
                mclaren:{
                    cidre:{
                        color:'#FF8700',
                        name: 'McLaren - Barbar',
                        id:1403,
                        nb:0,
                        img:'/images/maclaren.png',
                    }
                },
                alpine:{
                    queue:{
                        color:'#0090FF',
                        name: 'Alpine - Cidre brut',
                        id: 16581,
                        nb:0,
                        img:'/images/alpine.png',
                    }
                },
                alphaTauri:{
                    valDieu:{
                        color:'#2B4562',
                        name:'Alpha Tauri - Val Dieu',
                        id:12492,
                        nb:0,
                        img:'/images/alphatauri.png',
                    }
                },
                astonMartin:{
                    castor:{
                        color:'#006F62',
                        name:'Aston Martin - Castor IPA',
                        id:16755,
                        nb:0,
                        img:'/images/aston.png',
                    }
                },
                williams:{
                    harmony:{
                        color:'#005AFF',
                        name: 'Williams - Chimay Bleue',
                        id:1399,
                        nb:0,
                        img:'/images/williams.png',
                    }
                },
                alphaRomeo:{
                    chimayRed:{
                        color:'#900000',
                        name:'Alfa Roméo - Harmony',
                        id:16715,
                        nb:0,
                        img:'/images/alfaromeo.png',
                    }
                },
                haas:{
                    chimayRed:{
                        color:'#FFFFFF',
                        name:'Haas - Chimay Red',
                        id: 16870,
                        nb: 0,
                        img:'/images/haas.png',
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
        const {} = this.props;
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
            // <Grid container alignItems="center" justifyContent="center" component={StyledMain} style={backgroundImage}>
            <Grid container alignItems="center" justifyContent="center" component={StyledMain} style={backgroundImage}>
                {
                    <Grid container alignItems="center" justifyContent="center"  component={StyledMainContainer}>
                        <Grid item container direction={"column"}>
                            <h1 component={StyledTitleBig}>FORMULA 1</h1>
                            <h2 component={StyledTitleMedium}>PIC GRAND PRIX</h2>
                        </Grid>
                        <Grid item container direction={"row"} component={StyledContainerTeam}>
                            <Grid item direction={"column"} component={StyledContainerLeader}>
                                <h1 component={StyledTitle}>LEADERS</h1>
                                <img item src={asset_url(test[0].img)} component={StyledLeaderLogo}/>
                            </Grid>
                            <Grid  item  direction={"column"}>
                                <h1 component={StyledTitle}>CONSTRUCTOR CHAMPIONSHIP</h1>
                                {
                                    test.map(((value,index) => {
                                        const style = {
                                            width: '5px',
                                            height: '25px',
                                            backgroundColor : value.color
                                        }
                                        return(
                                            <Grid component={StyledEcurieContainer} direction={"row"} container justify={"space-between"}>
                                                <p item component={StyledRank}> {index+1}</p>
                                                <div item style={style}></div>
                                                <Grid item justify={"flex-start"} component={StyledEcurieNameContainer}>
                                                    <p item component={StyledNameEcurie}>{value.name}</p>
                                                </Grid>
                                                <p item component={StyledNameEcurie}>{value.nb} pts</p>
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

export default PermFormule1

