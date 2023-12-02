import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/products";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/Products/${id}`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      {product != null && !loading ? (
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img
              src={product.pictureUrl}
              alt={product.name}
              style={{ width: "100%" }}
            ></img>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">{product.name}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h4" color="secondary">
              ${(product?.price / 100).toFixed(2)}
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>{product.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{product.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>{product.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Quanity in stock</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h1">Cant find this product</Typography>
      )}
    </>
  );
}
