import {
  Box,
  Button,
  Grid,
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

import { Add, Delete, Remove } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  // const [loading, setLoading] = useState(true);
  // const [basket, setBasket] = useState();

  // useEffect(() => {
  //   agent.Basket.get()
  //     .then((basket) => setBasket(basket))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }, []);

  // if (loading) return <LoadingComponent message="Loading basket..." />;
  // const { basket, setBasket, removeItem } = useStoreContext();
  const dispatch = useDispatch();
  const { basket, status } = useSelector((state) => state.basket);
  // const [status, setStatus] = useState({
  //   loading: false,
  //   name: "",
  // });

  // function handleAddItem(productId, name) {
  //   setStatus({ loading: true, name });
  //   agent.Basket.addItem(productId)
  //     // .then((basket) => setBasket(basket))
  //     .then((baskte) => dispatch(setBasket(baskte)))
  //     .catch((error) => console.log(error))
  //     .finally(() => setStatus({ loading: false, name: "" }));
  // }

  // function handleRemoveItem(productId, quantity = 1, name) {
  //   setStatus({ loading: true, name });
  //   agent.Basket.removeItem(productId, quantity)
  //     // .then(() => removeItem(productId, quantity))
  //     .then(() => dispatch(removeItem({ productId, quantity })))
  //     .catch((error) => console.log(error))
  //     .finally(() => setStatus({ loading: false, name: "" }));
  // }

  if (!basket)
    return <Typography variant="h3">Your basket is empty!</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
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
                  <Box display="flex" alignItems="center">
                    <img
                      src={item.pictureUrl}
                      alt={item.name}
                      style={{ height: 50, marginRight: 20 }}
                    />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  ${(item.price / 100).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    // loading={
                    //   status.loading && status.name === "rem" + item.productId
                    // }
                    // onClick={() =>
                    //   handleRemoveItem(
                    //     item.productId,
                    //     1,
                    //     "rem" + item.productId
                    //   )
                    // }
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId + "rem"
                    )}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                    color="error"
                  >
                    <Remove />
                  </IconButton>
                  {item.quantity}
                  <IconButton
                    // loading={
                    //   status.loading && status.name === "add" + item.productId
                    // }
                    // onClick={() =>
                    //   handleAddItem(item.productId, "add" + item.productId)
                    // }
                    loading={status === "pendingAddItem" + item.productId}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                    color="secondary"
                  >
                    <Add />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  ${((item.price / 100) * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    // loading={
                    //   status.loading && status.name === "del" + item.productId
                    // }
                    // onClick={() =>
                    //   handleRemoveItem(
                    //     item.productId,
                    //     item.quantity,
                    //     "del" + item.productId
                    //   )
                    // }
                    loading={status.includes(
                      "pendingRemoveItem" + item.productId + "del"
                    )}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid size={6}></Grid>
        <Grid size={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            color="primary"
            size="large"
            variant="contained"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
