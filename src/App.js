import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import './App.css';

import TV from './pages/tv/TV';
import TVContent from './pages/tvContent/TVContent';
import TVMenu from './pages/tvMenu/TVMenu';
import TVDuelBrasseur from './pages/duelBrasseur/TVDuelBrasseur';
import TVDuelBrasseur2 from './pages/duelBrasseur/TVDuelBrasseur2';
import PermPic from './pages/permPic/PermPic';
import PermFormule1 from "./pages/permF1/PermFormule1";
import PermChef from './pages/permChef/PermChef'
import PermVDH from './pages/permVDH/PermVDH'
import PermR4 from './pages/permR4/permR4'


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
