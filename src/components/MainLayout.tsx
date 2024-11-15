import {
  Avatar,
  Box,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  ThemeProvider,
  Typography,
} from "@mui/material";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InventoryIcon from "@mui/icons-material/Inventory";
import LanguageIcon from "@mui/icons-material/Language";
import VillaIcon from "@mui/icons-material/Villa";
import getTheme from "../theme/theme";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
export const MainLayout = () => {
  const [active, setActive] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("light");
  // const [search, setSearch] = useState("");

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light"? "dark" : "light"));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    navigate("/login");
  };

  const togglefullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const theme = getTheme(mode as "light" | "dark");

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            variant: "dense",
            display: "flex",
          }}
        >
          <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
            <Box display={"flex"} alignItems={"center"}>
              <IconButton
                size="large"
                color="inherit"
                edge="start"
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box display={"flex"}>
              <Paper
                elevation={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  
                  height: "28px",
                  margin:4,
                  width: "190px",
                }}
              >
                <Input
                  placeholder="Search..."
                  disableUnderline
                  startAdornment={
                    <InputAdornment position="start" sx={{color: mode === "dark" ? "black" : "grey.600",}}>
                      <SearchIcon />
                    </InputAdornment>
                  }
                  sx={{
                    px: 4,
                    color: mode === "dark" ? "black" : "text.primary",
                    backgroundColor:"white",
                    borderRadius:1,
                    fontStyle: "italic",
                  }}
                ></Input>
              </Paper>
              <IconButton color="inherit" onClick={toggleMode}>
                {mode === "light" ? < DarkModeIcon/> : < LightModeIcon/>}
              </IconButton>
              <IconButton color="inherit"
              onClick={togglefullscreen}>
                <FullscreenIcon />
              </IconButton>

              <IconButton color="inherit" onClick={handleClick}>
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
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          open={openSidebar}
          onClose={() => setOpenSidebar(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 230,
              boxSizing: "border-box",
              pt: 20,
            },
          }}
        >
          <Box sx={{ m: 5 }}>
            <Avatar
              sx={{
                bgcolor: deepOrange[500],
                height: "25px",
                width: "25px",
                p: 1,
                margin: "auto",
              }}
            >
              VS
            </Avatar>
            <Typography fontSize={"13px"} mt={2} align="center" color={mode=="dark" ? "white" : "black"}>
              Last Visited
            </Typography>
            <Typography fontSize={"13px"} align="center" color={mode=="dark" ? "white" : "black"}>
              Sat 22 Dec 2024
            </Typography>
          </Box>
          <Divider />

          <List disablePadding>
            <ListItemButton
              sx={{
                backgroundColor:
                  active === "dashboard" ? "grey.200" : "transparent",
                "&:hover": {
                  backgroundColor: "grey.200",
                  color: "black",
                  "& .MuiIconButton-root": {
                    color: "black", // Changes icon color when ListItemButton is hovered
                  },
                },
                color: active === "dashboard" ? "black" : "grey.600",
              }}
              onClick={() => {
                setActive("dashboard");
                setOpenSidebar(false);
                navigate("/");
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40, // Reduces default space between icon and text
                }}
              >
                <DashboardIcon sx={{ fontSize: "20px" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <Divider />
            <ListItemButton
              sx={{
                backgroundColor:
                  active === "master" ? "grey.200" : "transparent",
                "&:hover": {
                  backgroundColor: "grey.200",
                  color: "black",
                  "& .MuiIconButton-root": {
                    color: "black", // Changes icon color when ListItemButton is hovered
                  },
                },

                color: active === "master" ? "black" : "grey.600",
              }}
              onClick={() => {
                setActive("master");
                setOpen(!open);
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40, // Reduces default space between icon and text
                }}
              >
                <InventoryIcon sx={{ fontSize: "19px" }} />
              </ListItemIcon>
              <ListItemText primary="Master" />
              {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            {/* <Divider/> */}

            <Collapse in={open}>
              <List disablePadding>
                <ListItemButton
                  onClick={() => {
                    setOpenSidebar(false);
                    setOpen(false);
                    navigate("/country");
                  }}
                  sx={{ px: 15 }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40, // Reduces default space between icon and text
                    }}
                  >
                    <LanguageIcon sx={{ fontSize: "19px" }} />
                  </ListItemIcon>
                  <ListItemText primary="Country Master"></ListItemText>
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setOpenSidebar(false);
                    setOpen(false);
                    navigate("/state");
                  }}
                  sx={{ px: 15 }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40, // Reduces default space between icon and text
                    }}
                  >
                    <CorporateFareIcon sx={{ fontSize: "19px" }} />
                  </ListItemIcon>
                  <ListItemText primary="State Master"></ListItemText>
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setOpenSidebar(false);
                    setOpen(false);
                    navigate("/district");
                  }}
                  sx={{ px: 15 }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40, // Reduces default space between icon and text
                    }}
                  >
                    <VillaIcon sx={{ fontSize: "19px" }} />
                  </ListItemIcon>
                  <ListItemText primary="District Master"></ListItemText>
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Drawer>
        <Container>
          <Toolbar variant="dense" />
          <Outlet />
        </Container>
      </ThemeProvider>
    </>
  );
};
