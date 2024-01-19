import './App.css';
import { useEffect } from 'react';
import Home from './components/home';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import SignupForm from './components/forms/signup';
import LoginForm from './components/forms/login';
import User from './components/user/user';

function App() {

  useEffect(()=>{
      setTimeout(() => {
        localStorage.removeItem('adotadvisortoken');
      }, 600000);
    }
  )
  return (
    <div className="App">
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/signup' element={<SignupForm/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/user" element={<User/>}/>
    </Routes>
<Footer/>
    </div>
  );
}

export default App;
