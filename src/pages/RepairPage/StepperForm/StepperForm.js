import React from 'react'
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
import { setInformation, setAccount } from "../../../redux/actions/formStepperAction";
import QRCode from './QRCode';

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
    serial: yup
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
});

const accountSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email.')
        .required('This field is required.'),
    name: yup
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
    return ['Device Information', 'User Information', 'QR Code'];
}

export default function StepperForm() {
    const classes = useStyles();

    const { information, account } = useSelector((state) => state.formStepperReducer);
    const dispatch = useDispatch();

    const informationForm = useForm({
        validationSchema: informationSchema
    });

    const accountForm = useForm({
        validationSchema: accountSchema
    });

    const {handleSubmit} = useForm();

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

    // onsubmit
    const onSubmit = data => {

        console.log(data);

        if (activeStep === 0) {
            // เก็บ data จาก form แรก
            dispatch(setInformation(data));
        }
        else if (activeStep === 1) {
            // เก็บ data จาก form หลัง
            dispatch(setAccount(data));
        }
        // go next step
        handleNext()
    };

    const finishSubmit = () => {
        console.log('finish');
        handleNext();
    }

    // get step content
    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return <Information formProps={informationForm} data={information} />;
            case 1:
                return <Account formProps={accountForm} data={account} />;
            case 2:
                return <QRCode />
            default:
                return 'Unknown stepIndex';
        }
    }

    return (
        <form 
            // onSubmit={activeStep === 0 ? informationForm.handleSubmit(onSubmit) : accountForm.handleSubmit(onSubmit)}>
            onSubmit={(activeStep < steps.length - 1) ? (activeStep === 0 ? informationForm.handleSubmit(onSubmit) : accountForm.handleSubmit(onSubmit)) : handleSubmit(finishSubmit) }>

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
                        <Button variant="contained" color="primary" onClick={handleReset }  >Reset</Button>
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
                            <Button variant="contained" color="primary" type="submit" >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </form>

    );
}