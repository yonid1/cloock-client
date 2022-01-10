import React, { useState, useEffect, useCallback } from "react";
import Main from "./ListName/Main.jsx";
import "./Login.css";
import { useHistory } from "react-router-dom";

export default function LoginManger() {
  const [list, setList] = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [token, setToken] = useState();
  console.log("token manger", token);
  let history = useHistory();

  useEffect(() => {
    if (token) {
      localStorage.setItem("mangerToken", token);
      history.push("/main");
    }
  }, [history, token]);

  const request = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ name: name, password: password }),
  };
  const loginAuthentication = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);
    await fetch(`${process.env.REACT_APP_SERVER}loginmanger`, request)
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch((err) => {
        console.error(err);
      });
    setIsSending(false);
  }, [isSending, name, password]);
  function validateForm() {
    return name.length > 0 && password.length > 0;
  }
  return (
    <div>
      <div className="login">
        <form className="form">
          {/* <Form.Group > */}
          <label>Name</label>
          <input
            className="input"
            autoFocus
            type="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* </Form.Group> */}
          {/* <Form.Group size="lg" controlId="password"> */}
          <label>Password</label>

          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {/* </Form.Group> */}
          <button
            className="button"
            type="submit"
            // disabled={!validateForm()}
            disabled={isSending}
            onClick={loginAuthentication}
          >
            Login
          </button>
        </form>
        {/* <Main list={list}></Main> */}
      </div>
    </div>
  );
}
