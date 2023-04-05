import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import React from "react";



const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                 <Typography>Rick and Morty APP</Typography>
              </Grid>
              <Grid item>
                <Button variant="outlined">Boton</Button>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
