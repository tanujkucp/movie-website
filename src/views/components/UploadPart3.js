import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import DoneIcon from "@material-ui/icons/Done";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function UploadPart3(props) {
    const [link, setLink] = useState({label: '', link: ''});
    const [data, setData] = useState(props.data);
    useEffect(() => {
        setData(props.data);
    },[props.data]);

    if (data.downloads.length === 0) data.downloads.push({quality: '', size: '', details: ['', ''], links: []});

    const handleChange = (event, index) => {
        let downloads = data.downloads;
        if (event.target.name === 'd0') {
            let details = downloads[index].details;
            details[0] = event.target.value;
            downloads[index] = {
                ...downloads[index],
                details: details
            };
        } else if (event.target.name === 'd1') {
            let details = downloads[index].details;
            details[1] = event.target.value;
            downloads[index] = {
                ...downloads[index],
                details: details
            };
        } else {
            downloads[index] = {
                ...downloads[index],
                [event.target.name]: event.target.value
            };
        }

        let newData = {
            ...data,
            downloads: downloads
        };
        setData(newData);
        props.getData(newData);
    };

    const handleOnChangeLink = (event) => {
        setLink({
            ...link,
            [event.target.name]: event.target.value
        });
    };
    const addLink = (index) => {
        let downloads = data.downloads;
        let links = downloads[index].links;
        links = links.concat(link);
        setLink({
            label: '',
            link: ''
        });
        downloads[index] = {
            ...downloads[index],
            links: links
        };
        let newData = {
            ...data,
            downloads: downloads
        };
        setData(newData);
        props.getData(newData);

    };

    const addMoreDownload = () => {
        data.downloads.push({quality: '', size: '', details: ['', ''], links: []});
        let newData = {
            ...data,
            downloads: data.downloads
        };
        setData(newData);
        props.getData(newData);
    };

    const deleteExtraDownload = (index) => {
        data.downloads.splice(index, 1);
        let newData = {
            ...data,
            downloads: data.downloads
        };
        setData(newData);
        props.getData(newData);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Add Download Variants and Links
            </Typography>

            <Grid container spacing={3} style={{justifyContent: 'center', marginBottom: 20}}>

                {data.downloads.map((dl, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Paper style={{padding: 10}} elevation={5}>
                            <Grid container spacing={3}>

                                <Grid item xs={12}>
                                    {index > 0 ? (<IconButton aria-label="delete"
                                                              onClick={() => deleteExtraDownload(index)}
                                                              style={{
                                                                  float: 'right',
                                                                  marginBottom: -10,
                                                                  marginTop: -10,
                                                                  color: 'red'
                                                              }}>
                                        <CancelIcon/>
                                    </IconButton>) : (null)}

                                    <Typography variant="h6" align={'center'}
                                                style={{marginBottom: -20}}>
                                        Download #{index + 1}
                                    </Typography>

                                </Grid>

                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        label="Resolution"
                                        value={dl.quality}
                                        name={'quality'}
                                        onChange={(e) => handleChange(e, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        required
                                        label="File Size (GB)"
                                        value={dl.size}
                                        name={'size'}
                                        onChange={(e) => handleChange(e, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} style={{marginBottom: -20}}>
                                    <Typography variant="subtitle1">
                                        Add two short details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} style={{marginBottom: -20}}>
                                    <TextField
                                        required
                                        label="Detail #1 eg. x265 HEVC"
                                        value={data.downloads[index].details[0]}
                                        name={'d0'}
                                        onChange={(e) => handleChange(e, index)}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Detail #2 eg. English Subs"
                                        fullWidth
                                        value={data.downloads[index].details[1]}
                                        name={'d1'}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </Grid>

                                {dl.links.map((link) => (
                                    <Grid item xs={12} key={link.link}>
                                        <Typography variant="subtitle1" style={{marginBottom: -20}} noWrap={true}>
                                            <DoneIcon color={'primary'}/>{link.label} : <Link href={link.link}> {link.link}</Link>
                                        </Typography>
                                    </Grid>
                                ))}

                                <Divider xs={12} style={{width: '100%', marginTop: 10}}/>
                                <Grid item xs={12} style={{marginBottom: -20}}>
                                    <Typography variant="subtitle1">
                                        Add multiple links
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        label="Link Label"
                                        name={'label'}
                                        value={link.label}
                                        onChange={handleOnChangeLink}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        label="Download Link"
                                        name={'link'}
                                        value={link.link}
                                        onChange={handleOnChangeLink}
                                        fullWidth
                                        style={{marginTop: -20}}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant={'contained'} fullWidth
                                            disabled={link.label.length < 1 || link.link.length < 1}
                                            onClick={() => addLink(index)}
                                            startIcon={<AddCircleOutlineIcon/>}
                                    >Add</Button>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Button variant={'contained'} fullWidth color="primary" onClick={addMoreDownload}>
                Add More Downloads
            </Button>

        </React.Fragment>
    );
}
