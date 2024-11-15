import {
  Box,
  Container,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { orange } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import EmailIcon from "@mui/icons-material/Email";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";




interface SignUpValues{
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
});

const SignUp = () => {

    const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };


  const handleSubmit = (values: object, actions: FormikHelpers<SignUpValues>) => {
    console.log(values);
    navigate("/login");
    actions.setSubmitting(false);
  };
  const [showPassword, setShowPassword] = useState(false);
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
            Sign Up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >{({ values, errors, handleChange, handleBlur, handleSubmit }) =>(

            <form onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                margin="dense"
                label="Enter the Name "
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                fullWidth
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                id="outlined-basic"
                margin="dense"
                label="Enter the Email "
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                fullWidth
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email}
                helperText={errors.email}
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
                id="outlined-basic"
                type={showPassword ? "text" : "password"}
                margin="dense"
                label="Enter the Password"
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
                fullWidth
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password}
                helperText={errors.password}
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
                type="submit"
              >
                Register
              </Button>
            </form>
          )}
          </Formik>
        </Box>
        <Typography variant="body1" mt={3} color="initial">
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Container>
    </>
  );
};

export default SignUp;
