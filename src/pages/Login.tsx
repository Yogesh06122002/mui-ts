import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { orange } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import { Formik } from "formik";
import * as Yup from "yup";
import userList from "../assets/user.json";
import CloseIcon from "@mui/icons-material/Close";

const validateSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: any, actions: any) => {
    const user = userList.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (user) {
      navigate("/");
    } else {
      setMessage("Invalid email or password");
      setOpen(true);
    }
    actions.setSubmitting(false);
  };

  return (
    <>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 10,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component={Paper}
          elevation={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px",
            p: 2,
          }}
        >
          <IconButton sx={{ mt: -5 }}>
            <AccountCircleIcon sx={{ color: orange[700], fontSize: "40px" }} />
          </IconButton>

          <Typography
            variant="body1"
            sx={{ fontWeight: "", fontSize: "20px" }}
            color="initial"
          >
            Sign In
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validateSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="dense"
                  label="Enter the Email "
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ fontSize: 18 }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <TextField
                  type={showPassword ? "text" : "password"}
                  margin="dense"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  label="Enter the Password"
                  variant="outlined"
                  size="small"
                  sx={{ mt: 2 }}
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsIcon sx={{ fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <Visibility sx={{ fontSize: 20 }} />
                            ) : (
                              <VisibilityOff sx={{ fontSize: 20 }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
                <Button
                  sx={{ mt: 2, margin: "dense" }}
                  variant="contained"
                  fullWidth
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
        </Box>
        <Typography variant="body1" mt={3} color="initial">
          Don't have an account? <Link to="/signup">Register</Link>
        </Typography>
        <Snackbar
        
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          open={open}
          autoHideDuration={2000}
          onClose={() => {
            setOpen(false);
          }}
          
          action={
            <>
              <IconButton
                onClick={() => {
                  setOpen(false);
                }}
                color="inherit"
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </>
          }
        >
          <Alert
          onClose={() => {
            setOpen(false);
          }
          }
          variant="filled"
          severity="error">{message}</Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Login;
