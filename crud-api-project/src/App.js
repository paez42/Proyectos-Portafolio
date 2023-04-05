import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";

function App() {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

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
    console.log(consolaSeleccionada);
  };

  const peticionGet = async () => {
    await axios.get("http://localhost:5000/products/").then((res) => {
      setData(res.data);
    });
  };

  const peticionPost = async () => {
    await axios
      .post("http://localhost:5000/products/", consolaSeleccionada)
      .then((res) => {
        setData(data.concat(res.data));
        abrirCerrarModalInsertar();
      });
  };

  const peticionPut = async () => {
    await axios
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
    peticionGet();
  }, []);

  const bodyInsertar = (
    <Box
      sx={{
        position: "absolute",
        width: 400,
        minheight: 350,
        border: "2px solid #000",
        padding: "3px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
      }}
    >
      <Typography variant="h3" textAlign={"center"}>
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
      <Box sx={{ display: "flex", justifyContent: "end" }}>
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
      <Typography variant="h3">Agregar Nueva Consola</Typography>
      <TextField name="name" label="Name" onChange={handleChange} />
      <TextField
        name="description"
        label="Description"
        onChange={handleChange}
      />
      <TextField name="price" label="Price" onChange={handleChange} />
      <Box>
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </Box>
    </Box>
  );

  const bodyEditar = (
    <Box>
      <Typography variant="h3">Agregar Nueva Consola</Typography>
      <TextField
        name="name"
        label="Name"
        onChange={handleChange}
        value={consolaSeleccionada && consolaSeleccionada.name}
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
      <Box>
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </Box>
    </Box>
  );

  const bodyEliminar = (
    <Box>
      <Typography>
        Estas seguro que deseas eliminar la consola{" "}
        {consolaSeleccionada && consolaSeleccionada.id} ?
      </Typography>
      <Box>
        <Button color="primary">SI</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>NO</Button>
      </Box>
    </Box>
  );

  return (
    <div className="App">
      <Container>
        <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
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
              {data.map((consola) => (
                <TableRow key={consola.id}>
                  <TableCell>{consola.id}</TableCell>
                  <TableCell>{consola.name}</TableCell>
                  <TableCell>{consola.description}</TableCell>
                  <TableCell>{consola.price}</TableCell>
                  <TableCell>
                    <ModeEditOutlineTwoToneIcon
                      onClick={() => seleccionarConsola(consola, "Editar")}
                    />
                    <DeleteForeverTwoToneIcon
                      onClick={() => seleccionarConsola(consola, "Eliminar")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      </Container>
    </div>
  );
}

export default App;
