import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

export default function User({ userId, setList, id }) {
  console.log("User", userId);
  const request = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ userId: userId, id: id }),
  };
  const timeout = useCallback(() => {
    console.log("timeout", request);
    fetch(`${process.env.REACT_APP_SERVER}timeout`, request)
      .catch((err) => {
        console.error(err);
      })
      .then((res) =>
        res.json().then((data) => {
          setList(data);
        })
      );
  }, [userId,id]);
  const timeIn = useCallback(() => {
    // console.log("timeout",request);
    fetch("http://localhost:5000/timein", request)
      .catch((err) => {})
      .then((res) =>
        res.json().then((data) => {
          setList(data);
        })
      );
  }, [userId]);
  return (
    <div>
      <button className="buttonout" onClick={timeout}>timeOut</button>
      <button className="buttonin" onClick={timeIn}>timeIn</button>
    </div>
  );
}
