import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import "./App.css";

import TV from "./pages/tv/TV";
import TVContent from "./pages/tvContent/TVContent";
import TVMenu from "./pages/tvMenu/TVMenu";
import TVDuelBrasseur from "./pages/duelBrasseur/TVDuelBrasseur";
import TVDuelBrasseur2 from "./pages/duelBrasseur/TVDuelBrasseur2";
import PermPic from "./pages/permPic/PermPic";
import PermFormule1 from "./pages/permF1/PermFormule1";
import PermVDH from "./pages/permVDH/PermVDH";
import PermR4 from "./pages/permR4/permR4";
import Telethon from "./pages/telethon/telethon";
import PermChef from "./pages/permChef/PermChef";
import PermIF from "./pages/permIF/permIF";
import EloRanking from "./pages/eloRanking/EloRanking";
import PicFighter from "./pages/permPIXEL/PicFighter";
import Barbar from "./pages/Barbar/Barbar";
import CheerUT from "./pages/cheerUT/cheerUT";
import JeudiRouge from "./pages/JeudiRouge/JeudiRouge";
import DuelDesBrasseursP23 from "./pages/duelDesBrasseursP23/DuelDesBrasseursP23";
import PermIFP23 from "./pages/PermIFP23/PermIFP23";
import DuelSillyDeliP23 from "./pages/duelSillyDeliP23/duelSillyDeliP23";
import winnerSilly from "./pages/duelSillyDeliP23/winnerSilly";
import winnerDeli from "./pages/duelSillyDeliP23/winnerDeli";
import PermHalloween from "./pages/permHalloween/PermHalloween";
import Duelkasteel from "./pages/duelkasteel/duelkasteel";
import DuelbrasseurP24 from "./pages/duelbrasseurP24/duelbrasseurP24";
import duelGKA24 from "./pages/duelGKA24/duelGKA24";

const PUBLIC_URL = process.env.PUBLIC_URL;

class App extends React.Component {
  render() {
    return (
        <BrowserRouter basename={PUBLIC_URL}>
          <CssBaseline />

          <Switch>
            <Route path="/" exact component={TV} />
            <Route path="/content" exact component={TVContent} />
            <Route path="/menu" exact component={TVMenu} />
            <Route path="/duelbrasseur" exact component={TVDuelBrasseur} />
            <Route path="/pic" exact component={PermPic} />
            <Route path="/duelbrasseur2" exact component={TVDuelBrasseur2} />
            <Route path="/permf1" exact component={PermFormule1} />
            <Route path="/permchef" exact component={PermChef} />
            <Route path="/permif" exact component={PermIF} />
            <Route path="/permvdh" exact component={PermVDH} />
            <Route path="/permR4" exact component={PermR4} />
            <Route path="/elo" exact component={EloRanking} />
            <Route path="/telethon" exact component={Telethon} />
            <Route path="/picfighter" exact component={PicFighter} />
            <Route path="/barbar" exact component={Barbar} />
            <Route path="/jeudirouge" exact component={JeudiRouge} />
            <Route path="/permHalloween" exact component={PermHalloween} />
            <Route path="/duelbrasseurP23" exact component={DuelDesBrasseursP23}/>
            <Route path="/PermIFP23" exact component={PermIFP23} />
            <Route path="/DuelSillyDeliP23" exact component={DuelSillyDeliP23} />
            <Route path="/winnerSilly" exact component={winnerSilly} />
            <Route path="/winnerDeli" exact component={winnerDeli} />
            <Route path="/duelkasteel" exact component={Duelkasteel} />
            <Route path="/duelbrasseurP24" exact component={DuelbrasseurP24} />
            <Route path="/duelGKA24" exact component={duelGKA24} />


          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
