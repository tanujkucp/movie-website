import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


export default function UploadPart2(props) {
    const linkFields = [0, 1, 2, 3];
    const [data, setData] = useState(props.data);
    useEffect(() => {
        setData(props.data);
    },[props.data]);
    let links = data.screenshots;

    const handleChange = (event) => {
        let newData = {
            ...data,
            [event.target.name]: event.target.value
        };
        setData(newData);
        props.getData(newData);
    };

    const handleSS = (event, field) => {
        links[field] = event.target.value;
        let newData = {
            ...data,
            screenshots: links
        };
        setData(newData);
        props.getData(newData);
    };

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Short description / Storyline"
                        multiline
                        required
                        rowsMax={6}
                        variant="outlined"
                        value={data.description}
                        name={'description'}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        required
                        label="Youtube Trailer - Video ID"
                        fullWidth
                        value={data.youtube_trailer_video_id}
                        name={'youtube_trailer_video_id'}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        label="Poster Image Link"
                        fullWidth
                        value={data.poster_link}
                        name={'poster_link'}
                        onChange={handleChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography color="textPrimary" style={{marginTop: 20, marginBottom: -20}}>
                        Add Screenshots image links
                    </Typography>
                </Grid>

                {linkFields.map((field) => (
                    <Grid item xs={12} sm={6} key={field}>
                        <TextField
                            required
                            label={"Screenshot link #" + field}
                            fullWidth
                            value={links[field]}
                            onChange={(event) => handleSS(event, field)}
                        />
                    </Grid>
                ))}

            </Grid>
        </React.Fragment>
    );
}
