import React, { useEffect, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import { useOktaAuth } from '@okta/okta-react';
import { oktaSignInConfig } from './config';





// const SignInWidget = ({ config, onSuccess, onError }) => {
//   const widgetRef = useRef();
//   useEffect(() => {
//     if (!widgetRef.current)
//       return; //was false
    
//     const widget = new OktaSignIn(config);

//     widget.showSignInToGetTokens({
//       el: widgetRef.current,
//     }).then(onSuccess).catch(onError);

//     return () => widget.remove();
//   }, [config, onSuccess, onError]);

//   return (<div ref={widgetRef} />);
// };
// export default SignInWidget;

const Login = ({ setCorsErrorModalOpen, config}) => {
    const { oktaAuth } = useOktaAuth();
    const widgetRef = useRef();
  
    useEffect(() => {
      if (!widgetRef.current) {
        return; //was false
      }
  
    //   const { issuer, clientId, redirectUri, scopes, useInteractionCode } = config.oidc;
      const widget = new OktaSignIn(config);
  
      widget.renderEl(
        { el: widgetRef.current },
        (res) => {
          console.log(res);
          oktaAuth.handleLoginRedirect(res.tokens);
        },
        (err) => {
          throw err;
        },
      );
  
      // Note: Can't distinguish CORS error from other network errors
      const isCorsError = (err) => (err.name === 'AuthApiError' && !err.statusCode);
  
      widget.on('afterError', (_context, error) => {
        if (isCorsError(error)) {
          setCorsErrorModalOpen(true);
        }
      });
  
      return () => widget.remove();
    }, [oktaAuth]);
  
    return (
      <div>
        <div ref={widgetRef} />
      </div>
    );
  };
  export default Login;