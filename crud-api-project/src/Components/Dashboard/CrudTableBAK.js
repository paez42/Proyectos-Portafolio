import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  CircularProgress,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";

import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

import { Formik } from "formik";
import * as Yup from "yup";

function HomePage() {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { enqueueSnackbar } = useSnackbar();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickInsertar = () => {
    peticionPost();

    enqueueSnackbar("Datos guardados correctamente", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
  };

  const handleClickEditar = () => {
    peticionPut();
    enqueueSnackbar("Datos editados correctamente", {
      variant: "info",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
  };

  const handleClickEliminar = () => {
    peticionDelete();
    enqueueSnackbar("Datos borrados correctamente", {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    });
  };

  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionGet = async () => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/products/?_page=${page}`)
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const peticionPost = async () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/products/", consolaSeleccionada)
      .then((res) => {
        setData(data.concat(res.data));
        abrirCerrarModalInsertar();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const peticionPut = async () => {
    setLoading(true);
    axios
      .put(
        "http://localhost:5000/products/" + consolaSeleccionada.id,
        consolaSeleccionada
      )
      .then((res) => {
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (consolaSeleccionada.id === consola.id) {
            consola.name = consolaSeleccionada.name;
            consola.description = consolaSeleccionada.description;
            consola.price = consolaSeleccionada.price;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const peticionDelete = async () => {
    setLoading(true);
    axios
      .delete("http://localhost:5000/products/" + consolaSeleccionada.id)
      .then((res) => {
        setData(
          data.filter((consola) => consola.id !== consolaSeleccionada.id)
        );
        abrirCerrarModalEliminar();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    caso === "Editar" ? setModalEditar(true) : abrirCerrarModalEliminar();
  };

  useEffect(() => {
    setLoading(true);
    peticionGet();
  }, [page, rowsPerPage]);

  const bodyInsertar = (
    <Box
      sx={{
        position: "absolute",
        Width: 400,
        minheight: 350,
        border: "2px solid #000",
        padding: "3px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" textAlign={"center"} mx={1}>
        Agregar Nuevo Producto
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          mx: 2,
          my: 2,
        }}
      >
        <TextField
          name="name"
          label="Name"
          onChange={handleChange}
          sx={{ mb: 1 }}
        />
        <TextField
          name="description"
          label="Description"
          onChange={handleChange}
          sx={{ mb: 1 }}
        />
        <TextField name="price" label="Price" onChange={handleChange} />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "end", mr: 1, mb: 1, gap: 1 }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickInsertar}
          sx={{ mr: 1 }}
        >
          Insertar
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={() => abrirCerrarModalInsertar()}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );

  const bodyEditar = (
    <Box
      sx={{
        position: "absolute",
        Width: 400,
        minheight: 350,
        border: "2px solid #000",
        padding: "3px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h4" textAlign={"center"} mx={1}>
        Editar Producto
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
          mx: 2,
          my: 2,
          gap: 1,
        }}
      >
        <TextField
          name="name"
          label="Name"
          onChange={handleChange}
          value={consolaSeleccionada && consolaSeleccionada.name}
          fullWidth={true}
        />
        <TextField
          name="description"
          label="Description"
          onChange={handleChange}
          value={consolaSeleccionada && consolaSeleccionada.description}
        />
        <TextField
          name="price"
          label="Price"
          onChange={handleChange}
          value={consolaSeleccionada && consolaSeleccionada.price}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "end", mr: 1, mb: 1, gap: 1 }}
      >
        <Button variant="contained" color="primary" onClick={handleClickEditar}>
          Editar
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => abrirCerrarModalEditar()}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  );

  const bodyEliminar = (
    <Box
      sx={{
        position: "absolute",
        Width: 400,
        minheight: 350,
        border: "2px solid #000",
        padding: "3px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ m: 1 }}>
        <Typography variant="h6">
          Estas seguro que deseas eliminar el producto con ID{" "}
          {consolaSeleccionada && consolaSeleccionada.id} ?
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "end", mr: 1, mb: 1, gap: 1 }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickEliminar}
        >
          SI
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => abrirCerrarModalEliminar()}
        >
          NO
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Container sx={{ my: 5 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {" "}
            <Box sx={{ display: "flex", justifyContent: "end", mr: 20 }}>
              <Button
                variant="contained"
                onClick={() => abrirCerrarModalInsertar()}
              >
                Insertar
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((consola, index) => (
                      <TableRow key={consola.id}>
                        <TableCell>{consola.id}</TableCell>
                        <TableCell>{consola.name}</TableCell>
                        <TableCell>{consola.description}</TableCell>
                        <TableCell>{consola.price}</TableCell>
                        <TableCell>
                          <ModeEditOutlineTwoToneIcon
                            onClick={() =>
                              seleccionarConsola(consola, "Editar")
                            }
                            sx={{
                              backgroundColor: "yellow",
                              padding: "5px",
                              borderRadius: "50%",
                              cursor: "pointer",
                              mr: 1,
                            }}
                          />
                          <DeleteForeverTwoToneIcon
                            onClick={() =>
                              seleccionarConsola(consola, "Eliminar")
                            }
                            sx={{
                              backgroundColor: "red",
                              padding: "5px",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
            <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
              {bodyInsertar}
            </Modal>
            <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
              {bodyEditar}
            </Modal>
            <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
              {bodyEliminar}
            </Modal>
          </>
        )}
      </Container>
    </>
  );
}

export default HomePage;



import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  message: Yup.string()
    .min(10, 'Must be at least 10 characters')
    .max(1000, 'Must be 1000 characters or less')
    .required('Required')
});

const UserForm = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(`/api/users/${userId}`);
      setUserData(response.data);
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <Formik
      initialValues={{
        name: userData.name,
        email: userData.email,
        message: userData.message
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <Field as="textarea" name="message" />
            <ErrorMessage name="message" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
