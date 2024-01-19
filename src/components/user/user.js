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
          // You may want to redirect the user or perform other actions upon logout
                
        // Call the onLogout callback to update the authentication state
        if (onLogout) {
            onLogout();
          }
      };

      useEffect(() => {
        // Check if the user is authenticated using the token stored in localStorage
        const storedToken = localStorage.getItem('adotadvisortoken');
    
        if (storedToken) {
          // You can verify the token on the client side if needed
          setAuthenticated(true);
          // Fetch additional user information if required
        } else {
          setAuthenticated(false);
          navigate('/');
        }
      }, [navigate]);
    
      
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://adotadvisor-u4zq.vercel.app/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setMessage(response.data.message); 
          setName(response.data.name);
        } 
        catch (error) {
          console.error('Error:', error);
          setMessage('Error fetching data');
        }
      };

      fetchData();
    });


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