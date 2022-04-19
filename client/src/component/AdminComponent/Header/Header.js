import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));

const Header = () => {



  const navigate = useNavigate()
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  } 


  function dashbord(){
    navigate('/admin/home')
  }

  function buscompany(){
    navigate('/admin/buscompany')
  }

  function usermanagment(){
    navigate('/admin/usermanagment')
  }

  function report(){
    navigate("/admin/report")
  }

  function banner(){
    navigate("/admin/banner")
  }

  function coupen(){
    navigate('/admin/coupen')
  }

  function logout(){
    localStorage.removeItem("admintoken")
    navigate('/admin')
  }

  useEffect(()=>{
    let admintoken = localStorage.getItem('admintoken')
    if(admintoken === null){
      navigate("/admin")
    }
  })
  
const drawer = (
    <div>
      <List>
          <ListItem button onClick={dashbord}>
            <ListItemText>
            DASHBORD
            </ListItemText>
          </ListItem>

          <ListItem button onClick={banner}>
            <ListItemText>
            BANNER MANAGMENT
            </ListItemText>
          </ListItem>

          <ListItem button onClick={coupen}>
            <ListItemText>
            COUPEN MANAGMENT
            </ListItemText>
          </ListItem>

          <ListItem button onClick={buscompany}>
            <ListItemText>
            BUS COMPANY
            </ListItemText>
          </ListItem>

          <ListItem button onClick={usermanagment}>
            <ListItemText>
            USER MANAGMENT
            </ListItemText>
          </ListItem>

          <ListItem button onClick={report}>
            <ListItemText>
            REPORT
            </ListItemText>
          </ListItem>  
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap >
          ADMIN PANEL
        </Typography>
        <Button sx={{ml:'85%'}} variant="contained" onClick={logout}>LOGOUT</Button>
      </Toolbar>
     
    </AppBar>
    
    <nav className={classes.drawer}>
      
      
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
            <CloseIcon/>
          </IconButton>
          {drawer}
        </Drawer>
      </Hidden>
       <Hidden xsDown implementation="css">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          {drawer}
        </Drawer>  
      </Hidden>
    </nav>
    <div className={classes.content}>
      <div className={classes.toolbar} />
    </div>
  </div>
);
}
Header.propTypes = {
// Injected by the documentation to work in an iframe.
// You won't need it on your project.
container: PropTypes.object,
};

export default Header