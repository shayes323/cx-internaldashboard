import React, { useEffect, useRef } from 'react';
import { findDOMNode } from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';



const SignInWidget = ({ config, onSuccess, onError }) => {
  const widgetRef = useRef();
  useEffect(() => {
    if (!widgetRef.current)
      return; //was false
    
    const widget = new OktaSignIn(config);

    widget.showSignInToGetTokens({
      el: widgetRef.current,
    }).then(onSuccess).catch(onError);

    return () => widget.remove();
  }, [config, onSuccess, onError]);

  return (<div ref={widgetRef} />);
};
export default SignInWidget;