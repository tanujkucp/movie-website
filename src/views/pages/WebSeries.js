import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MediaCard from './../widgets/MediaCard';
import Footer from './../widgets/Footer';
import Header from './../widgets/Header';
import WaveBorder from "../widgets/WaveBorder";
import Paper from "@material-ui/core/Paper/Paper";
import axios from "axios";
import configs from "../../configs";
import { MediaType} from "../../enums";

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
        backgroundImage: 'url(https://wallpaperaccess.com/full/782186.jpg)',
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

export default function WebSeries() {
    const classes = useStyles();

    const [latest, setLatest] = useState();

    //fetch data from server
    useEffect(() => {
        axios.post(configs.server_address + '/getLatest', {filters: {media_type: MediaType.WEBSERIES}}).then(res => {
            if (res.data.success) {
                //change state of all elements
                setLatest(res.data.data);
            } else {
                alert(res.data.message);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>

            <main style={{backgroundColor: "#cfd8dc"}}>

                <Paper className={classes.mainFeaturedPost}>
                    {/* Increase the priority of the hero background image */}

                    <div className={classes.overlay}/>
                    <Grid container>
                        <Grid item md={6}>
                            <div className={classes.mainFeaturedPostContent}>
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                    TV/Web Series are love
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                    We all love TV/Web series and are in love with them, so we bring you the latest
                                    TV/Web series collection.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                {latest?(
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {latest.map((card) => (
                                <MediaCard card={card}/>
                            ))}
                        </Grid>

                    </Container>
                ):(null)}
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
