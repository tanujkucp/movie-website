import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import configs from './../../configs.json';
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

const steps = ['Basic Info', 'Add references', 'Add Links'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <UploadPart1/>;
        case 1:
            return <UploadPart2/>;
        case 2:
            return <UploadPart3/>;
        default:
            throw new Error('Unknown step');
    }
}

export default function AdminUpload() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    return (
        <div style={{backgroundColor: '#cfd8dc',paddingTop:20}}>
            <Container component="main" className={classes.layout}>

                <Snackbar open={false} autoHideDuration={5000} onClose={() => alert('something')}>
                    <Alert severity="error" onClose={() => alert('something')}>
                        This is an error message!
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
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Thank you for your upload.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your upload ID is qckzxcyvbn. You can check the details page <Link href={'#'}>here </Link>.
                                </Typography>
                            </React.Fragment>
                        ) : (
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
