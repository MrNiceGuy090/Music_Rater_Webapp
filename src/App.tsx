import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import PrivateRoute from "./components/auth/PrivateRoute"
import Profile from "./components/pages/Profile"
import Uploader from "./components/pages/Uploader"
import Discover from "./components/pages/Discover"

import { Container, Alert, Box } from '@mui/material'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import LandingPage from './components/pages/LandingPage'

import './App.css';

import { RootState } from './store';
import Ratings from './components/pages/Ratings';

function App() {
  const { success, error } = useSelector((state: RootState) => state.alert);
  const { loading } = useSelector((state: RootState) => state.auth);

  if(loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth = {false} disableGutters>
      <BrowserRouter>
        <Navbar></Navbar>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
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
            <Route path="/upload" element={
              <PrivateRoute>
                <Uploader/>
              </PrivateRoute>} />
            <Route path="/discover" element={
              <PrivateRoute>
                <Discover/>
              </PrivateRoute>} />            
            <Route path="/ratings" element={
              <PrivateRoute>
                <Ratings/>
              </PrivateRoute>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Container>
  );
}

export default App;
