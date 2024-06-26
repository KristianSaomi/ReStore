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
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/Context/useStoreContext";

interface Props {
  products: Product;
}

export default function ProductCard({ products }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

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
          <LoadingButton
            loading={loading}
            onClick={() => handleAddItem(products.id)}
            size="small"
          >
            Add to cart
          </LoadingButton>
          <Button component={Link} to={`/catalog/${products.id}`} size="small">
            View
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
