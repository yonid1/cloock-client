import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./home.css"
import Manger from "../component/loginManger.jsx";
import { useHistory } from "react-router-dom";

export default function Home() {
  let history = useHistory();
  const login = () => {
    history.push("/formLogin")
  }
  const loginManger = () => {
    history.push("/manger")
  }

  return (
    <div>
      {/* <Router> */}
        {/* <Link to="/formLogin" style={{ color: "black" }}> */}
          {/* <Box mt={0} ml={170}> */}
          <div className="div">
            <button
          className ="button-login"
            variant="outlined"
            color="black"
            // className={classes.root}
            onClick={login}
          >
            Login
          </button>
          <p></p>
          {/* </Box> */}
        {/* </Link> */}
        {/* <Link to="manger"> */}
          <button
          className="button-manger"
          onClick={loginManger}
          >manger</button>
          </div>
          
        {/* </Link> */}
      {/* </Router> */}
    </div>
  );
}
