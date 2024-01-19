import React, { useState } from 'react';
import Roboimg from "../../assets/robot2.webp"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsEyeFill } from 'react-icons/bs';
import { BsEyeSlashFill } from 'react-icons/bs';




const LoginForm = () => {
  const [check, setCheck] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = "9ffbceda69ff903370209d5029c4416b4890df44f9c19962430765595735a57d";
        const navigate = useNavigate();
        const [err, setErr] = useState("")
        const [changePassword, setChangePassword] = useState(true);

        function handlePassword() {
            if(changePassword == true){
              setChangePassword(false)
            }
           if(changePassword == false) {
            setChangePassword(true)
           }
        }

    const handleLogin = async (e) => { 
  e.preventDefault()
  function callCheck(){
    setCheck(true);
    setTimeout(() => {
      setCheck(false);
    }, 3000);
  }
      try {
        callCheck()
        const response = await axios.post('https://adotadvisor-u4zq.vercel.app/api/login', {
          username,
          password,
        });
  
        const { success } = response.data;
      if (success) {
        localStorage.setItem('adotadvisortoken', token);
        navigate("/user")
        setErr(success)
        console.log('Login successful. Token:');
      } else {
        console.error('Login failed:', response.data.message);
 setErr(response.data.message)
      }
    } 

    catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className='form'>
    <div>
        <img src={Roboimg}/>
    </div>
    <form onSubmit={handleLogin}>
    <p>Login</p> 
    <div className='green'>{check == true ? "checking your details....." : ""}</div>
    <div className='error'>{err} </div>
      <label for="username">
        Username:
        </label>
        <input type="text" id='username' value={username} onChange={(e) => {
          setErr("")
          setUsername(e.target.value)}} />
      <br />
      <label for="password">
        Password:
         </label>
         <div className='pwd-input-icons'>
          <div className='pwd-icons' onClick={handlePassword}> {changePassword ? <BsEyeFill className='eye'/> : <BsEyeSlashFill className='eye'/>}</div>
                 <input className='pwd-input-field' type={changePassword ? "password" : "text"} id='password' value={password} onChange={(e) => {
                  setErr("")
                  setPassword(e.target.value)}
                  } />        

         </div>
      <br />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default LoginForm;
