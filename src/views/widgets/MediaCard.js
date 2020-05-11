import React from 'react';
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import {makeStyles} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import DoneIcon from '@material-ui/icons/Done';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        //paddingTop: '56.25%', // 16:9
        paddingTop: '100%'
    },
    cardContent: {
        flexGrow: 1,
    }
}));

export default function MediaCard(props) {
    const classes = useStyles();
    let media = props.card;
    return (
        <Grid item key={media.title} xs={12} sm={6} md={4}>
            <Card className={classes.card} elevation={5}>
                <CardMedia
                    className={classes.cardMedia}
                    image={media.poster_link}
                    title={media.title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" style={{marginTop: -10}}>
                        {media.title}
                    </Typography>
                    <Grid container spacing={1}>
                        {media.tags.map(chip => (
                            <Grid item key={chip}>
                                <Chip style={{backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold'}}
                                      icon={<DoneIcon style={{color: '#4caf50'}}/>}
                                      size="medium" label={chip}/>
                            </Grid>)
                        )}

                    </Grid>
                </CardContent>
                <CardActions>
                    <Button fullWidth variant="outlined" color="primary"
                            endIcon={<ArrowForwardIosIcon/>}
                            href={'/m/' + media.media_id}
                            style={{marginTop: -10}}>
                        View Links
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

