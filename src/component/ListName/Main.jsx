import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { useHistory } from "react-router-dom"; // import "../App.css";
import Person from "./persons";
function Main(e) {
  const [list, setList] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [userId, setUserId] = useState();
  const [allUserId, setAllUserId] = useState([]);
  const [divRemove, setDivRemove] = useState(false);
  const [idRemove , setIdRemove]=useState()
  const [divAdd , setDivAdd] = useState(false)
  let history = useHistory();
  console.log("list", list);
  
  useEffect(() => {
   
    const requestToken = {
      mode: "cors",
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("mangerToken"),
      },
      body: JSON.stringify({ num: userId }),

    };
    fetch(`${process.env.REACT_APP_SERVER}main`, requestToken).then((res) =>
      res.json().then((data) => {
        if (data.length >= 0) {
          setList(data);
          // setAllUserId(data.map((item , index)=>(
          //   item.id
          // )))
        } else {
          localStorage.clear();
          history.push("/");
        }
      })
    );
  }, []);
  const request = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      job: job,
      userId: userId,
    }),
  };

  const fetchRequest = useCallback(() => {
    console.log("useeffect");
    fetch(`${process.env.REACT_APP_SERVER}1`, request)
      .then((res) =>
        res.json().then((data) => {
          setList(data);
        })
      )
      .catch((err) => {
        console.error(err);
      });
    setName("");
    setPhone("");
    setJob("");
    setUserId("");
  }, [name, phone, job, userId]);

  function handelName(e) {
    setName(e.target.value);
  }
  function handelPhone(e) {
    setPhone(e.target.value);
  }
  function handelJob(e) {
    setJob(e.target.value);
  }
  function handelUserId(e) {
    setUserId(e.target.value);
  }
  const toggleOpen = (myId) => {
    if (allUserId.includes(myId)) {
      console.log("toggleOpen", allUserId);

      setAllUserId(allUserId.filter((sid) => sid !== myId));
    } else {
      setAllUserId([]);

      let newOpen = [];
      console.log("newOpen", newOpen);
      newOpen.push(myId);
      setAllUserId(newOpen);
    }
  };
  const remove = useCallback(async (userId) => {
    console.log("useCallback", userId);
    await fetch(`${process.env.REACT_APP_SERVER}remove`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ num: idRemove }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length >= 0) {
          console.log("data", data);
          setList(data);
        }
      }); setDivRemove(false)
  }, [idRemove]);

  return (
    <div className="App">
      {/* <form className="container"> */}
      <button className="buttonAdd" onClick={()=>setDivAdd(!divAdd)}> Add Name </button>
      {divAdd&& (<div className="row-cols-2">
        {/* <div className="row-cols-2"> */}
          {/* <div className = "col">
            <div className="form-floating mb-3"> */}
              <input
                className="form-control"
                id="floatingInput"
                placeholder="name"
                type="text"
                title="name"
                value={name}
                onChange={handelName}
              />
              <label for="floatingInput">Name</label>
            {/* </div> */}
            {/* <div className="form-floating mb-3"> */}
              <input
                className="form-control"
                title="phone"
                placeholder="phone"
                value={phone}
                onChange={handelPhone}
              ></input>
              <label for="floatingInput">Phone</label>
            {/* </div> */}
          {/* </div> */}
          {/* <div className="col"> */}
          {/* <div className="form-floating mb-3"> */}
            <input
              className="form-control"
              placeholder="Jpb"
              type="text"
              title="job"
              value={job}
              onChange={handelJob}
            ></input>
            <label for="floatingInput">Job</label>
          {/* </div> */}
          {/* <div className="form-floating mb-3"> */}
            <input
              className="form-control"
              type="text"
              placeholder="userId"
              title="userId"
              value={userId}
              onChange={handelUserId}
            ></input>
            <label for="floatingInput">userId</label>
          {/* </div> */}

          <button onClick={fetchRequest}>add</button>
          {/* </form> */}
          {/* </div> */}
        </div>)}
      
      {/* // </div>{" "} */}
      {divRemove && (
        <div className="delete">
          You are about to delete this user from the system, are you sure?{" "}
          <p></p>
          <button onClick={()=> remove(idRemove) } type="button" className="btn btn-danger btn-lg">
            Ok{" "}
          </button> {" "}
          <button onClick={()=>setDivRemove(!divRemove)} type="button" className="btn btn-light btn-lg">
            Cancel
          </button>
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>phone</th>
            <th>job</th>
            <th>userId</th>
            <th>remove</th>
            <th>showTime</th>
          </tr>
        </thead>

        {list?.map((item, index) => (
          <Person
            list={list}
            setList={setList}
            name={item.name}
            phone={item.phone}
            job={item.job}
            userId={item.userId}
            allUserId={allUserId}
            setAllUserId={setAllUserId}
            id={item.id}
            key={index}
            setAllId={setUserId}
            toggleOpen={toggleOpen}
            setDivRemove ={setDivRemove}
            setIdRemove ={setIdRemove}
          />
        ))}
      </table>
    </div>
  );
}

export default Main;
