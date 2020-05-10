import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {MediaType, Industry, VideoResolution} from "../../enums";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
}));


export default function AddressForm(props) {
   // console.log(props);
    const classes = useStyles();
    const [data, setData] = useState(props.data);

    useEffect(() => {
        setData(props.data);
    },[props.data]);
    const handleChange = (event) => {
        let newData = {
            ...data,
            [event.target.name]: event.target.value
        };
        setData(newData);
        props.getData(newData);
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const tagOptions = [
        'Dual Audio',
        'x264',
        'x265 HEVC',
        'Subs',
        'BluRay',
        'WebDL',
        'HDRip',
        'HQ',
        'DD 5.1',
        '10 Bit',
        VideoResolution.HDplus,
        VideoResolution.HD,
        VideoResolution.UHD,
        'Amazon Prime',
        'Netflix',
        'Zee5',
        'Voot',
        'Hotstar',
        'ErosNow',
        'ALTBalaji',
        'HOOQ'
    ];

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        value={data.title}
                        name={'title'}
                        label="Media Title"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={data.language}
                        name={'language'}
                        label="Language / Audio"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        value={data.IMDb_link}
                        name={'IMDb_link'}
                        label="IMDb Link"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        value={data.release_year}
                        name={'release_year'}
                        label="Release Year"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        value={data.genre}
                        name={'genre'}
                        label="Genre"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        value={data.IMDb_rating}
                        name={'IMDb_rating'}
                        label="IMDb Rating"
                        onChange={handleChange}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                        <Select value={data.industry} onChange={handleChange} name={'industry'}>
                            <MenuItem value={Industry.BOLLYWOOD}>{Industry.BOLLYWOOD}</MenuItem>
                            <MenuItem value={Industry.HOLLYWOOD}>{Industry.HOLLYWOOD}</MenuItem>
                            <MenuItem value={Industry.OTHER}>{Industry.OTHER}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-label">Media Type</InputLabel>
                        <Select value={data.media_type} onChange={handleChange} name={'media_type'}>
                            <MenuItem value={MediaType.MOVIE}>{MediaType.MOVIE}</MenuItem>
                            <MenuItem value={MediaType.WEBSERIES}>{MediaType.WEBSERIES}</MenuItem>
                            <MenuItem value={MediaType.DOCUMENTARY}>{MediaType.DOCUMENTARY}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel>Add Some Tags</InputLabel>
                        <Select
                            multiple
                            value={data.tags}
                            name={'tags'}
                            onChange={handleChange}
                            input={<Input id="select-multiple-chip"/>}
                            renderValue={(selected) => (
                                <div className={classes.chips}>
                                    {selected.map((value) => (
                                        <Chip icon={<DoneIcon/>} key={value} label={value} className={classes.chip}/>
                                    ))}
                                </div>
                            )}
                            MenuProps={MenuProps}
                        >
                            {tagOptions.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}
