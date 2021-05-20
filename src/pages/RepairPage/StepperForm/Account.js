import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    CircularProgress,
    TextField,
    Grid
} from '@material-ui/core';
import {
    setInsertNewCustomerEmail,
    setIsCheckingEmail,
    setAccount,
    setIsCheckingPhone,
    setInsertNewCustomerPhone,
} from "../../../redux/actions/formStepperAction";
import { PosposAxios } from '../../../utils/axiosConfig';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '-1rem 0 2rem 0',
        padding: '0 7rem',
        [theme.breakpoints.down('xs')]: {
            padding: '0'
        },
        [theme.breakpoints.down('md')]: {
            padding: '0'
        },
        marginTop: 'auto'
    },
    textField: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        }
    },
    errorMessage: {
        color: 'red',
        fontSize: '0.9rem',
        marginTop: '0.2rem'
    }
}));

export default function Account({ formProps: { register, errors }, data }) {
    const classes = useStyles();

    // ดึง data จาก global state
    const { email, firstName, lastName, phone, address } = data;
    const [emaillValue, setEmaillValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const { isCheckingEmail, isCheckingPhone } = useSelector((state) => state.formStepperReducer);
    const [enableEditting, setEnableEditting] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const emailFieldOnChange = ({ target }) => {
        setEmaillValue(target.value);
    }

    const phoneFieldOnChange = ({ target }) => {
        setPhoneValue(target.value);
    }

    const checEmailWithDB = async () => {
        //axios check serial
        try {
            const response = await PosposAxios.post('/api/repair/checkcustomer/', {
                email: emaillValue,
            });
            console.log(response);
            // //set to global state
            if (response.data.data.data) {
                console.log(response.data.data.data)
                dispatch(setInsertNewCustomerEmail(false));
                dispatch(setAccount(response.data.data.data));
                setEnableEditting(false);
            }
            // //NEXT STEP 
            dispatch(setIsCheckingEmail(false));
        } catch (error) {
            console.log(error.data);
        }
    }

    const checkPhoneWithDB = async () => {
        setIsLoading(true);
        //axios check serial
        console.log(phoneValue);
        try {
            const response = await PosposAxios.post('/api/repair/checkcustomerphone/', {
                phone: phoneValue,
            });
            console.log(response);
            // //set to global state
            if (response.data.data.data) {
                console.log(response.data.data.data)
                dispatch(setInsertNewCustomerPhone(false));
                dispatch(setAccount(response.data.data.data));
                setEnableEditting(false);
            }
            // //NEXT STEP 
            setTimeout(() => {
                setIsLoading(false);
            }, 200);
            setTimeout(() => {
                dispatch(setIsCheckingPhone(false));
            }, 100);
        } catch (error) {
            console.log(error.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 200);
        }
    }

    useEffect(() => {
        // if (email) {
        //     setEnableEditting(false);
        // }
        if (phone) {
            setEnableEditting(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            <div className={classes.root}>

                <Grid container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    {/* Phone */}
                    <Grid item md={12} xs={12}>
                        <TextField
                            id="phone"
                            label="Phone"
                            name="phone"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            //type="password"
                            inputRef={register}
                            error={!!errors.phone}
                            disabled={!enableEditting}
                            defaultValue={phone}
                            onChange={phoneFieldOnChange}
                        />
                        {errors.phone && <p className={classes.errorMessage}>{errors.phone.message}</p>}
                        {
                            isCheckingPhone && (
                                <Button variant="contained" color="primary" onClick={checkPhoneWithDB}>
                                    Check Customer Phone
                                </Button>
                            )
                        }{
                            isLoading && (
                                <>
                                    <br />
                                    <br />
                                    <CircularProgress  />
                                </>
                            )
                        }

                    </Grid>

                    {
                        !isCheckingPhone && (
                            <>
                                {/* firstName */}
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        id="firstName"
                                        label="First name"
                                        name="firstName"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={register}
                                        error={!!errors.firstName}
                                        disabled={!enableEditting}
                                        defaultValue={firstName}
                                    />
                                    {errors.firstName && <p className={classes.errorMessage}>{errors.firstName.message}</p>}
                                </Grid>
                                {/* lastName */}
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        id="lastName"
                                        label="Last name"
                                        name="lastName"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        //type="password"
                                        inputRef={register}
                                        error={!!errors.lastName}
                                        disabled={!enableEditting}
                                        defaultValue={lastName}
                                    />
                                    {errors.lastName && <p className={classes.errorMessage}>{errors.lastName.message}</p>}
                                </Grid>
                                {/* Email */}
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        name="email"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={register}
                                        error={!!errors.email}
                                        defaultValue={email}
                                        disabled={!enableEditting}
                                        //onChange={emailFieldOnChange}
                                    />

                                    {errors.email && <p className={classes.errorMessage}>{errors.email.message}</p>}

                                </Grid>
                                {/* Address */}
                                <Grid item md={12} xs={12}>
                                    <TextField
                                        id="address"
                                        label="Address"
                                        name="address"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        //type="password"
                                        inputRef={register}
                                        error={!!errors.address}
                                        disabled={!enableEditting}
                                        defaultValue={address}
                                    />
                                    {errors.address && <p className={classes.errorMessage}>{errors.address.message}</p>}
                                </Grid>
                            </>
                        )
                    }
                </Grid>

            </div>
        </Fragment>
    )
}
