import React, {Component} from 'react';
import Header from './../widgets/Header';
import Footer from './../widgets/Footer';
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import cx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
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

const useStyles = makeStyles(({breakpoints, spacing}) => ({
    root: {
        margin: 'auto',
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        position: 'relative',
        maxWidth: 800,
        marginLeft: 'auto',
        overflow: 'initial',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: spacing(2),
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            paddingTop: spacing(2),
        },
    },
    media: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: spacing(-3),
        height: 0,
        paddingBottom: '48%',
        borderRadius: spacing(2),
        backgroundColor: '#fff',
        position: 'relative',
        [breakpoints.up('md')]: {
            width: '50%',
            marginLeft: spacing(-3),
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
        margin: spacing(1),
        marginTop: 20,
    }
}));


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


            <main style={{padding: 20, backgroundColor:'#cfd8dc'}}>
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
                            <Grid container spacing={1} style={{paddingLeft: 10, paddingBottom: 10}}>
                                {chips.map(chip => (
                                    <Grid item key={chip}>
                                        <Chip icon={<DoneIcon/>} size="medium" label={chip}/>
                                    </Grid>)
                                )}

                            </Grid>
                            <Typography align="center" color="textPrimary">
                                2014 ‧ Sci-fi / Action ‧ 1h 53m ‧ <Link href='#'>
                                IMDb
                            </Link>
                            </Typography>

                            <Typography variant="h6" align="center" color="textPrimary">
                                Hindi + English (Dual Audio)
                            </Typography>


                        </div>
                        <div style={{paddingTop: 10, paddingRight: 40}}>
                            <Button
                                variant="contained"
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

