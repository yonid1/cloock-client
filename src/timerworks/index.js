import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import AddTime from "./addTime";
import ReactPaginate from "react-paginate";
import "./App.css";
export default function Index() {
  let history = useHistory();

  const [list, setList] = useState();
  const [messageFailed, setMessageFailed] = useState();
  const [user, setUser] = useState();
  const [id, setId] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const listPerPage = 10;
  const pagesVisited = pageNumber * listPerPage;
  console.log("user", user);
  // let id = 0 ;
  console.log("id", id);
  console.log("list", list);
  useEffect(() => {
    console.log("useEffect");
    // const numUser =
    list?.map((item, index) => {
      return setUser(item.userId), setId(item.id);
    });

    // console.log(numUser);
    // setUser(numUser?.slice(1));
  }, [list]);
  useEffect(() => {
    const requestToken = {
      mode: "cors",
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    };
    fetch(`${process.env.REACT_APP_SERVER}time`, requestToken)
      .then((res) =>
        res.json().then((data) => {
          if (data.length >= 0) {
            setList(data.slice(0, 50));
            // setUser(data.map((item,index) =>(item.userId)));
          } else {
            localStorage.clear();
            history.push("/");
            setMessageFailed(data);
          }
        })
      )
      .catch((err) => console.log("err", err));
  }, []);
  const displayList = list
    ?.slice(pagesVisited, pagesVisited + listPerPage)
    .map((item, index) => {
      return (
        <tr key={item.id}>
          <td> {item.timeIn} </td>
          <td> {item.timeOut} </td>
          <td> {item.userId} </td>
        </tr>
      );
    });
  const pageCount = Math.ceil(list?.length / listPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="App">
      <table className="table">
        <tbody>
          <tr>
            <th>timeIn</th>
            <th>timeOut</th>
            <th>userId</th>
          </tr>
          {displayList}
        </tbody>
      </table>
      <AddTime userId={user} setList={setList} id={id}></AddTime>
      <ReactPaginate
        className="pagination"
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}
