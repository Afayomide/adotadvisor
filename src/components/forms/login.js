import React, { useState } from 'react';
import Roboimg from "../../assets/robot2.webp"
import axios from 'axios';
import { useNavigate } from "react-router-dom";





const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = "9ffbceda69ff903370209d5029c4416b4890df44f9c19962430765595735a57d";
        const navigate = useNavigate();
        const [err, setErr] = useState("")


    const handleLogin = async (e) => { 
  e.preventDefault()
      try {
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
    <div className='error'>{err}</div>
      <label for="username">
        Username:
        </label>
        <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      
      <br />
      <label for="password">
        Password:
         </label>
        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button type="submit">Login</button>
    </form>
    </div>
  );
};

export default LoginForm;
