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

import { Formik, useFormik } from "formik";
import * as Yup from "yup";

const HomePage = ({ prodId }) => {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [prodData, setProdData] = useState(null);

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
      .post("http://localhost:5000/products/", values)
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
      .put("http://localhost:5000/products/" + values.id, values)
      .then((res) => {
        console.log(data);
        var dataNueva = data;
        dataNueva.map((consola) => {
          if (values.id === consola.id) {
            consola.name = values.name;
            consola.description = values.description;
            consola.price = values.price;
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
      .delete("http://localhost:5000/products/" + values.id)
      .then((res) => {
        setData(data.filter((consola) => consola.id !== values.id));
        abrirCerrarModalEliminar();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchUserData = async () => {
    const response = await axios.get(
      `http://localhost:5000/products/${userId}`
    );
    setProdData(response.data);
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

  useEffect(() => {
    setLoading(true);
    peticionGet();
    fetchUserData();
  }, [page, rowsPerPage, prodId]);

  if (!prodData) {
    return <p>Loading...</p>;
  }

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
            <Formik
              initialValues={{
                name: prodData.name,
                description: prodData.description,
                price: prodData.price,
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setLoading(true);
                axios
                  .put("http://localhost:5000/products/" + prodId, values)
                  .then((res) => {
                    console.log(res.data);
                    setProdData(res.data);
                    abrirCerrarModalEditar();
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                errors,
                touched,
                handleBlur,
              }) => (
                <>
                  <Modal
                    open={modalInsertar}
                    onClose={abrirCerrarModalInsertar}
                  >
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
                      component="form"
                      onSubmit={handleSubmit}
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
                          onBlur={handleBlur}
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          name="description"
                          label="Description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          name="price"
                          label="Price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          mr: 1,
                          mb: 1,
                          gap: 1,
                        }}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          sx={{ mr: 1 }}
                          type="submit"
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
                  </Modal>
                  {/*      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
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
                      component="form"
                      onSubmit={handleSubmit}
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
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          fullWidth={true}
                        />
                        <TextField
                          name="description"
                          label="Description"
                          onChange={formik.handleChange}
                          value={formik.values && formik.values.description}
                        />
                        <TextField
                          name="price"
                          label="Price"
                          onChange={formik.handleChange}
                          value={formik.values && formik.values.price}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          mr: 1,
                          mb: 1,
                          gap: 1,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleClickEditar}
                          type="submit"
                        >
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
                  </Modal>
                  <Modal
                    open={modalEliminar}
                    onClose={abrirCerrarModalEliminar}
                  >
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
                          {formik.values && formik.values.id} ?
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          mr: 1,
                          mb: 1,
                          gap: 1,
                        }}
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
                  </Modal> */}
                </>
              )}
            </Formik>
          </>
        )}
      </Container>
    </>
  );
};

export default HomePage;
