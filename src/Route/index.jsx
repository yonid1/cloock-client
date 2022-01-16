import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormLogin from "../component/logIn";
import MyTime from "../timerworks/index";

import "../App.css";
import Main from "../component/ListName/Main"

import Home from "../component/home";
import Manger from "../component/loginManger"


export default function Index() {

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
