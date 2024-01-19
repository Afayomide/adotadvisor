import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './form.css';
import Roboimg from '../../assets/robot2.webp';
import { BsEyeFill } from 'react-icons/bs';
import { BsEyeSlashFill } from 'react-icons/bs';

const SignupForm = () => {
  const[check, setCheck] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
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
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    function callCheck(){
      setCheck(true);
      setTimeout(() => {
        setCheck(false);
      }, 3000);
    }

    const serverUrl = 'https://adotadvisor-u4zq.vercel.app/api/signup';

    try {
      callCheck()
      const response = await axios.post(serverUrl, {
        fullname,
        username,
        email,
        password,
      });

      const {success} = response.data;

      if (success) {
        navigate('/login');
        setErr(response.data.message)
      } else {
        console.error(response.data.message);
        setErr(response.data.message)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='form'>
      <div>
        <img src={Roboimg} alt="robot" />
      </div>
      <form onSubmit={handleSignup}>
        <p>Signup</p>
        <div className='green'>{check == true ? "checking your details....." : ""}</div>
        <div className='error'>
                {err} 
        </div>
        <label htmlFor="username">
          Username:
        </label>
        <input type="text" id='username' value={username} onChange={(e) => {
          setErr("")
          setUsername(e.target.value)}} />
      
        <br />
        <label htmlFor="password">
          Password:
        </label>
        {/* <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} /> */}
    
        <br />
        <label htmlFor="fullname">
          Fullname:
        </label>
        <input type="text" id="fullname" value={fullname} onChange={(e) => {
          setErr("")
          setFullname(e.target.value)}} />
        
        <br />
        <label htmlFor="email">
          Email:
        </label>
        <input type="email" id='email' value={email} onChange={(e) => {
          setErr("")
          setEmail(e.target.value)}} />
        
        <br />    
        <div className='input-icons'>
          <div className='icons' onClick={handlePassword}>  {changePassword ? <BsEyeFill className='eye'/> : <BsEyeSlashFill className='eye'/>}</div>
                 <input className='input-field' type={changePassword ? "password" : "text"} id='password' value={password} onChange={(e) => {
                  setErr("")
                  setPassword(e.target.value)}} />        

         </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
