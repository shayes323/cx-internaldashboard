import { observer } from 'mobx-react-lite';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { RoutePath } from '../common/route-path';
// import { Spinner } from '@common/components/Spinner';
import { AuthState, authStoreContext } from './auth.store';

export default observer(({ children }: PropsWithChildren<Record<string, unknown>>) => {
  const { observeAuthState, getAuthState } = useContext(authStoreContext);

  const [fbUnsubscribe] = useState(observeAuthState);
  useEffect(() => {
    // Make sure we un-register Firebase observers when the component unmounts.
    return fbUnsubscribe;
  }, []);
  // Get state after subscribing.
  const authState = getAuthState();

//   const spinner = authState === AuthState.Pending && <Spinner animation="border" />;
  const content = authState === AuthState.SignedIn && <>{children}</>;
  const redirect = authState === AuthState.SignedOut && <Redirect to={RoutePath.Login} />;

  return (
    <>
      {/* {spinner} */}
      {content}
      {redirect}
    </>
  );
});