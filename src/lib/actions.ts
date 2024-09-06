'use server';

export const createStripeCustomer = async (bodyData: any) => {
  try {
    const response = await fetch('/api/stripe/create-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    const data = await response.json();
    return [data, null];
  } catch (error) {
    console.error('[CREATE_STRIPE_CUSTOMER_ERROR]', error);
    return [null, error];
  }
};
