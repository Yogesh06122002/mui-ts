import { Outlet } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Box } from "@mui/material";

export const Layout = () => {
  return (
    <>
      <Appbar />
      <Box sx={{
        mt:6
      }}>
        <Outlet />
      </Box>
    </>
  );
};
