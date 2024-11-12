import {
  Avatar,
  Box,
  Collapse,
  createTheme,
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
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InventoryIcon from '@mui/icons-material/Inventory';

const theme = createTheme({
  palette: {
    primary: {
      main: "#008080",
    },
    secondary: {
      main: "#008080",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#008080",
          height: "40px",
        },
      },
    },
    MuiToolbar: {
      defaultProps: {},
      styleOverrides: {
        root: {
          minHeight: "40px",
        },
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {},
      },
    },
  },
  spacing: 2,
});

export const Appbar = () => {
  const [active, setActive] = useState("dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // const [search, setSearch] = useState("");

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Box >
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
              variant: "dense",
              display: "flex",
            }}
            color="primary"
          >
            <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
              <Box display={"flex"} alignItems={"center"}>
                <IconButton
                  size="large"
                  color="inherit"
                  edge="start"
                  sx={{ mr: 2 }}
                  onClick={toggleSidebar}
                >
                  <MenuIcon />
                </IconButton>
                <Avatar
                  sx={{
                    bgcolor: deepOrange[500],
                    height: "25px",
                    width: "25px",
                    p: 1,
                    
                  }}
                >
                  VS
                </Avatar>
              </Box>
              <Box display={"flex"} mr={4}>
                <Paper
                  elevation={8}
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    height: "28px",
                    margin: "auto",
                    width: "180px",
                  }}
                >
                  <Input
                    placeholder="Search..."
                    disableUnderline
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    sx={{
                      px: 4,
                      color: "text.primary",
                      fontStyle: "italic",
                    }}
                  ></Input>
                </Paper>

                <IconButton
                  color="inherit"
                  size="large"
                  edge="end"
                  sx={{
                    ml: 2,
                  }}
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

                  <MenuItem onClick={() => setAnchorEl(null)}>
                    Dashboard
                  </MenuItem>
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
            anchor="left"
            open={openSidebar}
            onClose={() => setOpenSidebar(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: 200,
                boxSizing: "border-box",
                mt: 20,
                bgcolor: "grey.100",
              },
            }}
          >
            <Box sx={{ mt: 10, pb: 10 }}>
              <Typography fontSize={"small"} align="center" color="initial">
                Last Visited
              </Typography>
              <Typography fontSize={"small"} align="center" color="initial">
                Sat 22 Dec 2024
              </Typography>
            </Box>
            <Divider/>

            <List dense sx={{ px: 1 }}>
              <ListItemButton
                
                sx={{
                  backgroundColor:
                    active === "dashboard" ? "grey.300" : "transparent",
                  "&:hover": {
                    backgroundColor: "grey.300",
                    color: "black",
                    "& .MuiIconButton-root": {
                      color: "black", // Changes icon color when ListItemButton is hovered
                    },
                  },
                  mb: 2,

                  color: active === "dashboard" ? "black" : "grey.600",
                  borderRadius: 1,
                  
                }}
                onClick={() => {
                  setActive("dashboard");
                  setOpenSidebar(false);
                  navigate("/")
                }}
              >
                <ListItemIcon>
                  <DashboardIcon sx={{fontSize:"20px"}}/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ ml: 1 }} />
              </ListItemButton>
              <ListItemButton
                sx={{
                  backgroundColor:
                    active === "master" ? "grey.300" : "transparent",
                  "&:hover": {
                    backgroundColor: "grey.300",
                    color: "black",
                    "& .MuiIconButton-root": {
                      color: "black", // Changes icon color when ListItemButton is hovered
                    },
                  },
                  mb: 1,

                  color: active === "master" ? "black" : "grey.600",
                  borderRadius: 1,
                }}
                onClick={() => {
                  setActive("master");
                  setOpen(!open);
                }}
              >
                 <ListItemIcon>
                  <InventoryIcon sx={{fontSize:"19px"}} />
                </ListItemIcon>
                <ListItemText primary="Masters" sx={{ ml: 1 }} />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>

              <Collapse in={open} >
                <List dense component="div" sx={{ mx: 4 }}>
                  <ListItemButton onClick={() => {
                    setOpenSidebar(false);
                    setOpen(false);
                    navigate("/country");
                  }}>
                    <ListItemText primary="Country Master"></ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={()=>{
                    setOpenSidebar(false);
                    setOpen(false);
                    navigate("/state");
                  }}>
                    <ListItemText primary="State Master"></ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={() =>{
                    setOpenSidebar(false);
                    setOpen(false);
                    navigate("/district");
                  }}>
                    <ListItemText primary="District Master"></ListItemText>
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Drawer>
        </Box>
      </ThemeProvider>
    </>
  );
};
