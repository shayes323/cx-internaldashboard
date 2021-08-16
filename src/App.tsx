import { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Box } from "@material-ui/core";
import { stateStoreContext } from "./StateStore";
import { observer } from "mobx-react-lite";
import { NavBar } from "./Components/NavBar";
import "./App.css";
import "firebase/firestore";
import "firebase/auth";

import { PublishersContent, RemoteFeedsContent } from "./Organization/Content";
import { Loading } from "./Components/Loading";
import LoadingOverlay from 'react-loading-overlay';


// firebase.initializeApp({
//   apiKey: "AIzaSyAeMnIeY0L31GDBaZ7SU5vosd7DWGHAF_g",
//   authDomain: "catapultx.firebaseapp.com",
//   databaseURL: "https://catapultx.firebaseio.com",
//   projectId: "catapultx",
//   storageBucket: "catapultx.appspot.com",
//   messagingSenderId: "662251025753",
//   appId: "1:662251025753:web:d69eecf648e8074c538848",
//   measurementId: "G-YWZMRM0MGW",
// });

// const auth = firebase.auth();
// const firestore = firebase.firestore();

// export function SignIn() {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   };

//   return (
//     <>
//       <button className="sign-in" onClick={signInWithGoogle}>
//         Sign in with Google
//       </button>
//     </>
//   );
// }

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className="sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }

export const App: any = observer<any, any>(() => {
  const stateStore = useContext(stateStoreContext);
  //   const [user] = useAuthState(auth);
// console.log(stateStore.pageLoading);
//   if (stateStore.pageLoading !== [false, false, false]) {
//     return <Loading />
//   }

  return (
    // <LoadingOverlay
    // active={stateStore.pageLoading !== [false, false, false]}
    // spinner>
    <Router>
  <div className="page">
  <Box style={{minHeight: "110vh"}}>
  <div>
    <Router>
       <div className="PageConstants">
       <NavBar />
      </div>
          <div className="Content">
        <Switch>
          <Route exact path="/">
            <Redirect exact from="/" to="/publishers" />
          </Route>
          <Route exact path="/publishers">
           <PublishersContent/>
          </Route>
          <Route exact path="/remotefeeds">
            <RemoteFeedsContent />
          </Route>
        </Switch>
      </div>
      </Router>
  </div>
  </Box>
  </div>
  </Router>
  // </LoadingOverlay>

  );
});
