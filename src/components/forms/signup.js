import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './form.css';
import Roboimg from '../../assets/robot2.webp';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [err, setErr] = useState("")
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const serverUrl = 'https://adotadvisor-u4zq.vercel.app/api/signup';

    try {
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
        {err}
        <label htmlFor="username">
          Username:
        </label>
        <input type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
      
        <br />
        <label htmlFor="password">
          Password:
        </label>
        <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <br />
        <label htmlFor="fullname">
          Fullname:
        </label>
        <input type="text" id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} />
        
        <br />
        <label htmlFor="email">
          Email:
        </label>
        <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;
