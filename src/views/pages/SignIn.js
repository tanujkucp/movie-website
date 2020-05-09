import React, { useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles((theme) => ({
    paper: {
        paddingBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '90%', // Fix IE 11 issue.
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

    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [user_secret, setSecret] = useState('');
    const [error, setError] = useState();
    const [info, setInfo] = useState();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [key, setKey] = useState('');

    const handleChange = (event) => {
        let newCred = {
            ...credentials,
            [event.target.name]: event.target.value
        };
        setCredentials(newCred);
    };
    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(key);
        setInfo('Copied!');
    };

    const login = () => {
        setLoading(true);
        axios.post(configs.server_address + "/services/login", credentials)
            .then((res) => {
                if (res.data.success) {
                    //show secret key to user
                    setKey(res.data.user_secret);
                    setOpen(true);
                }
                setLoading(false);
            }).catch((err) => {
            setLoading(false);
            console.log(err);
            if (err.response) setError(err.response.data.message);
        })
    };

    const verifyJWT = () => {
        setLoading(true);
        axios.post(configs.server_address + "/services/verifyJWT", {user_secret: user_secret})
            .then((res) => {
                if (res.data.success) {
                    //show secret key to user
                    setInfo("Your secret key is valid and can be used.");
                }
                setLoading(false);
            }).catch((err) => {
            setLoading(false);
            console.log(err);
            if (err.response) setError(err.response.data.message);
        })
    };


    return (
        <div style={{backgroundColor: '#cfd8dc'}}>
            {loading ? (<LinearProgress variant="query" color="secondary"/>) : (null)}
            <Container component="main" maxWidth="sm" style={{backgroundColor: '#cfd8dc', paddingTop: 10}}>

                <Snackbar open={error} autoHideDuration={5000} onClose={() => setError(null)}>
                    <Alert severity="error" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </Snackbar>
                <Snackbar open={info} autoHideDuration={5000} onClose={() => setInfo(null)}>
                    <Alert severity="success" onClose={() => setInfo(null)}>
                        {info}
                    </Alert>
                </Snackbar>

                <CssBaseline/>

                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In to create new Secret Key
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            autoComplete="email"
                            autoFocus
                            style={{backgroundColor: '#eee'}}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                            style={{backgroundColor: '#eee'}}
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

                    <Divider variant="middle" style={{width: "100%", marginTop: 20, marginBottom: 10}}/>
                    <Typography component="h1" variant="h6">
                        Or verify existing Secret Key
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            multiline
                            rowsMax={6}
                            label="Secret Key"
                            value={user_secret}
                            onChange={(e) => setSecret(e.target.value)}
                            style={{backgroundColor: '#eee'}}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={verifyJWT}
                        >
                            Verify
                        </Button>
                    </form>

                </Paper>

            </Container>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">This is your secret key. Keep it safe.</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {key}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        OK
                    </Button>
                    <Button onClick={copyToClipboard} color="primary" autoFocus>
                        Copy to Clipboard
                    </Button>
                </DialogActions>
            </Dialog>

            <WaveBorder
                upperColor="#cfd8dc"
                lowerColor={'rgb(36, 40, 44)'}
                animationNegativeDelay={4}
            />
            <Footer/>
        </div>
    );
}
