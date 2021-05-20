import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import BuildIcon from '@material-ui/icons/Build';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../components/Footer';
import { PosposAxios } from '../../utils/axiosConfig';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from "react-router-dom";


import useForm from "react-hook-form";
import * as yup from "yup";
import StatusStepper from './StatusStepper';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const checkSerial = yup.object().shape({
    serialNumber: yup
        .string()
        .required("กรุกรอก Serial")
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        marginTop: theme.spacing(4),
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    errorMessage: {
        color: 'red',
        fontSize: '0.9rem',
        marginTop: '0.2rem'
    }
}));

const RepairStatusTracking = () => {
    const classes = useStyles();
    let query = useQuery();
    /// ! param can be null
    let param = query.get("serial");
    console.log(param);

    const [isSerialInvalidValid, setIsSerialInvalidValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuscess, setIsSuscess] = useState(false);
    const [repairData, setRepairData] = useState({
        status: '',
        customerName: ''
    });

    const { register, errors, handleSubmit } = useForm({
        validationSchema: checkSerial
    });

    const onSubmit = async (data) => {

        setIsSerialInvalidValid(false);
        setIsLoading(true);

        try {
            console.log(data.serialNumber);

            const response = await PosposAxios.post('/api/repair/status/', {
                serialNumber: data.serialNumber,
            });

            if (response.status === 200) {
                console.log(response);
                setIsSuscess(true);
                setRepairData({
                    status: response.data.data.status,
                    customerName: response.data.data.customer.firstName
                });
            } else {
                setIsSerialInvalidValid(true);
            }

        } catch (e) {
            console.log(e);
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 900);
        }
    }

    React.useEffect(() => {
        console.log('re-render')
    }, [])

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <BuildIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        ตรวจสอบสถานะการส่งซ่อม
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                        {/* Serial Number */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="serialNumber"
                            label="Serial Number"
                            name="serialNumber"
                            inputRef={register}
                            error={!!errors.serialNumber}
                            defaultValue={param ? param : ""}
                            initialValue
                            autoFocus
                        />
                        {isSerialInvalidValid
                            ? (<p className={classes.errorMessage}>ไม่พบ Serial Number นี้ในระบบ</p>)
                            : (errors.serialNumber && <p className={classes.errorMessage}>{errors.serialNumber.message}</p>)
                        }
                        {isLoading
                            ? (
                                <Box
                                    display="flex"
                                    flexItem
                                    flexDirection="column"
                                    alignItems="center"
                                >
                                    <CircularProgress />
                                </Box>
                            )
                            : (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Check
                                </Button>
                            )
                        }


                    </form>
                    {
                        isSuscess && <StatusStepper repairData={repairData} />
                    }
                    <Box mt={5}>
                        <Footer />
                    </Box>

                </div>
            </Grid>
        </Grid>
    );

};

export default RepairStatusTracking;
