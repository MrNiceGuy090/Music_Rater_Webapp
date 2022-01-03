import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup, setError } from '../../store/actions/authActions';
import { useNavigate } from 'react-router-dom';

import { Alert, Button, TextField, FormControlLabel, Checkbox, Typography, Container } from '@mui/material';
import Loader from '../Loader';

export default function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signup({ firstName, email, password }, 
      () => {
        navigate('/signIn');
      },
      (error) => {
        dispatch(setError('SignUp error: ' + error));
        console.log(error);
        setSignUpError(error);
        setLoading(false);
      }));
  }

  return (
      <Container maxWidth="xs">
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Container component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
          {signUpError && <Alert severity="error">{signUpError}</Alert>}
          <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            { !loading ?
              <Button
              type="submit"
              fullWidth
              variant="contained"
              >
              Sign Up
              </Button> :
              <Loader/>
            }
          </Container>
      </Container>
  );
}