import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    'Registered',
    'กำลังส่งซ่อม', 
    'กำลังซ่อม', 
    'ซ่อมเรียบร้อยแล้ว'
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    case 3:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown stepIndex';
  }
}



export default function StatusStepper(props) {

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  let repairData = props.repairData;
  let repairStep = {
    'registered': 0,
    'กำลังส่งซ่อม': 1,
    'กำลังซ่อม': 2,
    'ซ่อมเรียบร้อยแล้ว': 3
  };
  //console.log(repairStep[repairData.status]);
  //setActiveStep(repairStep[repairData.status]);

  useEffect(() => {
    console.log('stepper re-render');
    setActiveStep(repairStep[repairData.status]);
  }, [repairStep]);

  return (
    <Box
      className={classes.root} 
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={100}
    >
      <Typography variant="h4" >สวัสดีคุณ {repairData.customerName}</Typography>
      {/* activeStep Here */}
      <Stepper activeStep={activeStep} alternativeLabel mt={5}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
