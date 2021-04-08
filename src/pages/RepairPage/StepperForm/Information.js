import React, { Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    const { serial, name, emi1, emi2 } = data;

    return (
        <>
            <div className={classes.root}>
                <Grid 
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item md={12} xs={12}>
                        {/* serial */}
                        <TextField
                            id="serial"
                            label="Serial Number"
                            name="serial"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            inputRef={register}
                            error={!!errors.serial}
                            defaultValue={serial}
                            autoFocus
                        />
                        {errors.serial && <p className={classes.errorMessage}>{errors.serial.message}</p>}

                    </Grid>
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
                            defaultValue={name}
                        />
                        {errors.name && <p className={classes.errorMessage}>{errors.name.message}</p>}
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    spacing={1}
                >
                    <Grid item md={12} xs={12}>
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
                                defaultValue={emi2}
                            />
                            {errors.emi2 && <p className={classes.errorMessage}>{errors.emi2.message}</p>}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
