import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import configs from './../../configs.json';
import MediaCard from './../widgets/MediaCard';
import Footer from './../widgets/Footer';
import Header from './../widgets/Header';
import WaveBorder from "../widgets/WaveBorder";
import LinearProgress from "@material-ui/core/LinearProgress";
import TelegramIcon from '@material-ui/icons/Telegram';
import back_image from './../../assets/img/deadpool.png';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import Card from "@material-ui/core/Card/Card";
import {Col, Row} from "reactstrap";
import Link from "@material-ui/core/Link/Link";


const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        paddingTop: 10,
        backgroundImage: `url(${back_image})`
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        justifyContent: 'center'
    },
    waveBorder: {
        paddingTop: theme.spacing(4),
    }
}));


export default function Home() {
    const classes = useStyles();

    const [latest, setLatest] = useState();
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState([]);

    //fetch data from server
    const loadData = (timestamp) => {
        let filters = {};
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
            <WaveBorder
                upperColor={'rgb(36, 40, 44)'}
                lowerColor="#FFFFFF"
                className={classes.waveBorder}
                animationNegativeDelay={2}
            />

            <main style={{backgroundColor: "#cfd8dc"}}>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            {configs.website_name}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary" startIcon={<TelegramIcon/>}>
                                        <a style={{color:'white'}} target="_blank" href={configs.telegram_channel_link} rel="noopener noreferrer">See our Telegram Channel</a>
                                    </Button>
                                </Grid>

                            </Grid>
                        </div>
                    </Container>
                </div>

                {loading ? (<LinearProgress variant="query" color="secondary"/>) : (null)}
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    {latest ? (<div>
                            <Grid container spacing={4}>
                                {latest.map((card) => (
                                    <MediaCard card={card} key={card.title}/>
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
                                    <Button onClick={handleNext}>
                                        Next
                                        {<KeyboardArrowRight/>}
                                    </Button>
                                </Card>
                            </div>
                        </div>
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
