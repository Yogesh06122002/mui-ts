import {
  Box,
  
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";

// const demoTheme = extendTheme({
//   colorSchemes:{
//     dark:true,
//     light:true
//   }
// })

export const Appbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box >
        <AppBar position="fixed"  sx={{}} color="primary">
          <Toolbar variant="dense">
            <IconButton
              size="large"
              color="inherit"
              edge="start"
              sx={{ mr: 2 }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Dashboard</Typography>

            <div>
              <IconButton
                color="inherit"
                size="large"
                edge="end"
                sx={{ ml: 130 }}
                onClick={handleClick}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                open={Boolean(anchorEl)}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  dense: true,
                }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>

                <MenuItem onClick={() => setAnchorEl(null)}>Dashboard</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
         sx={{
            mt: 8,
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            }


         }}

        >
          <List>
            <ListItem  >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem  >
              <ListItemText primary="About" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
};
