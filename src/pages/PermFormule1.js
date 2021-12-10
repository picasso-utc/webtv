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
                        nb: 0
                    }
                },
                redBull:{
                    cuvee:{
                        name: 'Red Bull - Cuvée',
                        id: 457,
                        nb: 0
                    },
                },
                ferrari:{
                    kastell:{
                        name: 'Ferrari - Kastell red',
                        id: 14821,
                        nb:0
                    }
                },
                mclaren:{
                    cidre:{
                        name: 'McLaren - Cidre brut',
                        id:16581,
                        nb:0,
                    }
                },
                alpine:{
                    queue:{
                        name: 'Alpine - Queue de charue',
                        id: 16650,
                        nb:0,
                    }
                },
                alphaTauri:{
                    valDieu:{
                        name:'Alpha Tauri - Val Dieu',
                        id:12492,
                        nb:0,
                    }
                },
                astonMartin:{
                    castor:{
                        name:'Aston Martin - Castor IPA',
                        id:16755,
                        nb:0,
                    }
                },
                williams:{
                    harmony:{
                        name: 'Williams - Harmony',
                        id:16715,
                        nb:0,
                    }
                },
                alphaRomeo:{
                    chimayRed:{
                        name:'Alpha Roméo - Chimay Red',
                        id:16870,
                        nb:0,
                    }
                },
                haas:{
                    limonade:{
                        name:'Haas - BarBar',
                        id: 1403,
                        nb: 0,
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
        const backgroundImage = {
            backgroundImage: 'url(\'' + asset_url('/images/background_logo.png') + '\')'
        }

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
        return (

            <div>
                {
                    test.map((value => {
                        return(<p>{value.name} - {value.nb} pts</p>)
                    }))
                }
            </div>
        );
    }
}

const styles = theme => ({


});

export default withStyles (styles) (PermFormule1)

