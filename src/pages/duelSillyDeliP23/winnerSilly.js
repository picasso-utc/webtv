import React from "react";
import {asset_url} from "../../utils/Config";

class winnerSilly extends React.Component {

    render() {
        return(
        <div className='body'>
            <img className="bg" src={asset_url("/images/duelDesBrasseursP23/Silly_Winner.png")}></img>
        </div>)
    }
}

export default winnerSilly