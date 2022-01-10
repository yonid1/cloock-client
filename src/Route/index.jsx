import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormLogin from "../component/logIn";
import MyTime from "../timerworks/index";
// import Data from "../component/data";
// import Home from "./home";
// import SignUp from "../login/sign up";
// import { logOutAction } from "../redux/actions/index";
// import { connect } from "react-redux";
// import PrivateRote from "./privateRoute";
import "../App.css";
import Main from "../component/ListName/Main"
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import Home from "../component/home";
import Manger from "../component/loginManger"
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {},
  },
}));

export default function Index() {
  let history = useHistory();

  const classes = useStyles();
  const remove = () => {
    localStorage.removeItem("Auth");
    // history.push("/formLogin")
  };
  return (
    <div>
      <Router>
        
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/myTime">
            <MyTime />
          </Route>
          <Route path = "/main"> <Main/> </Route>
           <Route exact path="/manger">
            <Manger />
          </Route> 
          <Route exact path="/formLogin">
            <FormLogin />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
