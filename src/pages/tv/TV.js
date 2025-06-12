import React from 'react';
import { styled } from '@mui/material';
import { ajaxGet } from '../../utils/Ajax';
import { asset_url } from '../../utils/Config';

const StyledRoot = styled('div')({
  width: '100%',
        height: '100vh',
        overflowY: 'hidden'
});

const StyledIframe_style = styled('div')({
  width: '100%',
        height: '100%',
        border: 'None'
});


class TV extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            tv : {}
        }
	}

	componentDidMount(){
        this.init();
    }

    init(){
        const query = new URLSearchParams(window.location.search);
        const tv_id = query.get('id')
        if(tv_id){
            this.loadTV(tv_id);
            setInterval(() => this.loadTV(tv_id), 30000);
            // Toutes les 2 heures refresh de la page
            setInterval(() => this.reloadTV(), 2 * 60 * 60 * 1000);
        }
    }

    reloadTV(){
        window.location.reload();
    }

    loadTV(tv_id){
        ajaxGet('tvs/' + tv_id + '/').then((res) => {
            if (!this.state.tv.id) {
                let tv = res.data;
                if (tv.link.url && tv.link.url.startsWith("https://assos.utc.fr/picasso/tv")) {
                    tv.link.url = asset_url(tv.link.url.replace("https://assos.utc.fr/picasso/tv", ""));
                }
                this.setState({tv: tv});   
            } else {
                if (this.state.tv.link.name !== res.data.link.name) {
                    window.location.reload();
                }
            }
        })
    }


	render() {

        const {} = this.props;
        const { tv } = this.state;

		return (
            
            <div component={StyledRoot}>
                {tv.id &&
                    <iframe title="main" src={tv.link.url} component={StyledIframe_style}></iframe>
                }
            </div>         
		);
	}
}

export default TV

