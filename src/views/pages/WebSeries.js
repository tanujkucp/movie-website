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
import {MediaType} from "../../enums";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {Col, Row} from "reactstrap";
import Link from "@material-ui/core/Link/Link";
import back_image from './../../assets/img/webseries.jpg';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";

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
        backgroundImage: `url(${back_image})`,
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
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState([]);
    const [ad, setAd] = useState();

    //fetch data from server
    const loadData = (timestamp) => {
        let filters = {media_type: MediaType.WEBSERIES};
        if (timestamp) filters.timestamp = timestamp;

        axios.post(configs.server_address + '/getLatest', {filters: filters}).then(res => {
            if (res.data.success) {
                //change state of all elements
                setLatest(res.data.data);
            } else {
                alert(res.data.message);
            }
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setLatest(null);
        });

        axios.post(configs.server_address + '/getAd', {page: 'webseries'}).then(res => {
            if (res.data.success && res.data.data.enabled) {
                setAd(res.data.data);
            }
        }).catch(err => {
            console.log(err);
        });

    };


    useEffect(() => {
        setLoading(true);
        loadData();
    }, []);

    const handleBack = () => {
        let oldRes = responses;
        let l = oldRes.pop();
        setResponses(oldRes);
        setLatest(l);
    };
    const handleNext = () => {
        setLoading(true);
        let newRes = responses;
        newRes.push(latest);
        //  console.log(newRes);
        setResponses(newRes);
        loadData(latest[latest.length - 1].created_at);
    };

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
                                    TV/Web Series Yay!
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                    Web Series are our new found love and we cannot stop watching them. Just sit and
                                    binge watch all the best series.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>

                {loading ? (<LinearProgress variant="query" color="secondary"/>) : (null)}
                <Grid container spacing={4} style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10}}>
                    {ad ? (
                        <Grid item xs={12} sm={8} md={6}>
                            <div >
                                <Card elevation={5} style={{
                                    display: 'flex',
                                    width: '100%',
                                    aspectRatio: 1,
                                }}>
                                    <Link href={ad.link} rel="noopener noreferrer" target="_blank">
                                        <img height={undefined} width={'100%'} alt="Sponsored Banner"
                                             src={ad.image}/>
                                    </Link>
                                </Card>
                            </div>
                        </Grid>
                    ) : null}
                </Grid>

                {latest ? (
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {latest.map((card) => (
                                <MediaCard card={card}/>
                            ))}
                        </Grid>

                        <div style={{justifyContent: 'center', display: 'flex'}}>
                            <Card style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                marginTop: 20,
                                width: '60%'
                            }}>
                                <Button onClick={handleBack} disabled={responses.length < 1}>
                                    {<KeyboardArrowLeft/>}
                                    Back
                                </Button>
                                <Typography style={{alignSelf: 'center'}}>See more results</Typography>
                                <Button onClick={handleNext} disabled={latest.length < 9}>
                                    Next
                                    {<KeyboardArrowRight/>}
                                </Button>
                            </Card>
                        </div>

                    </Container>
                ) : (null)}

                {(!loading && !latest) ?
                    (<div style={{backgroundColor: "#cfd8dc", paddingTop: 150, paddingBottom: 150}}>
                            <Container>
                                <Row className="justify-content-center">
                                    <Col md="6">
                                        <div className="clearfix">
                                            <h4 className="pt-3">Oops! You're lost.</h4>
                                            <p className="text-muted float-left">No Movie / Web Series were found in
                                                this section.</p>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className={'justify-content-center'}>
                                    <Typography variant="h5" color="textPrimary" gutterBottom>
                                        You can <Link href={"/search"}>search </Link> or view our <Link
                                        href={configs.website_address}> Home Page </Link> for more awesome content.
                                    </Typography>
                                </Row>
                            </Container>
                        </div>
                    ) : (null)}

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
