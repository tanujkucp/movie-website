import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

import configs from './../../configs.json';
import Snackbar from "@material-ui/core/Snackbar";
import Footer from './../widgets/Footer';
import WaveBorder from "../widgets/WaveBorder";


const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {
    const classes = useStyles();

    const [username, setusername] = React.useState();
    const [password, setpassword] = React.useState();
    const [checked, setchecked] = React.useState(false);
    const [error, setError] = React.useState(false);

    const login = () => {
        //todo add login functionality
        // If remember me is checked than set cookie expiry to 2 week and if not then set it to 24 hours
        // alert(username + password + checked);
        setError(true);
        axios.post(configs.server_address + "/login",
            {username: username, password: password})
            .then((res) => {
                if (res.data.success) {
                    //store all the data in persistent storage ( cookie )

                }// else  do something

            }).catch((err) => {
            // show error --- enable the error snackbar

        })
    };

    return (
        <div style={{backgroundColor: '#cfd8dc'}}>
            <Container component="main" maxWidth="xs" style={{backgroundColor: '#cfd8dc'}}>

                <Snackbar open={error} autoHideDuration={5000} onClose={() => setError(false)}>
                    <Alert severity="error" onClose={() => setError(false)}>
                        This is an error message!
                    </Alert>
                </Snackbar>

                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" onChange={(e) => {
                                setchecked(e.target.checked)
                            }}/>}
                            label="Remember me"
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={login}
                        >
                            Sign In
                        </Button>

                    </form>
                </div>
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
