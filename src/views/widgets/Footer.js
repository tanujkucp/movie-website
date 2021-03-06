import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Link from "@material-ui/core/Link/Link";
import configs from "../../configs";
import TelegramIcon from '@material-ui/icons/Telegram';


function Copyright() {
    return (
        <Typography variant="body2" align="center" style={{color: '#d0d0d0'}}>
            {'Copyright © '}
            <Link color="inherit" href={configs.website_address}>
                {configs.website_name}
            </Link>{' '}
            {new Date().getFullYear()}

        </Typography>
    );
}

export default function Footer() {
    return (
        <footer style={{backgroundColor: 'rgb(36, 40, 44)', padding: 10}}>

            <Typography variant="h5" align="center" style={{color: 'white'}} component="p">
                We bring you the best of movies in Best Quality!
            </Typography>

            <Typography variant="subtitle1" align="center" style={{color: 'white'}} component="p">
                <TelegramIcon/> <a style={{color:'white'}} target="_blank" href={configs.telegram_channel_link} rel="noopener noreferrer">
                Follow Channel For Updates</a>
                <a style={{color:'white', marginLeft: 20}} target="_blank" href={configs.telegram_group_link} rel="noopener noreferrer">
                    Join Group For Requests</a>
            </Typography>

            <Copyright/>
        </footer>
    );

}

