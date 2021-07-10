import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';



const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51J2fJxSGuqgKrT0XvNC1ShTQenbwhLDmuXUCC5SVAsrVcHDaA5wsotCVolVPH8rZ1NE1NxyhndiNJVCNw28yHZ8n0025qn0pgt';

    const onToken = token => {
        // console.log(token);
        // alert("Payment done!");
       axios({
           url: 'payment',
           method: 'post',
           data: {
               amount: priceForStripe,
               token
           }
       }).then(response => {
           console.log(response);
           alert('Payment Successful');
       }).catch(error => {
        console.log(error)
           console.log('Payment error: ', JSON.parse(error));
           alert(
               'There was an issue with your payment. Please use the provided credit card'
           );
       });
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;