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

interface StateRow {
  stateName: string;
  stateCode: number;
  active: boolean;
  id: number;
  sn: number;
}

export const StateList = () => {
  const [search, setSearch] = useState("");
  const [editRow, setEditRow] = useState<StateRow | null>(null);
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<StateRow[]>([
    {
      stateName: "Andhra Pradesh",
      stateCode: 1,
      active: true,
      id: 1,
      sn: 1,
    },
    {
      stateName: "Arunachal Pradesh",
      stateCode: 2,
      active: true,
      id: 2,
      sn: 2,
    },
    {
      stateName: "Assam",
      stateCode: 3,
      active: true,
      id: 3,
      sn: 3,
    },
    {
      stateName: "Bihar",
      stateCode: 4,
      active: true,
      id: 4,
      sn: 4,
    },
    {
      stateName: "Chhattisgarh",
      stateCode: 5,
      active: true,
      id: 5,
      sn: 5,
    },
    {
      stateName: "Goa",
      stateCode: 6,
      active: true,
      id: 6,
      sn: 6,
    },
    {
      stateName: "Gujarat",
      stateCode: 7,
      active: true,
      id: 7,
      sn: 7,
    },
    {
      stateName: "Haryana",
      stateCode: 8,
      active: true,
      id: 8,
      sn: 8,
    },
    {
      stateName: "Himachal Pradesh",
      stateCode: 9,
      active: true,
      id: 9,
      sn: 9,
    },
    {
      stateName: "Jharkhand",
      stateCode: 10,
      active: true,
      id: 10,
      sn: 10,
    },
    {
      stateName: "Karnataka",
      stateCode: 11,
      active: true,
      id: 11,
      sn: 11,
    },
    {
      stateName: "Madhya Pradesh",
      stateCode: 12,
      active: true,
      id: 12,
      sn: 12,
    },
    {
      stateName: "Maharashtra",
      stateCode: 13,
      active: true,
      id: 13,
      sn: 13,
    },
  ]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (row: StateRow) => {
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

  const addRow = (newState: { stateName: string; stateCode: string }) => {
    const newId = rows.length + 1;
    const newRow: StateRow = {
      ...newState,
      id: newId,
      sn: newId,
      active: true,
      stateCode: Number(newState.stateCode),
    };
    setRows((prevRows) => [...prevRows, newRow]);
    handleClose();
  };

  const deleteState = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const updateState = (updatedState: StateRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedState.id ? updatedState : row))
    );
    setEditRow(null);
  };

  const filterRows = rows.filter((row) =>
    row.stateName.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: "sn",
      headerName: "SN",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stateName",
      headerName: "State Name",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stateCode",
      headerName: "State Code",
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
            onClick={() => handleEdit(params.row as StateRow)}
            sx={{ mr: 2 }}
          >
            <ModeEditOutlineIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={() => deleteState(params.row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  const addStateFormik = useFormik({
    initialValues: {
      stateName: "",
      stateCode: "",
    },
    validationSchema: Yup.object({
      stateName: Yup.string().required("Country name is required"),
      stateCode: Yup.number()
        .required("Country code is required")
        .typeError("Country code must be a number"),
    }),
    onSubmit: (values) => {
      addRow({ stateName: values.stateName, stateCode: values.stateCode });
      setOpen(!open);
    },
  });

  const editStateFormik = useFormik({
    enableReinitialize: true,
    initialValues: editRow || { stateName: "", stateCode: "", active: false },
    validationSchema: Yup.object({
      stateName: Yup.string().required("State name is required"),
      stateCode: Yup.number()
        .required("State code is required")
        .typeError("State code must be a number"),
    }),
    onSubmit: (values) => {
      updateState({
        ...editRow!,
        stateName: values.stateName,
        stateCode: Number(values.stateCode),
        active: values.active,
      });
      setEditRow(null);
    },
  });

  return (
    <>
      <Card elevation={8}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: deepOrange[400] }}>SM</Avatar>}
          title="State Master"
          subheader="Create a new state"
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
            Add State
          </Typography>
          <form onSubmit={addStateFormik.handleSubmit}>
            <FormControl fullWidth margin="dense">
              <FormLabel sx={{ fontSize: "0.8rem" }}>State Name</FormLabel>
              <OutlinedInput
                placeholder="Enter the State Name"
                size="small"
                value={addStateFormik.values.stateName}
                onChange={addStateFormik.handleChange}
                onBlur={addStateFormik.handleBlur}
                error={
                  addStateFormik.touched.stateName &&
                  Boolean(addStateFormik.errors.stateName)
                }
                name="stateName"
              />
              <FormHelperText error>
                {" "}
                {addStateFormik.touched.stateName &&
                  addStateFormik.errors.stateName}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <FormLabel sx={{ fontSize: "0.8rem" }}>State Code</FormLabel>
              <OutlinedInput
                placeholder="Enter the State Code"
                size="small"
                value={addStateFormik.values.stateCode}
                onChange={addStateFormik.handleChange}
                onBlur={addStateFormik.handleBlur}
                error={
                  addStateFormik.touched.stateCode &&
                  Boolean(addStateFormik.errors.stateCode)
                }
                name="stateCode"
              />
              <FormHelperText error>
                {" "}
                {addStateFormik.touched.stateCode &&
                  addStateFormik.errors.stateCode}
              </FormHelperText>
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
            Update State
          </Typography>
          <form onSubmit={editStateFormik.handleSubmit}>
            <FormControl margin="dense" fullWidth>
              <FormLabel sx={{ fontSize: "0.8rem" }}>State Name</FormLabel>
              <OutlinedInput
                name="stateName"
                size="small"
                value={editStateFormik.values.stateName}
                onChange={editStateFormik.handleChange}
                onBlur={editStateFormik.handleBlur}
                error={
                  editStateFormik.touched.stateName &&
                  Boolean(editStateFormik.errors.stateName)
                }
              />
              <FormHelperText error>
                {" "}
                {editStateFormik.touched.stateName &&
                  editStateFormik.errors.stateName}
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <FormLabel sx={{ fontSize: "0.8rem" }}>State Code</FormLabel>
              <OutlinedInput
                name="stateCode"
                size="small"
                value={editStateFormik.values.stateCode}
                onChange={editStateFormik.handleChange}
                onBlur={editStateFormik.handleBlur}
                error={
                  editStateFormik.touched.stateCode &&
                  Boolean(editStateFormik.errors.stateCode)
                }
              />
              <FormHelperText error>
                {editStateFormik.touched.stateCode &&
                  editStateFormik.errors.stateCode}
              </FormHelperText>
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
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
                type="submit"
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 2 }}
                fullWidth
                onClick={() => setEditRow(null)}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};
