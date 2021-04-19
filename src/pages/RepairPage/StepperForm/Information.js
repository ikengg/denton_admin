import React, { Fragment, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
//redux importment
import { useSelector, useDispatch } from "react-redux";
import { PosposAxios } from '../../../utils/axiosConfig';
import { setInformation, setIsCheckingSerial, setInsertNewItem  } from "../../../redux/actions/formStepperAction";


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

export default function Information({ formProps: { register, errors }, data }) {

    const classes = useStyles();

    // ดึง data จาก global state
    const { serialNumber, name, emi1, emi2, equipment, problem, note } = data;
    const { isCheckingSerial } = useSelector((state) => state.formStepperReducer);
    const [serialValue, setSerialValue] = useState('');
    const [enableEditting, setEnableEditting] = useState(true)
    const [responseCheckserial, setResponseCheckserial] = useState({});
    const dispatch = useDispatch();

    const serialFieldOnChange = ({ target }) => {
        setSerialValue(target.value)
    }

    const checkSerialWithDB = async () => {
        //axios check serial
        try{
            const response = await PosposAxios.post('/api/repair/checkserial/', {
                serialNumber: serialValue,
            });
            setResponseCheckserial(response);
            //set to global state
            console.log(response);
            if(response.data.data.data){
                console.log(response.data.data.data)
                dispatch(setInsertNewItem(false));
                dispatch(setInformation(response.data.data.data));
                setEnableEditting(false);
            }
            //NEXT STEP 
            dispatch(setIsCheckingSerial(false));
        }catch(error){
            console.log(error);
            if(error.status === '409')
                setResponseCheckserial(error.data)
        }
    }

    useEffect(() => {
        if(serialNumber){
            setEnableEditting(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className={classes.root}>
                <Grid
                    container
                    direction="row"
                    spacing={1}
                >
                    <Grid item md={12} xs={12}>
                        {/* serial */}
                        <TextField
                            id="serialNumber"
                            label="Serial Number"
                            name="serialNumber"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            inputRef={register}
                            error={!!errors.serialNumber}
                            defaultValue={serialNumber}
                            onChange={serialFieldOnChange}
                            disabled={!enableEditting}
                            autoFocus
                        />
                        {errors.serialNumber && <p className={classes.errorMessage}>{errors.serialNumber.message}</p>}
                        {responseCheckserial.data?.error && <p style={{color:'red'}}>{responseCheckserial.data.error.message}</p>}
                        {
                            isCheckingSerial && (
                                <Button variant="contained" color="primary" onClick={checkSerialWithDB}>
                                    Check Serial
                                </Button>
                            )
                        }
                    </Grid>
                    {
                        !isCheckingSerial && (
                            <>
                                <Grid item md={12} xs={12}>
                                    {/* Device name */}
                                    <TextField
                                        id="name"
                                        label="Device Name"
                                        name="name"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={register}
                                        error={!!errors.name}
                                        disabled={!enableEditting}
                                        defaultValue={name}
                                    />
                                    {errors.name && <p className={classes.errorMessage}>{errors.name.message}</p>}
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    {/* EMI1 */}
                                    <TextField
                                        id="emi1"
                                        label="EMI1"
                                        name="emi1"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={register}
                                        error={!!errors.emi1}
                                        disabled={!enableEditting}
                                        defaultValue={emi1}
                                    />
                                    {errors.emi1 && <p className={classes.errorMessage}>{errors.emi1.message}</p>}
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    {/* EMI2 */}
                                    <TextField
                                        id="emi2"
                                        label="EMI2"
                                        name="emi2"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={register}
                                        error={!!errors.emi2}
                                        disabled={!enableEditting}
                                        defaultValue={emi2}
                                    />
                                    {errors.emi2 && <p className={classes.errorMessage}>{errors.emi2.message}</p>}
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    {/* Eqipment */}
                                    <TextField
                                        id="equipment"
                                        label="Eqipment"
                                        name="equipment"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={register}
                                        error={!!errors.equipment}
                                        defaultValue={equipment}
                                    />
                                    {errors.equipment && <p className={classes.errorMessage}>{errors.equipment.message}</p>}
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    {/* Problem */}
                                    <TextField
                                        id="problem"
                                        label="Problem"
                                        name="problem"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={register}
                                        error={!!errors.problem}
                                        defaultValue={problem}
                                    />
                                    {errors.problem && <p className={classes.errorMessage}>{errors.problem.message}</p>}
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    {/* note */}
                                    <TextField
                                        id="note"
                                        label="Note"
                                        name="note"
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        inputRef={register}
                                        error={!!errors.note}
                                        defaultValue={note}
                                    />
                                    {errors.note && <p className={classes.errorMessage}>{errors.note.message}</p>}
                                </Grid>
                            </>
                        )
                    }
                </Grid>
            </div>
        </>
    )
}
