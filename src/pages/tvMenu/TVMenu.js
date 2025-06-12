import React from 'react';
import { styled } from '@mui/material';
import {Grid} from '@mui/material';
import {TypographyTypography} from '@mui/material';
import { asset_url } from '../../utils/Config';
import { ajaxGet } from '../../utils/Ajax';

const StyledTitle = styled('div')({
  marginTop: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 80
});

const StyledContainer = styled('div')({
  width: '100%',
        height: '100vh',
        backgroundColor: '#000223',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '10%',
        backgroundPosition: '5% 3%',
        backgroundAttachment: 'fixed',
        color: 'white',
        overflowY: 'hidden'
});

const StyledTable = styled('div')({
  width: '100%',
        marginTop: 50,
        fontSize: 50,
        borderCollapse: 'collapse'
});

const StyledTitle_cell = styled('div')({
  width: '33%',
        height: 80,
        borderBottom: '2px solid white'
});

const StyledRow_cell = styled('div')({
  textAlign: 'center',
        height: 65
});


class TVContent extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            orders : [],
            menu : '',
        }
	}

	componentDidMount(){
        this.loadOrders();
        setInterval(() => this.loadOrders(), 2000);
    }

    loadOrders(){
        ajaxGet('tv/orders').then(res => {
            this.setState({menu: res.data.menu, orders: res.data.orders})
        }).catch(error => {
            console.log(error)
        })
    }


	render() {

        const {} = this.props;
        const { menu, orders } = this.state;
        const backgroundImage = {
            backgroundImage: 'url(\'' + asset_url('/images/background_logo.png') + '\')'
        }

		return (
            
            <div component={StyledContainer} style={backgroundImage}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Typography variant="h2" gutterBottom component={StyledTitle}>
                        Prochains menus à servir
                    </Typography>
                    <Typography variant="h2" gutterBottom component={StyledTitle}>
                        {menu}
                    </Typography>
                </Grid>
                <Grid container direction="row">
                    <table component={StyledTable}>
                        <thead>
                            <tr>
                                <th component={StyledTitle_cell}>Nom</th>
                                <th component={StyledTitle_cell}>Prénom</th>
                                <th component={StyledTitle_cell}>Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td component={StyledRow_cell}>{order.last_name}</td>
                                    <td component={StyledRow_cell}>{order.first_name}</td>
                                    <td component={StyledRow_cell}>{order.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Grid>
            </div>         
		);
	}
}

export default TVContent

