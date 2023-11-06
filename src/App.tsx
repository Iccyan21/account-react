import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp  from './accounts/signup';
import Login  from './accounts/login';
import Profile from "./accounts/profile";
import UserUpdate from './accounts/update';
import Delete from './accounts/delete';

function App() {
  return (
    <div className="App">
       <BrowserRouter basename='/'>
          <Routes>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/update/:user_id" element={<UserUpdate />} />
            <Route path="/delete/:user_id" element={<Delete />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
