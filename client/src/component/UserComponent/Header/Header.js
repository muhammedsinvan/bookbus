import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const pages = ["My Bookings", "Contact Us"];

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

  const navigate = useNavigate();

  function logins() {
    navigate("/login");
  }

  const [login, setlogin] = React.useState(false);

  React.useEffect(() => {
    let usertoken = localStorage.getItem("usertoken");
    if (!usertoken) {
      setlogin(true);
    }
  });

  function logout() {
    localStorage.removeItem("usertoken");
    localStorage.removeItem("userid");
    localStorage.removeItem("reservedSeats");
    navigate("/");
  }

  function profile() {
    navigate("/profile");
  }

  function homes() {
    navigate("/");
  }

  function mybookings() {
    navigate("/mybookings");
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <img onClick={homes} className="logo" src="/favicon.ico" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="warning"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Button onClick={mybookings}>
                    <Typography textAlign="center">{page}</Typography>
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <img className="logo" src="/favicon.ico"></img>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "black", display: "block" }}
              onClick={mybookings}
            >
              MY BOOKINGS
            </Button>
          </Box>

          {/* Contact us */}
          <Box
            sx={{ flexGrow: 1, mr: 120, display: { xs: "none", md: "flex" } }}
          >
            <Button
              onClick={handleCloseNavMenu}
              sx={{ color: "black", display: "block" }}
            >
              CONTACT US
            </Button>
          </Box>
          {login ? null : (
            <Avatar
              onClick={profile}
              type="button"
              sx={{ mr: 5, cursor: "pointer" }}
            />
          )}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {login ? (
                  <Button variant="contained" onClick={logins}>
                    login
                  </Button>
                ) : (
                  <Button variant="contained" onClick={logout}>
                    Logout
                  </Button>
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
