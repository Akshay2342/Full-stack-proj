import { Mail, Notifications, Pets } from "@mui/icons-material";
//import { Carousel } from 'react-responsive-carousel';
//import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  Button,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountBox,
  Article,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from "@mui/material";
import React, { useState,useContext } from "react";
import {Link} from 'react-router-dom'
import { AuthContext } from "../context/authContext";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));



const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  return (
    <>
    <AppBar position="sticky" sx={{marginRight : 5}}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          EDUSPHERE
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem><Button component={Link} to="/login">Login</Button></MenuItem>
      </Menu>
    </AppBar>
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "flex" } }}>
      <Box position="fixed">
        <List>
        <ListItem disablePadding>
    <ListItemButton component={Link} to="/view_courses">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Courses" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="/upload_course">
      <ListItemIcon>
        <Article />
      </ListItemIcon>
      <ListItemText primary="Upload Course" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="/view_blog">
      <ListItemIcon>
        <Group />
      </ListItemIcon>
      <ListItemText primary="Blog" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="/upload_blog">
      <ListItemIcon>
        <Storefront />
      </ListItemIcon>
      <ListItemText primary="Upload Blog" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="/view_book">
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="Book" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="/upload_book">
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Upload Book" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="/view_test">
      <ListItemIcon>
        <Settings />
      </ListItemIcon>
      <ListItemText primary="Test" />
    </ListItemButton>
  </ListItem>
  <ListItem disablePadding>
    <ListItemButton component={Link} to="/upload_test">
      <ListItemIcon>
        <AccountBox />
      </ListItemIcon>
      <ListItemText primary="Upload Test" />
    </ListItemButton>
  </ListItem>
        </List>
      </Box>
     
    </Box>
    </>
  );
};

export default Home;