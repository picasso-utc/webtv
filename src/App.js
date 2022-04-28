import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import './App.css';

import TV from './pages/TV';
import TVContent from './pages/TVContent';
import TVMenu from './pages/TVMenu';
import TVDuelBrasseur from './pages/TVDuelBrasseur';
import TVDuelBrasseur2 from './pages/TVDuelBrasseur2';
import PermPic from './pages/PermPic';
import PermFormule1 from "./pages/PermFormule1";
import PermChef from './pages/PermChef'
import PermVDH from './pages/PermVDH'
import PermR4 from './pages/permR4'


const PUBLIC_URL = process.env.PUBLIC_URL;

class App extends React.Component {
	render() {
		return (
			<BrowserRouter basename={PUBLIC_URL}>
				<CssBaseline />

				<Switch>
					<Route path="/" exact component={TV}/>
					<Route path="/content" exact component={TVContent}/>
					<Route path="/menu" exact component={TVMenu}/>
					<Route path="/duelbrasseur" exact component={TVDuelBrasseur}/>
					<Route path="/pic" exact component={PermPic}/>
					<Route path="/duelbrasseur2" exact component={TVDuelBrasseur2}/>
					<Route path="/permf1" exact component={PermFormule1}/>
					<Route path="/permchef" exact component={PermChef}/>
					<Route path="/permvdh" exact component={PermVDH}/>
					<Route path="/permR4" exact component={PermR4}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
