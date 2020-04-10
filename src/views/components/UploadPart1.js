import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {MediaType, Industry} from "../../enums";
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



export default function AddressForm() {
    const classes = useStyles();
    const [industry, setIndustry] = React.useState(Industry.BOLLYWOOD);
    const [media_type, setMediaType] = React.useState(MediaType.MOVIE);
    const [personName, setPersonName] = React.useState([]);
    const handleChangeIndustry = (event) => {
        setIndustry(event.target.value);
    };
    const handleChangeMediaType = (event) => {
        setMediaType(event.target.value);
    };
    const handleChange = (event) => {
        setPersonName(event.target.value);
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

    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];

    return (
        <React.Fragment>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        label="Media Title"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label="Language / Audio"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        label="IMDb Link"
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        label="Release Year"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        label="Genre"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        label="IMDb Rating "
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                        <Select value={industry} onChange={handleChangeIndustry}>
                            <MenuItem value={Industry.BOLLYWOOD}>{Industry.BOLLYWOOD}</MenuItem>
                            <MenuItem value={Industry.HOLLYWOOD}>{Industry.HOLLYWOOD}</MenuItem>
                            <MenuItem value={Industry.OTHER}>{Industry.OTHER}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="demo-simple-select-label">Media Type</InputLabel>
                        <Select value={media_type} onChange={handleChangeMediaType}>
                            <MenuItem value={MediaType.MOVIE}>{MediaType.MOVIE}</MenuItem>
                            <MenuItem value={MediaType.WEBSERIES}>{MediaType.WEBSERIES}</MenuItem>
                            <MenuItem value={MediaType.DOCUMENTARY}>{MediaType.DOCUMENTARY}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} >
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel>Add Some Tags</InputLabel>
                        <Select
                            multiple
                            value={personName}
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
                            {names.map((name) => (
                                <MenuItem key={name} value={name} >
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
