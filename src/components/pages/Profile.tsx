import React from 'react';

import { Avatar, Typography, Box, Button, Stack, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';
import ProfileFinalizer from './ProfileFinalizer'

const Profile = () => {
  
  const auth: any = useSelector((state: RootState) => state.auth);
  
  console.log(auth.user)
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '12px'

  }));

  return(
    auth.authenticated ? 
      auth.user.finnishedInit ?
        <Paper variant="elevation" 
        sx={{ width:"60%", margin:"20%", marginTop:"50px", padding:'35px', display:'flex' }} >
          <Box>
          <Avatar
            alt="Profile image"
            src={auth.user.profileImage}
            sx={{ width: 200, height: 200, padding:'35px' }}
            
          />
          <Button>Change image</Button>
          </Box>
          <Box>
            <Typography variant="h4" color="secondary.contrastText" sx={{ m: 2 }} >{auth.user.firstName} {auth.user.lastName} </Typography>
            <Divider/>
            <Typography variant="body2" color="secondary.contrastText" sx={{ m: 2 }}>{auth.user.email}</Typography>
            <Typography variant="h6" color="secondary.contrastText" sx={{ m: 2 }}>Credits: {auth.user.credits}</Typography>
            <Stack direction="row" spacing={2} sx={{ m: 2 }}>
              <Typography variant="h6" color="secondary.contrastText" >Prefered genres: </Typography>
              {auth.user.preferredGenres.map((val: string, i: number) => {
                return <Item key={i}>{val}</Item>
              })}
            </Stack>
            <Button sx={{ m: 1 }}>Edit</Button>
          </Box>
        </Paper>
      : <ProfileFinalizer/>
    : <Navigate to="/" />
  );
}

export default Profile;