import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Loader from './Components/Loader/Loader';
import Login from './Components/Login/Login';
import NavBar from './Components/NavBar/NavBar';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import UserPage from './Components/UserList/UserPage';
import UserProfile from './Components/UserProfile/UserProfile';
import  Cookies  from 'react-cookies';
import MyProfile from './Components/MyProfile/MyProfile';
import { ToastContainer } from 'react-toastify';
import Forget from './Components/ForgetPassword/Forget';
import Reset from './Components/ResetPassword/Reset';
import Messages from './Components/Messages/Messages';

function App() {

  const [user, setUser] = useState(Cookies.load("token"));
  const [users,setUsers] = useState([]);
  const [Loading , setLoading] = useState(true);


  const getUsers = async ()=>{
    const result =await axios.get("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers",
    );

    setLoading(false);
    setUsers(result.data);
  };

  useEffect(()=>{
    getUsers();
  },[]);
 
  useEffect(()=>{
console.log(user);
  },[user]);
 
  return (
    
    <>
    
    <NavBar user={user} setUser={setUser} />
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

    {Loading ? (
      <Loader />

    ) : (
      <Routes>
      {user ? (
        <>
               
               <Route path="/Messages" element={<Messages />}></Route>

         </>

      )  : (

      
      <> 
       <Route path="/Login" element={<Login logUser={setUser} />}></Route>
       <Route path="/Register" element={<Register />}></Route>
       <Route path="/forget-password" element={<Forget />}></Route>
       <Route path="/reset-code" element={<Reset />}></Route>

       <Route path="/" element={<Home />}></Route>

       </>
      )}
     
      <Route path="/ListUsers" element={<UserPage users={users} />}></Route>
      <Route path="/user/:id" element={<UserProfile users={users}/>}></Route>

      <Route path="/Home" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>

    )  }
    
    
    


    
    </>
  );
}

export default App;
