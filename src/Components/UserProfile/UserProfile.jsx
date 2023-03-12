import axios from "axios";
import React, { useState } from "react";
import Copy from "copy-to-clipboard";
import { useParams } from "react-router-dom";
import findUser from "../../utils/FindUser";
import { toast } from "react-toastify";

const UserProfile = ({users}) => {
  const  { id }= useParams();
  const [inputField, setInputField] = useState("");
  const [user , setUser] = useState(findUser(users, id))

  const onChange = (event) => {
    const {value} = event.target; 
    setInputField(value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const apiURL = `https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`;
    const result = await axios.post(apiURL,{message : inputField});
    //console.log(result);

    if(result.data.message === "success"){
        toast.success("send successfully");
    }


  };

  const shareProfile = (event, url) => {
    event.preventDefault();
    Copy(url)
  };




  return (
    <div>
      <div className="container text-center py-5 my-5 text-center">
        <div className="card py-5 mb-5">
          <a href data-toggle="modal" data-target="#profile">
            <img src="/assets/Images/avatar.png" className="avatar " alt />
          </a>
          <h3 className="py-2 text-capitalize">{user.userName}</h3>
          <div className="container w-50 m-auto">
            <form action method="post" onSubmit={submitForm}>
              <textarea
                className="form-control"
                name
                id
                cols={10}
                rows={9}
                placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"
                onChange={onChange}
                defaultValue={inputField}
              />
              <button className="btn btn-outline-info mt-3">
                <i className="far fa-paper-plane" /> Send
              </button>
            </form>
          </div>
        </div>

        
        <button
          data-toggle="modal"
          data-target="#share"
          className="btn btn-default-outline share "
          onClick={(e) => shareProfile(e, window.location)}
        >
          <i className="fas fa-share-alt" /> Share Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
