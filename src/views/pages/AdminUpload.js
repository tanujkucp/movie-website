import React, {useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Snackbar from "@material-ui/core/Snackbar";
import Footer from './../widgets/Footer';
import WaveBorder from "../widgets/WaveBorder";
import UploadPart1 from "../components/UploadPart1";
import UploadPart2 from "../components/UploadPart2";
import UploadPart3 from "../components/UploadPart3";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import configs from "../../configs";
import {Industry, MediaType} from "../../enums";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";


const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        backgroundColor: '#cfd8dc',
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const steps = ['Basic Info', 'Add references', 'Add Download Links'];

export default function AdminUpload() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [activeStep, setActiveStep] = useState(0);
    const [response, setResponse] = useState();
    const [data, setData] = useState({
        industry: Industry.BOLLYWOOD,
        media_type: MediaType.MOVIE,
        tags: [],
        title: '',
        language: '',
        IMDb_link: '',
        release_year: '',
        IMDb_rating: '',
        genre: '',
        screenshots: ['', '', '', ''],
        description: '',
        youtube_trailer_video_id: '',
        downloads: [],
        poster_link: ''
    });

    const validate = () => {
        if (data.title && data.language && data.IMDb_link && data.IMDb_rating && data.release_year && data.genre
            && data.description && data.youtube_trailer_video_id && data.poster_link) {
            //check downloads object
            return data.downloads[0].quality.length > 0 && data.downloads[0].size.length > 0 && data.downloads[0].links.length > 0;
        } else return false;
    };

    const handleNext = () => {
        if (activeStep === 2) {
            if (validate()) {
                upload();
                setActiveStep(activeStep + 1);
            } else setError('Fill all details first!');
        }
        else setActiveStep(activeStep + 1);
    };
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const upload = () => {
        setLoading(true);
        console.log(data);
        axios.post(configs.server_address + '/saveMedia', {user_secret: 'abcdefghijklmn', data: data}).then(res => {
            if (res.data.success) {
                //change state of all elements
                setResponse(res.data.data);
            } else {
                //alert(res.data.message);
                setError(res.data.message)
            }
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <UploadPart1 getData={getData} data={data}/>;
            case 1:
                return <UploadPart2 getData={getData} data={data}/>;
            case 2:
                return <UploadPart3 getData={getData} data={data}/>;
            default:
                throw new Error('Unknown step');
        }
    };

    const getData = (d) => {
        setData(d);
        console.log(d);
    };

    return (
        <div style={{backgroundColor: '#cfd8dc', paddingTop: 20,height: '100vh'}}>
            <Container component="main" className={classes.layout}>

                <Snackbar open={error} autoHideDuration={5000} onClose={() => setError(null)}>
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </Snackbar>

                <CssBaseline/>

                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Media Upload
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ?
                            (loading ? (
                                <LinearProgress variant="query" color="secondary"/>
                            ) : (
                                response ? (
                                    <React.Fragment>
                                        <Typography variant="h5" gutterBottom>
                                            Thank you for your upload.
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Your upload ID is {response.media_id} . You can check the details page <Link
                                            href={'#'}>here </Link>.
                                        </Typography>
                                    </React.Fragment>
                                ) : (
                                    <Typography variant="h5" gutterBottom style={{color:'red'}}>
                                        An error occurred in upload.
                                    </Typography>
                                )
                            ))
                            : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Confirm Upload' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>

            </Container>

            <WaveBorder
                upperColor="#cfd8dc"
                lowerColor={'rgb(36, 40, 44)'}
                animationNegativeDelay={4}
            />
            <Footer/>
        </div>
    );
}
