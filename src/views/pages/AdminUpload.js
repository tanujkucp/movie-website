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

const useStyles = makeStyles((theme) => ({}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AdminUpload() {
    const classes = useStyles();

    return (
        <div style={{backgroundColor: '#cfd8dc'}}>
            <Container component="main" maxWidth="xs" style={{backgroundColor: '#cfd8dc'}}>

                <Snackbar open={false} autoHideDuration={5000} onClose={() => alert('something')}>
                    <Alert severity="error" onClose={() => alert('something')}>
                        This is an error message!
                    </Alert>
                </Snackbar>

                <CssBaseline/>


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
