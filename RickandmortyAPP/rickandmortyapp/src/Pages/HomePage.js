import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
} from "@mui/material";


import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import SearchComponent from "../components/SearchComponent";



export const HomePage = () => {
  const [characters, setCharacters] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [countPage, setCountPage] = useState(0);

  const callAPI = () => {
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCountPage(data.info.pages);
        setCharacters(data.results);
        setTimeout(() => setLoading(false), 500);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    setLoading(true);
    callAPI();
  }, [page, search]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return ( 
      <div>
        <SearchComponent setSearch={setSearch} setPage={setPage} />
        <Container sx={{ mt: 5 }} maxWidth="xl">
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
              <div>
                {characters.length !== 0 ? (
                  <Grid sx={{ my: 2 }} container spacing={2} direccion="row">
                    {characters && characters?.map((characters) => (
                      <Grid item xs={3} key={characters.id}>
                        <CardComponent
                          image={characters.image}
                          name={characters.name}
                          species={characters.species}
                          status={characters.status}
                          id={characters.id}
                        />                     
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  "No data"
                )}
              </div>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  mb: 5,
                }}
              >
                <Pagination
                  count={countPage}
                  page={page}
                  onChange={handleChange}
                />
              </Box>
            </>
          )}
        </Container>
      </div>
  );
};
