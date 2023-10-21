import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/products";

interface Props {
  products: Product;
}

export default function ProductCard({ products }: Props) {
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={products.pictureUrl} />
          <ListItemText>
            {products.name} - {products.price}
          </ListItemText>
        </ListItemAvatar>
      </ListItem>
    </>
  );
}
