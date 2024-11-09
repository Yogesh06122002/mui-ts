import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleIcon from "@mui/icons-material/Article";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

// const demoTheme = extendTheme({
//   colorSchemes:{
//     dark:true,
//     light:true
//   }
// })

export const Appbar = () => {
  const [active, setActive] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <>
      <Box>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          color="primary"
        >
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
            <Typography variant="h6"> Garments</Typography>

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
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    logout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 200,
              boxSizing: "border-box",
              pt: 6,
              bgcolor: "grey.100",
            },
          }}
        >
          <List sx={{ p: 1 }}>
            {[
              { name: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
              { name: "Orders", icon: <ListAltRoundedIcon fontSize="small" /> },
              { name: "Products", icon: <InventoryIcon fontSize="small" /> },
              { name: "Customers", icon: <PersonIcon fontSize="small" /> },
              { name: "Reports", icon: <ArticleIcon fontSize="small" /> },
            ].map((item) => (
              <ListItemButton
                key={item.name}
                sx={{
                  backgroundColor:
                    active.toLowerCase() === item.name.toLowerCase()
                      ? "grey.300"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "grey.300",
                    color: "black",
                    "& .MuiIconButton-root": {
                      color: "black", // Changes icon color when ListItemButton is hovered
                    },
                  },
                  color:
                    active.toLowerCase() === item.name.toLowerCase()
                      ? "black"
                      : "grey.600",
                  borderRadius: 1,
                  mb: 1,
                }}
                onClick={() => {
                  setActive(item.name);
                  setOpenSidebar(false);
                }}
              >
                <IconButton
                  sx={{
                    color:
                      active.toLowerCase() === item.name.toLowerCase()
                        ? "black"
                        : "grey.600",
                  }}
                >
                  {item.icon}
                </IconButton>
                <ListItemText primary={item.name} sx={{ ml: 1 }} />
              </ListItemButton>
            ))}
          </List>

          <Button
            sx={{ marginBottom: 2, mt: 16, marginX: 2 }}
            variant="contained"
            onClick={logout}
          >
            Logout
            <IconButton
              color="inherit"
              size="small"
              sx={{
                marginLeft: "5px",
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Button>
        </Drawer>
      </Box>
    </>
  );
};
