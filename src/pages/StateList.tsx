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
    },{
      stateName: "Arunachal Pradesh",
      stateCode: 2,
      active: true,
      id: 2,
      sn: 2,
    },{
      stateName: "Assam",
      stateCode: 3,
      active: true,
      id: 3,
      sn: 3,
    },{
      stateName: "Bihar",
      stateCode: 4,
      active: true,
      id: 4,
      sn: 4,
    },{
      stateName: "Chhattisgarh",
      stateCode: 5,
      active: true,
      id: 5,
      sn: 5,
    },{
      stateName: "Goa",
      stateCode: 6,
      active: true,
      id: 6,
      sn: 6,
    },{
      stateName: "Gujarat",
      stateCode: 7,
      active: true,
      id: 7,
      sn: 7,
    },{
      stateName: "Haryana",
      stateCode: 8,
      active: true,
      id: 8,
      sn: 8,
    },{
      stateName: "Himachal Pradesh",
      stateCode: 9,
      active: true,
      id: 9,
      sn: 9,
    },{
      stateName: "Jharkhand",
      stateCode: 10,
      active: true,
      id: 10,
      sn: 10,
    },{
      stateName: "Karnataka",
      stateCode: 11,
      active: true,
      id: 11,
      sn: 11,
    },{
      stateName: "Madhya Pradesh",
      stateCode: 12,
      active: true,
      id: 12,
      sn: 12,
    },{
      stateName: "Maharashtra",
      stateCode: 13,
      active: true,
      id: 13,
      sn: 13,
    }
  ]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [newState, setNewState] = useState<{
    stateName: string;
    stateCode: string | number;
    active: boolean;
  }>({
    stateName: "",
    stateCode: "",
    active: false,
  });

  const handleEdit = (row: StateRow) => {
    setEditRow({ ...row });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewState((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCountry = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, active: !row.active } : row
      )
    );
  };

  const addRow = () => {
    const newId = rows.length + 1;
    const newRow = {
      ...newState,
      id: newId,
      sn: newId,
      stateCode: Number(newState.stateCode),
    };
    setRows((prevRows) => [...prevRows, newRow]);
    setNewState({
      stateName: "",
      stateCode: "",
      active: false,
    });
    handleClose();
  };

  const deleteState = (id: number) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const updateState = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === editRow?.id
          ? {
              ...row,
              stateName: editRow?.stateName,
              stateCode: Number(editRow?.stateCode),
              active: editRow?.active,
            }
          : row
      )
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

  return (
    <>
      <Card variant="outlined" elevation={10}>
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
          <FormControl fullWidth margin="dense" >
            <FormLabel sx={{fontSize:"0.8rem"}}>State Name</FormLabel>
            <OutlinedInput
              placeholder="Enter the State Name"
              size="small"
              value={newState.stateName || ""}
              onChange={handleChange}
              name="stateName"
            />
            <FormHelperText>Enter the State Name</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel sx={{fontSize:"0.8rem"}}>State Code</FormLabel>
            <OutlinedInput
              size="small"
              value={newState.stateCode || ""}
              onChange={handleChange}
              name="stateCode"
            />
            <FormHelperText>Enter the State Code</FormHelperText>
          </FormControl>
          <Box
            sx={{ display: "flex", gap: 10, justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
              onClick={addRow}
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
          <FormControl margin="dense" fullWidth>
            <FormLabel sx={{fontSize:"0.8rem"}}>State Name</FormLabel>
            <OutlinedInput
              size="small"
              value={editRow?.stateName || ""}
              onChange={(e) =>
                setEditRow({ ...editRow!, stateName: e.target.value })
              }
            />
            <FormHelperText>Enter the State Name</FormHelperText>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel sx={{fontSize:"0.8rem"}}>State Code</FormLabel>
            <OutlinedInput
              size="small"
              value={editRow?.stateCode || ""}
              onChange={(e) =>
                setEditRow({ ...editRow!, stateCode: Number(e.target.value) })
              }
            />
            <FormHelperText>Enter the State Name</FormHelperText>
          </FormControl>
          <FormControl fullWidth>
            <FormLabel sx={{fontSize:"0.8rem"}}>Active</FormLabel>
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
              onClick={updateState}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              fullWidth
              onClick={updateState}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
