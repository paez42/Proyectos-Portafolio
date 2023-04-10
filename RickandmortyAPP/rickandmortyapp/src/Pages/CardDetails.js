import { Box, Button, Chip, CircularProgress, Container, Divider, Grid, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const CardDetails = () => {
    const { id } = useParams();

    const [characterDetail, setCharacterDetails] = useState({ name: "", origin: { name: "" }, image: "", status: "", gender: "", location: { name: "" } });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const callAPI = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                const data = await response.json();
                setCharacterDetails(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError('Error al obtener los detalles del personaje');
                setLoading(false);
            }
        };
        callAPI();
    }, [id]);



    return (
        <Box sx={{ width: "100%", mt: 9 }}>
            <Container maxWidth="xl">
                {loading && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
                        <CircularProgress />
                    </Box>
                )}
                {!loading && error && (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4 }}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                )}
                {!loading && !error && characterDetail && (
                    <Grid container columnSpacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h1">{characterDetail.name}</Typography>
                            <Divider />
                            <Typography variant="h6">Origin: {characterDetail.origin.name}</Typography>
                            <Typography variant="h6">Gender: {characterDetail.gender}</Typography>
                            <Typography variant="h6">Location: {characterDetail.location.name}</Typography>

                            {characterDetail && characterDetail.status && (
                                <Box sx={{ mt: 2 }}>
                                    {(() => {
                                        if (characterDetail.status === "Dead") {
                                            return (
                                                <Chip label="Dead" color="error"/>                                     
                                            );
                                        } else if (characterDetail.status === "Alive") {
                                            return (
                                                <Chip label="Alive" color="success" />                              
                                            );
                                        } else {
                                            return (
                                                <Chip label="unknown" />
                                                 
                                            );
                                        }
                                    })()}
                                </Box>
                            )}
                        </Grid>
                        <Grid item xs={6}>
                            <img src={characterDetail.image} style={{ width: "100%", borderRadius: "0.5em" }} alt={characterDetail.name} />
                        </Grid>
                    </Grid>
                )}

                <Link to={"/"} style={{ textDecoration: "none" }}>
                    <Button fullWidth variant="contained" color="success" size="large" sx={{mt:5}}>
                        Volver a Home
                    </Button>
                </Link>
            </Container>
        </Box>
    );
};

export default CardDetails;
