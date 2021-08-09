import { useEffect, useRef, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import firebase from 'firebase/app';
import { Redirect } from 'react-router-dom';
import { RoutePath } from '../common/route-path';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames';

import { userStoreContext } from '../user/user.store';
// import { ReactComponent as Logo } from 'icons/logo-primary.svg';
// import { ReactComponent as LogoTitle } from 'icons/logo-title.svg';
// import { ReactComponent as Lock } from 'icons/lock.svg';
// import { ReactComponent as Account } from 'icons/account.svg';

// import './SignIn.scss';
import { AuthState, authStoreContext } from './auth.store';

function GoogleSignInButton() {
  const provider = useRef<firebase.auth.AuthProvider>();
  useEffect(() => {
    provider.current = new firebase.auth.GoogleAuthProvider();
  }, []);

  return (
    <Button
      className="GoogleSignInButton d-flex justify-content-center align-items-center"
      onClick={() => {
        if (provider.current) {
          firebase
            .auth()
            .signInWithPopup(provider.current)
            .catch(err => {
              console.log(err);
            });
        }
      }}
    >
      <img
        className="GoogleSignInButton__icon"
        alt=""
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
      />
      <span>Sign in with Google</span>
    </Button>
  );
}

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default observer(function SignIn() {
  const [signInError, setSignInError] = useState('');
  const { organizationError, clearOrganizationError } = useContext(userStoreContext);
  const { getAuthState } = useContext(authStoreContext);
  const authState = getAuthState();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      clearOrganizationError();
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .catch(() => {
          setSignInError('Invalid email or password');
        });
    },
  });

  useEffect(() => {
    if (signInError) {
      setSignInError('');
    }
  }, [formik.values]);

  return (
    <>
      {authState === AuthState.SignedIn && <Redirect to={RoutePath.Root} />}
      <div className="SignIn">
        <div className="SignIn__brand">
          <div className="SignIn__logo-wrapper">
            {/* <Logo className="SignIn__logo" /> */}
          </div>
          <div className="SignIn__title">
            CatapultX brings the Power of Programmatic On-Stream Advertising to Social.
          </div>
          <div className="SignIn__description">
            Using our proprietary VisionOne technology, CatapultX brings contextual ad placement to the most engaging
            environments.
          </div>
        </div>
        <div className="SignIn__auth">
          <div className="SignIn__brand-logo">
            {/* <LogoTitle /> */}
          </div>
          <div className="SignIn__controls container">
            <div className="row">
              <div className="col GoogleSignInButton__error-label">
                <GoogleSignInButton />
              </div>
            </div>
            <Form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col">
                  <Form.Group controlId="email">
                    <div className="form-control--with-icon">
                      {/* <Account className="form-control-feedback" /> */}
                      <Form.Control
                        className={classNames('form-control__login', {
                          'is-invalid': formik.touched.email && formik.errors.email,
                        })}
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Username@catapultx.com"
                      />
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <div className="form-control__error-message">{formik.errors.email}</div>
                    )}
                  </Form.Group>
                  <Form.Group controlId="password">
                    <div className="form-control--with-icon">
                      {/* <Lock className="form-control-feedback" /> */}
                      <Form.Control
                        className={classNames('form-control__login', {
                          'is-invalid': formik.touched.password && formik.errors.password,
                        })}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type="password"
                        placeholder="Password"
                      />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                      <div className="form-control__error-message">{formik.errors.password}</div>
                    )}
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <a href="#">Forgot your password?</a>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center error-message">
                  {!!signInError && signInError}
                  {!!organizationError && organizationError}
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <Button type="submit" className="SignIn__button btn-primary--rounded">
                    Sign In
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
});