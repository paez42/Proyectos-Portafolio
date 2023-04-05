import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Typography,
  Box,
} from "@mui/material";

import { Link } from "react-router-dom";

const CardComponent = ({ image, name, species, status, id, page }) => {
  return (
    <Card>
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />

      <CardContent>
        <Typography sx={{ mb: 1.5, textdecoration: "none" }} variant="h4">
          {name}
        </Typography>
        <Divider />
        <Typography sx={{ mt: 1.5 }}>Especie: {species}</Typography>
        <Typography sx={{ my: 1.5 }}>Estado: {status}</Typography>
        <Link to={`/${id}`} style={{textDecoration:"none"}}>
        <Button fullWidth variant="contained" color="success" >
           Ver Mas
        </Button>
        </Link>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};

export default CardComponent;
