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
import agent from "../../app/api/agent";
import NotFound from "../errors/NotFound";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProducts] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Normal axios response
    // axios
    //   .get(`http://localhost:5000/api/Products/${id}`)
    //   .then((response) => setProducts(response.data))
    //   .catch((error) => console.log(error))
    //   .finally(() => setLoading(false));
    id &&
      agent.Catalog.details(parseInt(id))
        .then((response) => {
          if (response.status != 200) {
            () => console.log(response.status, "something went wrong");
          }
          setProducts(response);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    <h1>Laddar</h1>;
  }

  return (
    <>
      {product && !loading ? (
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <img
              src={product?.pictureUrl}
              alt={product?.name}
              style={{ width: "100%" }}
            ></img>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h3">{product?.name}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h4" color="secondary">
              ${(product.price / 100).toFixed(2)}
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
        <NotFound />
      )}
    </>
  );
}
