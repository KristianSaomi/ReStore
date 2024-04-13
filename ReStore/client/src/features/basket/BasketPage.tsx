import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useStoreContext } from "../../app/Context/StoreContext";
import { useEffect, useState } from "react";

export default function BasketPage() {
  const [sum, setSum] = useState<number>();
  const { basket } = useStoreContext();
  let totalnumber: number = 0;

  useEffect(() => {
    basket?.items.forEach((element) => {
      const itemIndex = basket.items.findIndex(
        (i) => i.productId === element.productId
      );
      console.log(itemIndex);
      if (itemIndex >= 0) {
        totalnumber += element.price * basket.items[itemIndex].quantity;
        // console.log(
        //   "Index:" +
        //     itemIndex +
        //     "-" +
        //     "kostar" +
        //     basket.items[itemIndex].quantity +
        //     "*" +
        //     element.price / 100 +
        //     "=" +
        //     basket.items[itemIndex].quantity * (element.price / 100)
        // );
      } else {
        totalnumber += element.price;
      }
      setSum(totalnumber);
    });
  }, [setSum]);

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Subtotal</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.items.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">
                    {(item.price / 100).toFixed(2)}:-
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    {((item.price / 100) * item.quantity).toFixed(2)}:-
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      <div>
        <h1>
          Total price for all items:
          {!sum ? "" : (sum / 100).toFixed(2)}:-
        </h1>
      </div>
    </>
  );
}
