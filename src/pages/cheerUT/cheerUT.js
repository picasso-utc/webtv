import React from 'react';
import { ajaxPost } from '../../utils/Ajax';
//import { asset_url, TEMP_FACEBOOK_API_KEY } from '../../utils/Config';
import './cheerUT.css';
import axios from 'axios';

class CheerUT extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            likes : 0
        }
    }

	componentDidMount(){
        this.loadLikes();
        setInterval(() => this.loadLikes(), 5 * 60 * 1000);
    }
    ajaxGet(path, config = {}) {
        return axios.get(path, config);
    }

    loadLikes(){
        const url = `https://graph.facebook.com/1393033914840683?fields=likes.summary(true)&access_token=${TEMP_FACEBOOK_API_KEY}`

        this.ajaxGet(url).then(res => {
            const likes = res.data.likes.summary.total_count;

            this.setState({likes : likes})
        })
    }

   
    render() {
        const likes = this.state.likes


        return (
            <div>
                <div class="counter">
                    <span>Déjà <strong>{likes}</strong></span>
                    <span class="iconBlock">
                        <img src="images/like_icon.png"></img>
                        <span class="asterix">*</span>
                    </span>
                    <span>pour le TOSS</span>
                    <p>On a besoin de <strong>VOUS</strong> ici : <u>https://fb.watch/jf6XaILhNd</u></p>
                </div>

                <div class="asterixObelix">
                    *(autres réactions ignorées)
                </div>
            </div>
        )
    }

}

const styles = theme => ({})

export default CheerUT