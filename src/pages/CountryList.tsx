import {
  Button,
  Card,
  Divider,
  Input,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CardHeader,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { deepOrange } from "@mui/material/colors";

export const CountryList = () => {
  const createData = (
    countryName: string,
    countryCode: number,
    active: boolean,
    sn: number
  ) => {
    return { countryName, countryCode, active, sn };
  };

  const rows = [
    createData("USA", 1, true, 1),
    createData("India", 91, false, 2),
    createData("China", 86, false, 3),
    createData("Russia", 7, true, 4),
    createData("Japan", 81, false, 5),
    createData("Germany", 49, false, 6),
    createData("United Kingdom", 44, false, 7),
    createData("Brazil", 55, false, 8),
    createData("France", 33, false, 9),
    createData("Canada", 1, false, 10),
    createData("Australia", 61, false, 11),
    createData("Italy", 39, false, 12),
  ];

  return (
    <>
      <Card variant="outlined" elevation={10}>
        <CardHeader
        avatar={ <Avatar sx={{bgcolor:deepOrange[400]}}>CM</Avatar>}
        title="Country Master"
        subheader="Create a new country"
        action={<Button variant="contained" color="warning">Create</Button>}
        />
        <Divider />
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            alignItems: "center",
            height: "32px",
            width: "200px",
            margin: 2,
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
              px: 1,
              color: "text.primary",
              fontStyle: "italic",
            }}
          ></Input>
        </Paper>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">S/N</TableCell>
                <TableCell align="center">Country Name</TableCell>
                <TableCell align="center">Country Code</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {rows.map((row) => (
                <TableRow
                  key={row.sn}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ py: 0.1 }} align="center">
                    {row.sn}
                  </TableCell>
                  <TableCell sx={{ py: 0.1 }} align="center">
                    {row.countryName}
                  </TableCell>
                  <TableCell sx={{ py: 0.1 }} align="center">
                    {row.countryCode}
                  </TableCell>
                  <TableCell sx={{ py: 0.1 }} align="center">
                    {row.active ? "Yes" : "No"}
                  </TableCell>
                  <TableCell sx={{ py: 0.1 }} align="center" >
                    <IconButton sx={{mr:2}}>
                      <ModeEditOutlineIcon sx={{ fontSize: "18px"}} />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};
