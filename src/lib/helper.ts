import { AgencyDetailsFormType } from './types';

export const constructStripeCustomerData = (values: AgencyDetailsFormType) => {
  const bodyData = {
    email: values.companyEmail,
    name: values.name,
    shipping: {
      address: {
        city: values.city,
        country: values.country,
        line1: values.address,
        postal_code: values.zipCode,
        state: values.zipCode,
      },
      name: values.name,
    },
    address: {
      city: values.city,
      country: values.country,
      line1: values.address,
      postal_code: values.zipCode,
      state: values.zipCode,
    },
  };
  return bodyData;
};
