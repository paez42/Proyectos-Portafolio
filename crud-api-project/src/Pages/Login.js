import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/UserContext";
import { login } from "../Config/firebase";
import { useEffect } from "react";

import { Formik } from "formik";
import * as Yup from "yup";

const theme = createTheme();

export default function SignInSide() {
  const { user, setUser } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  const onSubmit = async (
    values,
    { setSubmitting, setErrors, resetForm }
) => {
    try {
        await login({ email: values.email, password: values.password });
        console.log("user logged in");
        resetForm();
    } catch (error) {
        console.log(error.code);
        console.log(error.message);
        if (error.code === "auth/user-not-found") {
            setErrors({ email: "Email no Registrado" });
        }
        if (error.code === "auth/wrong-password") {
            setErrors({ password: "Contraseña incorrecta" });
        }
    } finally {
        setSubmitting(false);
    }
};


  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no válido").required("Email Requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Minimo 6 carárcteres")
      .required("Password Requerido"),
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            {/*Validation*/}

            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                isSubmitting,
                errors,
                touched,
                handleBlur,
              }) => (
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Ingrese Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    helperText= {errors.email && touched.email && errors.email}
                  />
                 
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Ingrese Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password && touched.password}
                    helperText= {errors.password && touched.password && errors.password}
                  />
    
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
