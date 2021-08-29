import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  withRouter,
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
import history from "./Components/history";

export const App: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  // let history = useHistory<string>();

  // const authClient: OktaAuth = new OktaAuth(oktaAuthConfig);

  // function onAuthRequired() {
  //   history.push("/login");
  // }
  // const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  //   history.replace(toRelativeUrl(originalUri, window.location.origin));
  // };
  console.log(history);

  return (
    <Router>
      {/* <Security
        oktaAuth={authClient}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={onAuthRequired}
      > */}
        <Switch>
          <Box style={{ minHeight: "110vh" }} className="page">
            {/* <Route exact path="/">
              <Redirect exact from="/" to="/login" />
            </Route>
            <Route
              path="/login"
              render={() => <Login config={oktaSignInConfig} />}
            />

            <Route path="/login/callback" component={LoginCallback} />
            <div> */}

            <Route exact path = "/">
              <Redirect exact from="/" to="/publishers"/>
            </Route>
              
              <Route exact path="/publishers">
              <NavBar />
                <PublishersContent />
              </Route>
              <Route exact path="/remotefeeds">
              <NavBar />
                <RemoteFeedsContent />
              </Route>
            {/* </div> */}
          </Box>
        </Switch>
        </Router>

      // {/* </Security> */}
  );
});
