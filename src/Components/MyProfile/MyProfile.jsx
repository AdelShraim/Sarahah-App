import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import findUser from '../../utils/FindUser';
import styles from './styles.module.css';

const MyProfile = ({ users ,user }) => {

    const [profileUser, setProfileUser] = useState({});

    const [messages,setMessages] = useState([]);
    const tokenAPI = `tariq__${user}`;
    const getMessages = async () => {
       

        const results =await axios.get("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages" , {headers :{token:tokenAPI}},
        );
        if(results.data.messages === "success"){
            setMessages(results.data.messages);
        }
    };


    const getUser = () => {
        const decoded = jwtDecode(user);
        setProfileUser(findUser(decoded.id));
    };

    const deleteMessage = async (id) => {
        const result = await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,
        {headers: {token:tokenAPI}},
        
        );
        toast.success("deleted succesfully");
        getMessages();
    };

    useEffect(()=>{
        getUser();
        getMessages();
    },[]);



  return (
  <React.Fragment>
    <div className="container text-center py-5 my-5 text-center">
  <div className="card pt-5">
    <a href data-toggle="modal" data-target="#profile">
      <img src="/assets/Images/avater.png" className="avatar " alt />
    </a>
    <h3 className="py-2 text-capitalize">{profileUser.userName}</h3>
    <button data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
  </div>
</div>
<div className="container text-center my-5 text-center">
 {messages.length == 0 ?  (
 <div className="row">
 <div className="col-md-12">
   <div className="card py-5">
     <p>You don't have any messages... </p>
   </div>
 </div>
</div> 
  ) : (
     messages.map((message) => (
        <div className="row my-4">
 <div className="col-md-12">
   <div className="card py-5 position-relative">
     <p>{message.text}</p>
    <div className={styles.deleteBtn} onClick={deleteMessage(message._id)}><i className='fa-solid fa-trash'></i></div>
   </div>
 </div>
</div> 

     ))
 )}
</div>




  </React.Fragment>
    
  );
};

export default MyProfile