import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/products";
import { Link } from "react-router-dom";

interface Props {
  products: Product;
}

export default function ProductCard({ products }: Props) {
  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {products.name.charAt(0).toUpperCase()}
            </Avatar>
          }
          title={products.name}
          titleTypographyProps={{
            sx: { fontWeight: "bold", color: "primary.main" },
          }}
        />
        <CardMedia
          sx={{
            height: 140,
            backgroundSize: "contain",
            bgcolor: "primary.light",
          }}
          image={products.pictureUrl}
          title={products.name}
        />
        <CardContent>
          <Typography gutterBottom color="secondary" variant="h5">
            {(products.price / 100).toFixed(2)}:-
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {products.brand} / {products.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to cart</Button>
          <Button component={Link} to={`/catalog/${products.id}`} size="small">
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
