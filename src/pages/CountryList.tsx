import {
  Button,
  Card,
  Divider,
  Input,
  InputAdornment,
  Paper,
  CardHeader,
  Avatar,
  IconButton,
  Box,
  Modal,
  Checkbox,
  Typography,
  Switch,
  FormControl,
  FormLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { deepOrange } from "@mui/material/colors";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
interface CountryRow {
  countryname: string;
  countrycode: number;
  active: boolean;
  id: number;
  sn: number;
}

export const CountryList = () => {
  const [search, setSearch] = useState("");
  const [editRow, setEditRow] = useState<CountryRow | null>(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<CountryRow[]>([
    { countryname: "USA", countrycode: 1, active: true, id: 1, sn: 1 },
    { countryname: "India", countrycode: 91, active: false, id: 2, sn: 2 },
    { countryname: "China", countrycode: 86, active: false, id: 3, sn: 3 },
    { countryname: "Russia", countrycode: 7, active: true, id: 4, sn: 4 },
    { countryname: "Japan", countrycode: 81, active: false, id: 5, sn: 5 },
    {
      countryname: "Germany",
      countrycode: 49,
      active: true,
      id: 6,
      sn: 6,
    },
    {
      countryname: "United Kingdom",
      countrycode: 44,
      active: true,
      id: 7,
      sn: 7,
    },
    {
      countryname: "France",
      countrycode: 33,
      active: true,
      id: 8,
      sn: 8,
    },
    {
      countryname: "Italy",
      countrycode: 39,
      active: true,
      id: 9,
      sn: 9,
    },
    {
      countryname: "Canada",
      countrycode: 1,
      active: true,
      id: 10,
      sn: 10,
    },
    {
      countryname: "Spain",
      countrycode: 34,
      active: true,
      id: 11,
      sn: 11,
    },
    {
      countryname: "Australia",
      countrycode: 61,
      active: true,
      id: 12,
      sn: 12,
    },
  ]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 
 

  const handleEdit = (row: CountryRow) => {
    setEditRow({ ...row });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

 

  const toggleCountry = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, active: !row.active } : row
      )
    );
  };

  const addRow = (newCountry : { countryname: string; countrycode: string }) => {
    const newId = rows.length + 1;
    const newRow: CountryRow = {
      ...newCountry,
      id: newId,
      sn: newId,
      active: true,
      countrycode: Number(newCountry.countrycode),
    };
    setRows((prevRows) => [...prevRows, newRow]);
    handleClose();
  };

  const deleteCountry = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const updateCountry = (updatedCountry: CountryRow) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === updatedCountry.id ? updatedCountry : row
      )
    );
    setEditRow(null);
  };

  const filterRows = rows.filter((row) =>
    row.countryname.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: "sn",
      headerName: "SN",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "countryname",
      headerName: "Country Name",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "countrycode",
      headerName: "Country Code",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "active",
      headerName: "Active",
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Checkbox
          checked={params.row.active}
          onClick={() => toggleCountry(params.row.id)}
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      renderCell: (params: GridRenderCellParams) => (
        <>
          <IconButton
            onClick={() => handleEdit(params.row as CountryRow)}
            sx={{ mr: 2 }}
          >
            <ModeEditOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => deleteCountry(params.row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  const addCountryFormik = useFormik({
    initialValues: {
      countryname: "",
      countrycode: "",
    },
    validationSchema: Yup.object({
      countryname: Yup.string().required("Country name is required"),
      countrycode: Yup.number().required("Country code is required").typeError("Country code must be a number"),
    }),
    onSubmit: (values) => {
      addRow({ countryname: values.countryname, countrycode: values.countrycode});
      setOpen(!open);
    },

  
  });

  const editCountryFormik = useFormik({
    enableReinitialize:true,
    initialValues: editRow || { countryname: "", countrycode: "",active: false},
    validationSchema: Yup.object({
      countryname: Yup.string().required("Country name is required"),
      countrycode: Yup.number().required("Country code is required").typeError("Country code must be a number"),
    }),
    onSubmit: (values) => {
      updateCountry({...editRow!,countryname: values.countryname,countrycode: Number(values.countrycode),active: values.active});
      setEditRow(null);
    },
  })
  return (
    <>
      <Card  elevation={8}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: deepOrange[400] }}>CM</Avatar>}
          title="Country Master"
          subheader="Create a new country"
          action={
            <Button
              variant="contained"
              color="warning"
              sx={{ margin: 2, marginRight: 6 }}
              onClick={handleOpen}
            >
              Create
            </Button>
          }
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
            value={search}
            onChange={handleSearch}
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
        <div style={{ height: "calc(100vh - 200px)", width: "100%" }}>
          <DataGrid
            density="compact"
            rows={filterRows}
            columns={columns.map((col) => ({
              ...col,
              flex: 1,
            }))}
          />
        </div>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" align="center" component="h2">
            Add Country
          </Typography>
          <form onSubmit={addCountryFormik.handleSubmit}>
          <FormControl fullWidth margin="dense">
            <FormLabel sx={{ fontSize: "0.8rem" }}>Country Name</FormLabel>
            <OutlinedInput
              placeholder="Enter the Country Name"
              size="small"
              value={addCountryFormik.values.countryname}
              onChange={addCountryFormik.handleChange}
              onBlur={addCountryFormik.handleBlur}
              error={addCountryFormik.touched.countryname && Boolean(addCountryFormik.errors.countryname)}
              name="countryname"
            />
            <FormHelperText error> {addCountryFormik.touched.countryname &&
                addCountryFormik.errors.countryname}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel sx={{ fontSize: "0.8rem" }}>Country Code</FormLabel>
            <OutlinedInput
             placeholder="Enter the Country Code"
              size="small"
              value={addCountryFormik.values.countrycode}
              onChange={addCountryFormik.handleChange}
              onBlur={addCountryFormik.handleBlur}
              error={addCountryFormik.touched.countrycode && Boolean(addCountryFormik.errors.countrycode)}
              name="countrycode"
            />
            <FormHelperText error> {addCountryFormik.touched.countrycode &&
                addCountryFormik.errors.countrycode}</FormHelperText>
          </FormControl>
          <Box
            sx={{ display: "flex", gap: 10, justifyContent: "space-between" }}
          >
            <Button
            type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleClose}
              sx={{ mt: 2 }}
              fullWidth
            >
              Cancel
            </Button>
          </Box>
          </form>
        </Box>
      </Modal>

      <Modal open={editRow != null} onClose={() => setEditRow(null)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h5" component="h2" align="center" mb={4}>
            Update Country
          </Typography>
          <form onSubmit={editCountryFormik.handleSubmit}>
          <FormControl margin="dense" fullWidth>
            <FormLabel sx={{ fontSize: "0.8rem" }}>Country Name</FormLabel>
            <OutlinedInput
            name="countryname"
              size="small"
              value={editCountryFormik.values.countryname}
              onChange={editCountryFormik.handleChange}
              onBlur={editCountryFormik.handleBlur}
              error={editCountryFormik.touched.countryname && Boolean(editCountryFormik.errors.countryname)}
            />
            <FormHelperText error>{editCountryFormik.touched.countryname && editCountryFormik.errors.countryname}</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel sx={{ fontSize: "0.8rem" }}>Country Code</FormLabel>
            <OutlinedInput
            name="countrycode"
              size="small"
              value={editCountryFormik.values.countrycode}
             onChange={editCountryFormik.handleChange}
              onBlur={editCountryFormik.handleBlur}
              error={editCountryFormik.touched.countrycode && Boolean(editCountryFormik.errors.countrycode)}
            />
            <FormHelperText error>{editCountryFormik.touched.countrycode && editCountryFormik.errors.countrycode}</FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{ fontSize: "0.8rem" }}>Active</FormLabel>
            <Switch
              size="small"
              checked={editRow?.active || false}
              onChange={() =>
                setEditRow({ ...editRow!, active: !editRow?.active })
              }
            />
          </FormControl>
          <Box
            sx={{ display: "flex", gap: 10, justifyContent: "space-between" }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Update
            </Button>
            <Button variant="contained" color="error" sx={{ mt: 2 }} fullWidth
            onClick={() => setEditRow(null)}>
              Cancel
            </Button>
          </Box>
            </form>
        </Box>
      </Modal>
    </>
  );
};
