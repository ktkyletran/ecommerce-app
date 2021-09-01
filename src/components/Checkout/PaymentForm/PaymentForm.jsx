import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const PaymentForm = ({ token, shippingData, backStep, nextStep, onCaptureCheckout }) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) {
      alert(error)
    } else {
      const orderData = {
        line_items: token.live.line_items,
        customer: { 
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: { 
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.state,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        billing: {
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.state,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        fulfillment: { 
          shipping_method: shippingData.option
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          },
        },
      };
      onCaptureCheckout(token.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review token={token} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe}) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>Back to shipping</Button>
                <Button variant="contained" disabled={!stripe} color="primary" type="submit">Submit payment</Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
};

export default PaymentForm
