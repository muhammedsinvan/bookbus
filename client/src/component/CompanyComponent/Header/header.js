import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import './header.css'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';




const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate=useNavigate()

  const [login,setlogin]=React.useState(false)
  
  function logins(){
    navigate("/company/login")
  }

  React.useEffect(()=>{
    let companytoken = localStorage.getItem('companytoken')
    if(!companytoken){
      setlogin(true)
      navigate("/company/login")
    }
  })

  function logout(){
    localStorage.removeItem("companytoken")
    navigate("/company/login")
  }
  return (

    <AppBar position="sticky" sx={{backgroundColor:'white'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex'  } }}
          >
          <img className='logo' src='/favicon.ico'/>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning"
            >
            </IconButton>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
             <img className='logo' src='/favicon.ico'></img>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },color:'#000' }}>
            
              <h1>Company Panel</h1>
            
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Button variant="contained" onClick={logout}>Logout</Button>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

