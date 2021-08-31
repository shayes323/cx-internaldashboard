
import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './SignInWidget';
import { useOktaAuth } from '@okta/okta-react';

export const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();



  if (!authState) return null;

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/publishers' }}/> :
    <OktaSignInWidget
     setCorsErrorModalOpen={true}
      config={config}/>;
};
export default Login;
