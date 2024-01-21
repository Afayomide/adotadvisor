import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Table from './table';
import "./user.css"
import Tolerance from './tolerance';


function User({token, onLogout}){
    const [authenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState('');
   const [name, setName] = useState("") 
      const navigate = useNavigate()
    

    const handleLogout = () => {
        // Clear the token from localStorage (or sessionStorage)
        localStorage.removeItem('adotadvisortoken');
        setAuthenticated(false);
          navigate("/login")
                
        if (onLogout) {
            onLogout();
          }
      };

      useEffect(() => {
        const storedToken = localStorage.getItem('adotadvisortoken');
    
        if (storedToken) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          navigate('/');
        }
      });
    
      
    useEffect(() => {
      const fetchData = async () => {
        try {           
         const username = localStorage.getItem('username');
          const response = await axios.get('https://adotadvisor-u4zq.vercel.app/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
            setName(username);
        } 
        catch (error) {
          console.error('Error:', error);
          setMessage('Error fetching data');
        }
      };

      fetchData();
    },[]);


    return (
        <div>
        {authenticated ? (
      <div className='user-container'>
      <div className='welcome-logout'>
        <h1>Welcome <span className='green-name'>{name}</span></h1>
        <button onClick={handleLogout}>Logout</button>
       </div>
        <Tolerance username = {name}/>
      
      </div>)  :
      <div className='noContent'>
        <p>Dear Employer, Please Login to get access to this content</p>
        </div>
        }
        </div>
    );
  };


export default User