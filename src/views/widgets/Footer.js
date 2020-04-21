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
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <footer style={{backgroundColor: 'rgb(36, 40, 44)', padding: 10}}>

            <Typography variant="h5" align="center" style={{color: 'white'}} component="p">
                Something here to give the footer a purpose!
            </Typography>

            <Typography variant="subtitle1" align="center" style={{color: 'white'}} component="p">
                <TelegramIcon/> <a style={{color:'white'}} target="_blank" href={configs.telegram_channel_link} rel="noopener noreferrer">Follow
                for latest updates and news</a>
            </Typography>

            <Copyright/>
        </footer>
    );

}

