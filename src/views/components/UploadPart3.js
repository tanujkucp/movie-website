import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import DoneIcon from "@material-ui/icons/Done";


const useStyles = makeStyles((theme) => ({}));

export default function Review() {
    const classes = useStyles();
    const [links, setLinks] = React.useState([]);
    const [link, setLink] = React.useState('');

    const handleOnChangeLink = (event) => {
        setLink(event.target.value);
    };
    const addLink = () => {
        setLinks(links => links.concat(link));
        setLink('');
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add Download Variants and Links
            </Typography>

            <Grid container spacing={3} style={{justifyContent: 'center'}}>

                <Grid item xs={12} sm={6}>
                    <Paper style={{padding: 10}}>
                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <Typography variant="h6" align={'center'} style={{color: 'grey', marginBottom: -20}}>
                                    Download #1
                                </Typography>
                            </Grid>

                            <Grid item xs={6} sm={6}>
                                <TextField
                                    required
                                    label="Resolution"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <TextField
                                    required
                                    label="File Size (GB)"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginBottom: -20}}>
                                <Typography variant="subtitle1" style={{color: 'grey'}}>
                                    Add two short details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{marginBottom: -20}}>
                                <TextField
                                    required
                                    label="Detail #1 eg. x265 HEVC"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Detail #2 eg. English Subs"
                                    fullWidth
                                />
                            </Grid>

                            {links.map((link) => (
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" style={{marginBottom: -20}} noWrap={true}>
                                        <DoneIcon/><Link href={link} key={link}> {link}</Link>
                                    </Typography>
                                </Grid>
                            ))}

                            <Grid item xs={9}>
                                <TextField
                                    label="Download Link"
                                    value={link}
                                    onChange={handleOnChangeLink}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant={'contained'} onClick={addLink}>Add</Button>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>


            </Grid>


        </React.Fragment>
    );
}
