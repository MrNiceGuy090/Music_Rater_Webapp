import React, { useState  } from 'react';
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import PrivateRoute from "./components/auth/PrivateRoute"
import Profile from "./components/user/Profile"

import { Container, Alert } from '@mui/material'
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { RootState } from './store';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';

function App() {
  const { loading, error, success } = useSelector((state: RootState) => state.auth);

  if(loading) {
    return <Loader />;
  }

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Container>
              <SignIn/>
              <SignUp/>
            </Container>
            } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
            } />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/signIn" element={<SignIn/>} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
