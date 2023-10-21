import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

import { Product } from "../../app/models/products";

interface Props {
  products: Product[];
  addProduct: () => void;
}

export default function Catalog({ products, addProduct }: Props) {
  return (
    <>
      <List>
        {products.map((product, index: number) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar src={product.pictureUrl} />
              <ListItemText>
                {product.name} - {product.price}
              </ListItemText>
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={addProduct}>
        Add product
      </Button>
    </>
  );
}
