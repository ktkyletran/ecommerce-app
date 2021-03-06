import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles';
import { PaymentForm, AddressForm } from '..';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';

const steps = ['Shipping info', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null); 
  const [shippingData, setShippingData] = useState({}); 
  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart'});

        setCheckoutToken(token);
      } 
      catch (error) {
        console.log(error)
      }
    };
    generateToken();
  }, [cart]);

  const next = (data) => {
    setShippingData(data)

    nextStep();
  };

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  let Confirmation = () => (order.customer ? (
    <div>
      <Typography variant="h5">Thank you for your purchase, {order.customer.firstname}!</Typography>
      <Divider className={classes.divider}/>
      <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
      <br />
      <Typography variant="subtitle2">A confirmation email with order and shipping details will be sent once the order is received.</Typography>
      <br /><br />
      <Button variant="outlined" type="button" component={Link} to="/">
        Back to home
      </Button>
    </div>
  ) : (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ));

  if (error) {
    <>
    <Typography variant="h5">Error: {error}</Typography>
    <br />
    <Button variant="outlined" type="button" component={Link} to="/">
      Back to home
    </Button>
    </>
  }


  const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
    : <PaymentForm shippingData={shippingData} token={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} />


  return (
    <>
      <div className={classes.toolBar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
