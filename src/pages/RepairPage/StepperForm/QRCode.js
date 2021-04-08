import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
}));

const QRCode = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>       
            <Grid   
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <h1>QR Code</h1>
            </Grid>
        </div>
    )
}

export default QRCode
