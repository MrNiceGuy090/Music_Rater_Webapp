import React, { useState  } from 'react';
import { useDispatch  } from 'react-redux';
import { signin } from '../../store/actions/authActions';
import { setError, setSuccess } from '../../store/actions/alertActions';

import { useNavigate } from 'react-router-dom';
import { Alert, Button, TextField, FormControlLabel, Checkbox, Typography, Container} from '@mui/material';
import Loader from '../Loader';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ signInError, setSignInError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    dispatch( signin({ email, password }, 
      () =>{
        navigate('/profile');
      },
      (error) => { 
        setLoading(false) ;
        setSignInError(error);
        
      }));
  }

  return (
      <Container maxWidth="xs">
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Container component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {signInError && <Alert severity="error">{signInError}</Alert>}
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br></br>
            <br></br>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br></br>
            <br></br>
            { !loading ?
              <Button
              type="submit"
              fullWidth
              variant="contained"
              >
              Sign In
              </Button> :
              <Loader/>
            }
          </Container>
      </Container>
  );
}