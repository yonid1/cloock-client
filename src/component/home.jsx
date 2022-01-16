import React from "react";
import "./home.css"
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
    <div  >
  
          <div className="div">
            <button
          className ="button-login"
            variant="outlined"
            color="black"
            onClick={login}
          >
            Login
          </button>
          <p></p>
       
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
