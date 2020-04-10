import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


export default function PaymentForm() {
    const linkFields = [0, 1, 2, 3];
    const links = ['', '', '', ''];

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Short description / Storyline"
                        multiline
                        rowsMax={6}
                        variant="outlined"
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        label="Youtube Trailer - Video ID"
                        fullWidth
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
                            onChange={(event) => {
                                links[field] = event.target.value
                            }}
                        />
                    </Grid>
                ))}

            </Grid>
        </React.Fragment>
    );
}
