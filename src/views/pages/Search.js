import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import configs from './../../configs.json';
import MediaCard from './../widgets/MediaCard';
import Footer from './../widgets/Footer';
import Header from './../widgets/Header';
import WaveBorder from "../widgets/WaveBorder";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import {fade} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://images.unsplash.com/photo-1580194191675-f66754a68698?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 350
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
}));


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Search() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>

            <main style={{backgroundColor: "#cfd8dc"}}>
                <div style={{display: 'flex', paddingTop:30,justifyContent: 'center'}}>
                    <TextField
                        label="Enter movie/series name here"
                        variant="outlined"
                        style={{ width: '50%', backgroundColor: '#fff',borderRadius: 10, borderColor: 'blue'}}
                    />
                    <IconButton type="submit" style={{ marginLeft: 20, backgroundColor: 'white'}} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </div>

                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <MediaCard card={card}/>
                        ))}
                    </Grid>

                </Container>
            </main>

            {/* Footer */}
            <WaveBorder
                upperColor="#cfd8dc"
                lowerColor={'rgb(36, 40, 44)'}
                animationNegativeDelay={4}
            />
            <Footer/>
            {/* End footer */}

        </React.Fragment>
    );
}
