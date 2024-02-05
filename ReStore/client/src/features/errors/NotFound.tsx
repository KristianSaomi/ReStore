import { Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper} sx={{ height: 400 }}>
      <Typography variant="h2">Page cant be found</Typography>
      <Typography variant="body1">Try searching for something els</Typography>
      <Button fullWidth component={Link} to="/catalog">
        To the shop page
      </Button>
    </Container>
  );
}
