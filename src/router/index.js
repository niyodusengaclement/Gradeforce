import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import NotFound from "../containers/NotFound";
import Dashboard from "../containers/Dashboard";
import Login from "../containers/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/styles.scss";
import ProtectedRoutes from "../containers/ProtectedRoutes";
import Logout from "../containers/Logout";
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/styles.scss';
import Transcript from "../containers/Transcript";

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Switch>
          <Route exact path={["/", "/login"]} component={Login}></Route>
          <ProtectedRoutes exact path='/dashboard' component={Dashboard} />
          <ProtectedRoutes exact path='/logout' component={Logout} />
          <ProtectedRoutes exact path="/transcript" component={Transcript} />
          <Route component={NotFound} />
      </Switch>
    </Router>
    </>
  );
};

export default App;
