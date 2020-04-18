import React, {useEffect, useState} from 'react';
import Header from './../widgets/Header';
import Footer from './../widgets/Footer';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import cx from 'clsx';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useOverShadowStyles} from '@mui-treasury/styles/shadow/over';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Chip from "@material-ui/core/Chip/Chip";
import DoneIcon from '@material-ui/icons/Done';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import configs from "../../configs";
import Link from "@material-ui/core/Link/Link";
import WaveBorder from "../widgets/WaveBorder";
import Divider from "@material-ui/core/Divider";
import Carousel from '../widgets/Carousel';
import Container from "@material-ui/core/Container";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import StarIcon from '@material-ui/icons/StarBorder';
import YouTube from "react-youtube";
import axios from "axios";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import MuiDialogContent from "@material-ui/core/DialogContent/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import {Col, Row} from "reactstrap";
import {VideoResolution} from "../../enums";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        borderRadius: theme.spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        maxWidth: 800,
        marginLeft: 'auto',
        marginBottom: 20,
        overflow: 'initial',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingTop: theme.spacing(2),
        },
    },
    media: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(-3),
        height: 0,
        paddingBottom: '48%',
        borderRadius: theme.spacing(2),
        backgroundColor: '#fff',
        position: 'relative',
        [theme.breakpoints.up('md')]: {
            width: '50%',
            marginLeft: theme.spacing(-3),
            marginTop: 0,
            transform: 'translateX(-8px)',
        }
    },
    content: {
        padding: 24,
    },
    cta: {
        marginTop: 24,
        textTransform: 'initial',
    },
    button: {
        margin: theme.spacing(1),
        marginTop: 20,
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(1),
    },
}));

const dialog_styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const DialogTitle = withStyles(dialog_styles)((props) => {
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

//todo add a loading indicator for time when details are loading
export default function MediaDetails(props) {
    const styles = useStyles();
    const shadowStyles = useOverShadowStyles();
    let linksPosition;

    const [details, setDetails] = useState();
    const [open, setOpen] = React.useState(false);
    const [selected_download, setSelectedDownload] = useState();
    const [loading, setLoading] = useState(true);

    const handleClickOpen = (download) => {
        setOpen(true);
        setSelectedDownload(download);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const {params} = props.match;
    //fetch data from server
    useEffect(() => {
        axios.post(configs.server_address + '/getMedia', {media_id: params.id}).then(res => {
            if (res.data.success) {
                //change state of all elements
                setDetails(res.data.data);
            } else {
                alert(res.data.message);
            }
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false);
        });
    }, []);

    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>

            {details ? (
                <main style={{padding: 20, backgroundColor: '#cfd8dc',}}>
                    <Card className={cx(styles.root, shadowStyles.root)}>
                        <CardMedia
                            className={styles.media}
                            image={details.poster_link}
                        />
                        <CardContent>

                            <Typography variant="h4" align="center" color="textPrimary">
                                {details.title}
                            </Typography>
                            <div style={{paddingTop: 10}}>
                                <Typography align="center" color="textPrimary">
                                    {details.release_year} ‧ {details.genre} ‧ {details.IMDb_rating}/10 ‧ <Link
                                    href={details.IMDb_link}>
                                    IMDb
                                </Link>
                                </Typography>

                                <Typography variant="h6" align="center" color="textPrimary">
                                    {details.language}
                                </Typography>

                                <Grid container spacing={1} style={{paddingLeft: 10, paddingTop: 20}}>
                                    {details.tags.map(chip => (
                                        <Grid item key={chip}>
                                            <Chip icon={<DoneIcon/>} size="medium" label={chip}/>
                                        </Grid>)
                                    )}
                                </Grid>

                            </div>
                            <div style={{paddingTop: 10, paddingRight: 40}}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    className={styles.button}
                                    onClick={() => linksPosition.scrollIntoView({behavior: "smooth"})}
                                    startIcon={<CloudUploadIcon/>}>
                                    Download Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={cx(styles.root, shadowStyles.root)}>
                        <div style={{padding: 20, flexDirection: 'column'}}>
                            <Typography align="center" color="textPrimary">
                                {details.description}
                            </Typography>
                            <Divider variant="middle" style={{marginTop: 10, marginBottom: 10}}/>

                            <Typography variant="h4" align="center" color="textPrimary" style={{marginBottom: 10}}>
                                Trailer
                            </Typography>

                            <YouTube videoId={details.youtube_trailer_video_id} opts={{width: '100%'}}/>

                            <Typography variant="h4" align="center" color="textPrimary" style={{marginTop: 20}}>
                                Screenshots
                            </Typography>
                            <Carousel images={details.screenshots}/>

                            <Typography variant="h5" align="center"
                                        style={{marginTop: 20, color: 'red', marginBottom: 10}}>
                                * Report any broken/dead links in our <Link href={configs.telegram_channel_link}>
                                Telegram Group</Link> *
                            </Typography>

                            <Container maxWidth="md" component="main" ref={(el) => {
                                linksPosition = el;
                            }}>
                                <Grid container spacing={5} alignItems="flex-end">
                                    {details.downloads.map((download) => (
                                        <Grid item key={download.quality} xs={12} sm={6}
                                              md={4}>
                                            <Card>
                                                <CardHeader
                                                    title={download.quality}
                                                    titleTypographyProps={{align: 'center'}}
                                                    action={download.quality === VideoResolution.HDplus ? <StarIcon/> : null}
                                                    className={styles.cardHeader}
                                                />
                                                <CardContent>
                                                    <div className={styles.cardPricing}>
                                                        <Typography component="h4" variant="h4" color="textPrimary">
                                                            {download.size}
                                                        </Typography>
                                                    </div>
                                                    <ul style={{listStyleType: 'none', padding: 0}}>
                                                        {download.details.map((line) => (
                                                            <Typography component="li" variant="subtitle1"
                                                                        align="center"
                                                                        key={line}>
                                                                {line}
                                                            </Typography>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                                <CardActions>
                                                    <Button fullWidth variant={'contained'} color="primary"
                                                            onClick={() => handleClickOpen(download)}>
                                                        See Links
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>

                            <Divider variant="middle" style={{marginTop: 10, marginBottom: 10}}/>
                            <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                                <Typography color="textPrimary">
                                    <StarIcon/> April 9,2020
                                </Typography>
                                <Typography color="textPrimary" style={{marginLeft: 20}}>
                                    <StarIcon/> Uploaded by {details.username}
                                </Typography>
                            </div>
                        </div>

                    </Card>

                    {selected_download ? (
                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}
                                fullWidth={true}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                {selected_download.quality} Links
                            </DialogTitle>
                            <DialogContent dividers>
                                {selected_download.links.map(item => (
                                    <Typography gutterBottom>
                                        {item.label} : <Link
                                        href={item.link}>{item.link}</Link>
                                    </Typography>
                                ))}

                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    Done
                                </Button>
                            </DialogActions>
                        </Dialog>
                    ) : (null)}

                </main>
            ) : (!loading ? (
                <div style={{backgroundColor: "#cfd8dc", paddingTop: 150, paddingBottom: 150}}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="6">
                                <div className="clearfix">
                                    <h1 className="float-left display-3 mr-4">404</h1>
                                    <h4 className="pt-3">Oops! You're lost.</h4>
                                    <p className="text-muted float-left">The page you are looking for was not found.</p>
                                </div>
                            </Col>
                        </Row>
                        <Row className={'justify-content-center'}>
                            <Typography variant="h5" color="textPrimary" gutterBottom>
                                You can view our <Link href={configs.website_address}> Home
                                Page </Link> for more awesome content.
                            </Typography>
                        </Row>
                    </Container>
                </div>
            ):(
                <Typography variant="h5" color="textPrimary" gutterBottom>
                    Loading....
                </Typography>
            ))}

            <WaveBorder
                upperColor="#cfd8dc"
                lowerColor={'rgb(36, 40, 44)'}
                animationNegativeDelay={4}
            />
            <Footer/>
        </React.Fragment>
    );

}


