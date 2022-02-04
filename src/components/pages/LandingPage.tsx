import React, {useState} from 'react';
import { Container, Grid, Typography, Rating } from '@mui/material';

import SignIn from "../auth/SignIn"
import SignUp from "../auth/SignUp"

const LandingPage = () => {
  return(
    <Grid container>
        <Grid item xs={6}>
            <Typography variant="h3">Welcome to MusicRater</Typography>
        </Grid>
        <Grid item xs={6}>
            <SignIn/>
            <br></br> 
            <br></br>
            <SignUp/>
        </Grid>
    </Grid>
  );
}

export default LandingPage; 