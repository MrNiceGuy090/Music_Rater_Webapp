import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import PrivateRoute from "./components/auth/PrivateRoute"
import Profile from "./components/pages/Profile"

import { Container, Alert, Box } from '@mui/material'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import LandingPage from './components/pages/LandingPage'

import './App.css';

import { RootState } from './store';
import { setSuccess } from './store/actions/authActions';

function App() {
  const { user, authenticated, loading, error, success } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  // dispaly success message only once
  useEffect(() => {
    return () => {
      if(success){
        dispatch(setSuccess(''));
      }
    }
}, [])
  
  if(loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth = {false} disableGutters>
      <BrowserRouter>
        <Navbar></Navbar>
        {success && <Alert severity="success">{success}</Alert>}
        <Box sx={{m:"30px", mt:"50px"}}>
          <Routes>
            <Route path="/" element={
              <LandingPage/>
            }/>
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>
              } />
            <Route path="/signUp" element={<SignUp/>} />
            <Route path="/signIn" element={<SignIn/>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Container>
  );
}

export default App;
