import React from 'react';

import { Container, Avatar, Typography, Box, Button, Stack, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MediaRater from '../audio/MediaRater';

const Profile = () => {
  
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '12px'

  }));



  return(
    <Paper variant="elevation" 
    sx={{ width:"60%", margin:"20%", marginTop:"50px", padding:'35px', display:'flex' }} >
      <Box>
      <Avatar
        alt="Remy Sharp"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        sx={{ width: 200, height: 200, padding:'35px' }}
        
      />
      <Button>Change image</Button>
      </Box>
      <Box>
        <Typography variant="h4" color="secondary.contrastText" sx={{ m: 2 }} >Name Last name</Typography>
        <Divider/>
        <Typography variant="body2" color="secondary.contrastText" sx={{ m: 2 }}>Email: hehehar@gma.ocl</Typography>
        <Typography variant="h6" color="secondary.contrastText" sx={{ m: 2 }}>Credits: 0</Typography>
        <Stack direction="row" spacing={2} sx={{ m: 2 }}>
          <Typography variant="h6" color="secondary.contrastText" >Prefered genres: </Typography>
          <Item>Rockasdasd 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
        <Button sx={{ m: 1 }}>Edit</Button>
      </Box>
    </Paper>

  );
}

export default Profile;