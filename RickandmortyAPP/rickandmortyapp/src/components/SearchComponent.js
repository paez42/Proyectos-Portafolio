import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React from "react";

function SearchComponent({ setSearch, setPage}) {

    const searchBtn = (e) => {
        e.preventDefault();
      };

    const handleChangeSearch = (e, value) => {
        setPage(1);
        setSearch(e.target.value);
        console.log(e.target.value);
    };

  return (
    <Container sx={{ mt: 5 }} maxWidth="xl">
      <Box
        sx={{
          mt: 11,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography mb={5} variant="h2">
          Personajes
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          fullWidth
          id="outlined-search"
          label="Buscar Personajes"
          type="search"
          onChange={handleChangeSearch}
        />
        <Button variant="contained" color="success" sx={{ml:2}} onClick={searchBtn}>Buscar</Button>
      </Box>
    </Container>
  );
}

export default SearchComponent;
