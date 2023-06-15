import React from "react";
import {asset_url} from "../../utils/Config";

class winnerDeli extends React.Component {

    render() {
        return(
        <div className='body'>
            <img className="bg" src={asset_url("/images/duelDesBrasseursP23/Deli_Winner.png")}></img>
        </div>)
    }
}

export default winnerDeli