import { useCallback, useState, useEffect } from "react";

import "./App.css";
export default function Persons({
  list,
  setIdRemove,
  name,
  phone,
  job,
  userId,
  setList,
  id,
  setDivRemove,
  allUserId,
  setAllUserId,
  toggleOpen,
}) {
  const [ListName, setListName] = useState();
  const [massage, setMassage] = useState();

  const requestToken = {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": localStorage.getItem("mangerToken"),
    },
    body: JSON.stringify({ num: userId }),
  };
  console.log("id main ", id);
  
  const viewMe = useCallback(async (myId) => {
    const request = {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ num: myId }),
    };
    console.log("useCallback", myId);
    await fetch(`${process.env.REACT_APP_SERVER}applocals`, request).then((res) =>
      res.json().then((data) => setMassage(data.massage))
    );
    // console.log("list name in useCallback", request);
    await fetch(`${process.env.REACT_APP_SERVER}time`, requestToken).then((res) =>
      res.json().then((data) => setListName(data))
    );
  }, []);
  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{phone}</td> <td>{job}</td> <td>{userId}</td>
        <td
          role="button"
          onClick={(e) => {
            setDivRemove(true)
            console.log("onClick");
            setIdRemove(userId.toString())
            // remove(userId);
          }}
          className="remove"
          value="Delete"
        >
          Delete
        </td>
        <td
          role="button"
          className="viewMe"
          onClick={(e) => {
            viewMe(id);

            toggleOpen(id);
          }}
        >
          viewMe
        </td>
      </tr>
      {allUserId?.includes(id) && (
        <tr className="tablePersons" key={id + 4}>
          <tr>
            <th>timeIn</th>
            <th>timeOut</th>
            <th>userId</th>
          </tr>
          {ListName?.map((item, index) => (
            <tr key={index}>
              <td> {item.timeIn} </td> <td> {item.timeOut} </td>
              <td> {item.userId} </td>
            </tr>
          ))}
        </tr>
      )}
    </tbody>
  );
}
