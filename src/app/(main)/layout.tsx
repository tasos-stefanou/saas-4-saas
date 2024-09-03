import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      signInForceRedirectUrl={'/site'}
      signUpForceRedirectUrl={'/site'}
    >
      {children}
    </ClerkProvider>
  );
};

export default layout;
