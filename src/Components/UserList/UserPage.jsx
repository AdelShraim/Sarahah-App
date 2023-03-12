import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pagein from "../../utils/pagein";
import Pagination from "../Pagination/Pagination";

const UserPage = ({ users }) => {

  const navigate = useNavigate();

const [results,setResults] = useState(users);
const [pageInfo,setPageInfo] = useState({
  pageNumber : 0,
  pageSize :12,

});

const searchUser = (event) => {
    const {value} = event.target;
    const arr = [];
    users.map((user) => {
        if(user.userName.toLowerCase().includes(value.toLowerCase())){
            arr.push(user);
        }
    });
    setResults(arr);
    setPageInfo({...pageInfo, pageNumber:0});

};

const changePageNumber =(page) => {
  setPageInfo({...pageInfo, pageNumber:page});
};

  return (
    <div className="container my-4">
      <input
        type="search"
        className="form-control"
        placeholder="inputField"
        aria-label="inputField"
        aria-describedby="basic-addon1"
        onChange={searchUser}
      ></input>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>
          {pagein(results,pageInfo.pageNumber,pageInfo.pageSize).map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + (pageInfo.pageNumber * pageInfo.pageSize)}</th>
              <td>{user.userName}</td>
              <td>
<button className="py-1 px-3 bg-custom text-light border-0 rounded" onClick={ ()=>navigate(`/user/${user._id}`)}>
  Send Message <i className="fa-regular fa-paper-plane" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination users={results} changePageNumber={changePageNumber} {...pageInfo}/>
    </div>
  );
};

export default UserPage;
