import { List } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <List>
      {products.map((product, index: number) => (
        <ProductCard key={index} products={product} />
      ))}
    </List>
  );
}
