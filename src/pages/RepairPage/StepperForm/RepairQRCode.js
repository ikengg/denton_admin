import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
import QR from './QR';
import { ref } from 'yup';

import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';


const useStyles = makeStyles(theme => ({
    root: {
        // margin: '-1rem 0 2rem 0',
        margin: '0',
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
    const componentRef = useRef();
    const pageStyle = `
    @media print {
        @page { 
          /* size: landscape;  */
          size: 50mm 100mm;
          display: flex;
          flex-direction: row;
          align-items: center;
          
          /* text-align: center; */
          
        }
        .page-break {
          margin-top: 1rem;
          display: block;
          page-break-before: auto;
        }
      }
      
    `;

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={1}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    //justifyContent="center"
                    alignItems="center"
                >
                    {/* <QR /> */}
                    <ComponentToPrint
                        ref={componentRef}
                    />
                    <br />
                    <ReactToPrint
                        trigger={() => <button>Print this out!</button>}
                        content={() => componentRef.current}                       
                    />
                </Box>
            </Grid>

        </div>
    )
}

export default RepairQRCode
