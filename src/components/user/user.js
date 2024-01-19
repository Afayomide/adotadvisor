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
        localStorage.removeItem('token');
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
        const storedToken = localStorage.getItem('token');
    
        if (storedToken) {
          // You can verify the token on the client side if needed
          setAuthenticated(true);
          // Fetch additional user information if required
          setName("John Doe"); // Replace with actual user info fetch
        } else {
          setAuthenticated(false);
          navigate('/');
        }
      }, [navigate]);
    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          setMessage(response.data.message);
          setName(response.data.name)
        } catch (error) {
          console.error('Error:', error);
          setMessage('Error fetching data');
        }
      };
  
      fetchData();
    }, [token]);


    return (
        <div>
        {authenticated ? (
      <div className='user-container'>
        <h1>Welcome {name}</h1>
        <p>{token}</p>
        <button onClick={handleLogout}>Logout</button>
       
        <Tolerance/>
      
      </div>)  :
      <div className='noContent'>
        <p>Dear Employer, Please Login to get access to this content</p>
        </div>
        }
        </div>
    );
  };


export default User