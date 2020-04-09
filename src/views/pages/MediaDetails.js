import React from 'react';
import Header from './../widgets/Header';
import Footer from './../widgets/Footer';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import cx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {useBlogTextInfoContentStyles} from '@mui-treasury/styles/textInfoContent/blog';
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
    }
}));

const images = ['https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    'https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'];

const downloads = [
    {
        quality: '1080p',
        details: ['x265 HEVC', 'English Subs'],
        size: '2.1 GB',
        links: ['#', '#']
    },
    {
        quality: '720p',
        details: ['x265 HEVC', 'English Subs'],
        size: '1 GB',
        links: ['#', '#', '#']
    }
];

export default function MediaDetails(props) {

    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();

    const {params} = props.match;
    //alert(params.id);
    const chips = ['1080p', 'BluRay', 'GDrive', 'x265 HEVC', 'DD 5.1'];
    return (
        <React.Fragment>
            <CssBaseline/>

            <Header/>


            <main style={{padding: 20, backgroundColor: '#cfd8dc',}}>
                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardMedia
                        className={styles.media}
                        image={'https://images.unsplash.com/photo-1544384050-f80fac6e525a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'}
                    />
                    <CardContent>

                        <Typography variant="h4" align="center" color="textPrimary">
                            Angreji Medium (2020)
                        </Typography>
                        <div style={{paddingTop: 10}}>
                            <Typography align="center" color="textPrimary">
                                2014 ‧ Sci-fi / Action ‧ 8.8/10 ‧ <Link href='#'>
                                IMDb
                            </Link>
                            </Typography>

                            <Typography variant="h6" align="center" color="textPrimary">
                                Hindi + English (Dual Audio)
                            </Typography>

                            <Grid container spacing={1} style={{paddingLeft: 10, paddingTop: 20}}>
                                {chips.map(chip => (
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
                                startIcon={<CloudUploadIcon/>}
                            >
                                Download Now
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className={cx(styles.root, shadowStyles.root)}>
                    <div style={{padding: 20, flexDirection: 'column'}}>
                        <Typography align="center" color="textPrimary">
                            With the help of warrior Rita Vrataski, Major William Cage has to save Earth and the human
                            race from an alien species, after being caught in a time loop.
                        </Typography>
                        <Divider variant="middle" style={{marginTop: 10, marginBottom:10}}/>

                        <Typography variant="h4" align="center" color="textPrimary" style={{marginBottom:10}}>
                            Trailer
                        </Typography>

                        <YouTube videoId="2g811Eo7K8U" opts={{ width: '100%'}} />

                        <Typography variant="h4" align="center" color="textPrimary" style={{marginTop:20}}>
                            Screenshots
                        </Typography>
                        <Carousel images={images}/>

                        <Container maxWidth="md" component="main">
                            <Grid container spacing={5} alignItems="flex-end">
                                {downloads.map((download) => (
                                    <Grid item key={download.quality} xs={12} sm={6}
                                          md={4}>
                                        <Card>
                                            <CardHeader
                                                title={download.quality}
                                                titleTypographyProps={{align: 'center'}}
                                                action={download.quality === '1080p' ? <StarIcon/> : null}
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
                                                        <Typography component="li" variant="subtitle1" align="center"
                                                                    key={line}>
                                                            {line}
                                                        </Typography>
                                                    ))}
                                                </ul>
                                            </CardContent>
                                            <CardActions>
                                                <Button fullWidth variant={'contained'} color="primary">
                                                    See Links
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>

                    </div>

                </Card>
            </main>

            <WaveBorder
                upperColor="#cfd8dc"
                lowerColor={'rgb(36, 40, 44)'}
                animationNegativeDelay={4}
            />
            <Footer/>
        </React.Fragment>
    );

}


