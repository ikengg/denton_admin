import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Information from './Information'
import Account from './Account'
import useForm from "react-hook-form";
import * as yup from "yup";

//redux importment
import { useSelector, useDispatch } from "react-redux";
import {
    setInformation,
    setAccount,
    setIsCheckingSerial,
    setInsertNewItem,
    setIsCheckingEmail,
    setInsertNewCustomerEmail,
    setIsCheckingPhone,
    setInsertNewCustomerPhone,
} from "../../../redux/actions/formStepperAction";

import RepairQRCode from './RepairQRCode';

import { PosposAxios } from '../../../utils/axiosConfig';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    buttonLayout: {
        marginLeft: '7rem',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0'
        },
    }
}));

const informationSchema = yup.object().shape({
    serialNumber: yup
        .string()
        .required('This field is required.'),
    name: yup
        .string()
        .required('This field is required.'),
    emi1: yup
        .string()
        .required('This field is required.'),
    emi2: yup
        .string()
        .required('This field is required.'),
    problem: yup
        .string()
        .required('This field is required.'),
});

const accountSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email.')
        .required('This field is required.'),
    firstName: yup
        .string()
        .required('This field is required.')
        .min(3, 'Please Enter less then 3 letters'),
    lastName: yup
        .string()
        .required('This field is required.')
        .min(3, 'Please Enter less then 3 letters'),
    phone: yup
        .string()
        .required('This field is required.')
        .min(3, 'Please Enter less then 3 letters'),
    address: yup
        .string()
        .required('This field is required.')
        .min(3, 'Please Enter less then 3 letters'),
});

//Step Title
function getSteps() {
    return [
        'Device Information',
        'User Information',
        'QR Code'
    ];
}

export default function StepperForm() {
    const [status,setStatus] = useState('กำลังส่งซ่อม')
    const classes = useStyles();

    const {
        information,
        account,
        isCheckingSerial,
        insertNewItem,
        insertNewCustomerEmail,
        insertNewCustomerPhone
    } = useSelector((state) => state.formStepperReducer);

    const dispatch = useDispatch();

    const informationForm = useForm({
        validationSchema: informationSchema
    });

    const accountForm = useForm({
        validationSchema: accountSchema
    });

    const { handleSubmit } = useForm();

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    // step ถัดไป
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    // step ก่อนหน้า
    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    // reset step
    const handleReset = () => {
        // ล้างค่าใน redux
        dispatch(setInformation({}));
        dispatch(setAccount({}));
        setActiveStep(0);
    };

    const addDataFormToDatabase = async (data) => {

        let responseCustomer = undefined;
        let responseItem = undefined;
        // post customer to add on db
        // if (insertNewCustomerEmail) {
        if (insertNewCustomerPhone) {
            //let { firstName, lastName, email, phone, address } = account;
            //console.log(account);
            console.log(data)
            try {
                responseCustomer = await PosposAxios.post('/api/customer/', {
                    ...data,
                });
            } catch (error) {
                console.log(error);
            }
        }
        console.log(responseCustomer);
        let customerId = responseCustomer?.data.data.customerId || account.customerId;
        console.log(customerId);

        // post item to add on db
        if (insertNewItem) {
            try {
                responseItem = await PosposAxios.post('/api/itemoutside/', {
                    ...information,
                    customerId
                });
            } catch (error) {
                console.log(error);
            }
        }

        let serialNumber = responseItem?.serialNumber || information.serialNumber;
        console.log(serialNumber);
        let { equipment, problem, note } = information;

        //add new repair
        try {
            let responseRepair = await PosposAxios.post('/api/repair/', {
                customerId,
                serialNumber,
                equipment,
                problem,
                note,
                status: status
            })
            console.log(responseRepair);
        } catch (error) {
            console.log(error);
        }
    };

    // onsubmit
    const onSubmit = async (data) => {
        //console.log(data);
        if (activeStep === 0) {
            // เก็บ data จาก form แรก
            dispatch(setInformation(data));
        }
        else if (activeStep === 1) {
            // เก็บ data จาก form หลัง
            dispatch(setAccount(data));
            console.log(account);
            await addDataFormToDatabase(data);
        }
        // go next step
        handleNext()
    };

    const finishSubmit = () => {
        console.log('finish');
        //call Axios here
        dispatch(setAccount());
        dispatch(setInformation());
        dispatch(setIsCheckingSerial());
        dispatch(setInsertNewItem());
        dispatch(setIsCheckingEmail());
        dispatch(setInsertNewCustomerEmail());
        dispatch(setIsCheckingPhone());
        dispatch(setInsertNewCustomerPhone());
        handleNext();
    }

    useEffect(() => {
        return () => {
            dispatch(setAccount());
            dispatch(setInformation());
            dispatch(setIsCheckingSerial());
            dispatch(setInsertNewItem());
            dispatch(setIsCheckingEmail());
            dispatch(setInsertNewCustomerEmail());
            dispatch(setIsCheckingPhone());
            dispatch(setInsertNewCustomerPhone());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // get step content
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <Information formProps={informationForm} data={information} />;
            case 1:
                return <Account formProps={accountForm} data={account} />;
            case 2:
                return <RepairQRCode />
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <form
            // onSubmit={activeStep === 0 ? informationForm.handleSubmit(onSubmit) : accountForm.handleSubmit(onSubmit)}>
            onSubmit={(activeStep < steps.length - 1) ? (activeStep === 0 ? informationForm.handleSubmit(onSubmit) : accountForm.handleSubmit(onSubmit)) : handleSubmit(finishSubmit)}>

            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/* Content */}
            <div>
                {activeStep === steps.length ? (
                    <div className={classes.buttonLayout} >
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button variant="contained" color="primary" onClick={handleReset} >Reset</Button>
                    </div>
                ) : (
                    <div>
                        {/* Form */}
                        <div className={classes.instructions}>{
                            getStepContent(activeStep)}
                        </div>
                        {/* Button Group */}
                        <div className={classes.buttonLayout}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                                variant="outlined"
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" type="submit" disabled={isCheckingSerial}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </form>

    );
}