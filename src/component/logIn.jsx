import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import "./Login.css";

export default function LogIn() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [token, setToken] = useState();
  const [isSending, setIsSending] = useState(false);

  let history = useHistory();
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      history.push("/myTime");
    }
  }, [history, token]);
  const request = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.REACT_APP_SERVER,
    },
    body: JSON.stringify({ name: name, password: password }),
  };
console.log("process.env.REACT_APP_SERVER",process.env.REACT_APP_SERVER);

  const loginAuthentication = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);

    await fetch(
      `${process.env.REACT_APP_SERVER}login`,

      request
      // console.log("request",request)
    )
      .then((res) => res.json().then((data) => setToken(data.token)))

      .catch((err) => {
        console.error(err);
      });
    setIsSending(false);
  }, [isSending, name, password]);



  function validateForm() {
    return name.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <div className="login">

        <form className="form">
          <label>Name</label>
          <input
            className="input"
            type="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
 
          <label>Password</label>

          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            className="button"
            block
            size="lg"
            type="submit"
            disabled={isSending}
            onClick={loginAuthentication}
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
}
