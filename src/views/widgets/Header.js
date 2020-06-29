import React from 'react';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import configs from "../../configs";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {makeStyles} from "@material-ui/core";
import logo from './../../assets/logo.png';
import Link from "@material-ui/core/Link/Link";
import Button from "@material-ui/core/Button";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
        height: 40
    },
    link: {
        margin: theme.spacing(1, 1.5),
        color: 'white',
    },
}));

export default function Header() {
    const classes = useStyles();
    return (
        <AppBar position="relative" style={{backgroundColor: 'rgb(36, 40, 44)'}}>
            <Toolbar style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                    <Link color="inherit" href={configs.website_address}>
                        <img src={logo} alt={'Logo'} className={classes.icon} style={{float: 'left'}}/>
                    </Link>
                </div>
                <div>
                    <nav>
                        <Link variant="button" color="textPrimary" href="/bollywood" className={classes.link}>
                            Bollywood
                        </Link>
                        <Link variant="button" color="textPrimary" href="/hollywood" className={classes.link}>
                            Hollywood
                        </Link>
                        <Link variant="button" color="textPrimary" href="/webseries" className={classes.link}>
                            Web Series
                        </Link>
                        <Link variant="button" color="textPrimary" href="/adult" className={classes.link}>
                            Adult 18+
                        </Link>
                        <Button variant="contained"
                                color="default"
                                href={'/search'}
                                startIcon={<SearchIcon/>}
                        >Search
                        </Button>
                    </nav>
                </div>
            </Toolbar>

        </AppBar>
    );

}

