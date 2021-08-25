import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  withRouter
} from "react-router-dom";
import { Box } from "@material-ui/core";
import { stateStoreContext } from "./StateStore";
import { observer } from "mobx-react-lite";
import { NavBar } from "./Components/NavBar";
import "./App.css";
import { PublishersContent, RemoteFeedsContent } from "./Organization/Content";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { toRelativeUrl, OktaAuth } from "@okta/okta-auth-js";
import { oktaAuthConfig, oktaSignInConfig } from "./Components/auth/config";
import Login from "./Components/auth/Login";

const App: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  let history = useHistory();

  const authClient: OktaAuth = new OktaAuth(oktaAuthConfig);

  function onAuthRequired() {

    history.push("/login");
  }
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Router>
      <Security
        oktaAuth={authClient}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={onAuthRequired}
      >
        <div className="page">
          <Box style={{ minHeight: "110vh" }}>
            <Route
              path="/login"
              render={() => <Login config={oktaSignInConfig} />}
            />

            <Route path="/login/callback" component={LoginCallback} />
            <div>
              <Router>
                <div className="PageConstants">
                  <NavBar />
                </div>
                <div className="Content">
                  <Switch>
                    <SecureRoute exact path="/">
                      <Redirect exact from="/" to="/publishers" />
                    </SecureRoute>
                    <SecureRoute exact path="/publishers">
                      <PublishersContent />
                    </SecureRoute>
                    <SecureRoute exact path="/remotefeeds">
                      <RemoteFeedsContent />
                    </SecureRoute>
                  </Switch>
                </div>
              </Router>
            </div>
          </Box>
        </div>
      </Security>
    </Router>
  );
});

export default App;
 