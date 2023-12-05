import { Grid } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./productCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={3} key={product.id}>
          <ProductCard products={product} />
        </Grid>
      ))}
    </Grid>
  );
}
