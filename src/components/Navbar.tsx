import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector, useDispatch  } from 'react-redux';
import { RootState } from '../store';
import { signout } from '../store/actions/authActions';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
  const auth: any = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    dispatch(signout());
  }

  return (
    <AppBar position="static">
      <Container maxWidth = {false} disableGutters >
        <Toolbar >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            MusicRater
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link onClick={handleCloseNavMenu} to="/upload" style={{ textDecoration: 'none' }}> 
                <MenuItem key='upload'>
                  <Typography textAlign="center">Upload</Typography>
                </MenuItem>
              </Link>
              <Link onClick={handleCloseNavMenu} to="/discover" style={{ textDecoration: 'none' }}> 
                <MenuItem key='discover'>
                  <Typography textAlign="center">Discover</Typography>
                </MenuItem>
              </Link>              
              <Link onClick={handleCloseNavMenu} to="/ratings" style={{ textDecoration: 'none' }}> 
                <MenuItem key='ratings'>
                  <Typography textAlign="center">Ratings</Typography>
                </MenuItem>
              </Link>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            MusicRater
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link onClick={handleCloseNavMenu} to="/upload" style={{ textDecoration: 'none' }}> 
                <Button key='upload' sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Typography textAlign="center">Upload</Typography>
                </Button>
              </Link>
              <Link onClick={handleCloseNavMenu} to="/discover" style={{ textDecoration: 'none' }}> 
                <Button key='discover' sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Typography textAlign="center">Discover</Typography>
                </Button>
              </Link>              
              <Link onClick={handleCloseNavMenu} to="/ratings" style={{ textDecoration: 'none' }}> 
                <Button key='ratings' sx={{ my: 2, color: 'white', display: 'block' }}>
                  <Typography textAlign="center">Ratings</Typography>
                </Button>
              </Link>
          </Box>

         { auth.authenticated ? 
         <Toolbar>
          <Typography 
            noWrap
            sx={{ mr: 10}}
          >
              Credits: {auth.user.credits}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Profile picture" src={auth.user.profileImage} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <Link onClick={handleCloseNavMenu} to="/profile" style={{ textDecoration: 'none' }}> 
                    <MenuItem  >
                        <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                </Link>
                <Link onClick={signOut} to="/" style={{ textDecoration: 'none' }}>
                    <MenuItem >
                        <Typography textAlign="center">Sign out</Typography>
                    </MenuItem>
                </Link>
             
            </Menu>
          </Box>
          </Toolbar>
            : null
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;