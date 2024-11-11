import {
  Box,
  createTheme,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  ThemeProvider,
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
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

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
  // const [search, setSearch] = useState("");

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
      <ThemeProvider theme={theme}>
        <Box>
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
                <Typography variant="h6"> Garments</Typography>
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
                pt: 18,
                bgcolor: "grey.100",
              },
            }}
          >
            <List dense sx={{ px: 1 }}>
              {[
                { name: "Dashboard", icon: <DashboardIcon fontSize="small" /> },
                {
                  name: "Orders",
                  icon: <ListAltRoundedIcon fontSize="small" />,
                },
                { name: "Products", icon: <InventoryIcon fontSize="small" /> },
                { name: "Customers", icon: <PersonIcon fontSize="small" /> },
                { name: "Reports", icon: <ArticleIcon fontSize="small" /> },
              ].map((item) => (
                <ListItem
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
                    mb: 1,

                    color:
                      active.toLowerCase() === item.name.toLowerCase()
                        ? "black"
                        : "grey.600",
                    borderRadius: 1,

                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setActive(item.name);
                    setOpenSidebar(false);
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} sx={{ ml: 1 }} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
      </ThemeProvider>
    </>
  );
};
