import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode.react';
import { DOMAIN_URL } from "../../../config/index";

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

const RepairQRCode = () => {
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
                <QRCode
                    size={128}
                    renderAs={"svg"}
                    value={DOMAIN_URL}
                // imageSettings={{
                //     src: "./kisspng-xiaomi-mi-5-xiaomi-mi-6-xiaomi-redmi-xiaomi-mi-1-mini-5ab53c5e79db15.1083687115218269104991.png",
                //     x: null,
                //     y: null,
                //     height: 30,
                //     width: 40,
                //     excavate: true,
                // }}
                />
            </Grid>
        </div>
    )
}

export default RepairQRCode
