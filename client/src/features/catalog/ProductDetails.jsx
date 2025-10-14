import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Button,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { id } = useParams();
  // const [product, setProduct] = useState();
  const product = useSelector((state) =>
    productSelectors.selectById(state, id)
  );
  // const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  // const [submitting, setSubmitting] = useState(false);
  // const { basket, setBasket, removeItem } = useStoreContext();
  const dispatch = useDispatch();
  const { basket, status } = useSelector((state) => state.basket);
  const { status: productStatus } = useSelector((state) => state.catalog);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    // agent.Catalog.details(parseInt(id))
    //   .then((response) => setProduct(response))
    //   .catch((error) => console.log(error))
    //   .finally(() => setLoading(false));
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  function handleInputChange(event) {
    if (event.currentTarget.value >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  }

  function handleUpdateCart() {
    if (!product) return;

    // setSubmitting(true);
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      // agent.Basket.addItem(product.id, updatedQuantity)
      //   // .then((basket) => setBasket(basket))
      //   .then((basket) => dispatch(setBasket(basket)))
      //   .catch((error) => console.log(error))
      //   .finally(() => setSubmitting(false));
      dispatch(
        addBasketItemAsync({ productId: product.id, quantity: updatedQuantity })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      // agent.Basket.removeItem(product.id, updatedQuantity)
      //   // .then(() => removeItem(product.id, updatedQuantity))
      //   .then(() =>
      //     dispatch(
      //       removeItem({ productId: product.id, quantity: updatedQuantity })
      //     )
      //   )
      //   .catch((error) => console.log(error))
      //   .finally(() => setSubmitting(false));
      dispatch(
        removeBasketItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
        })
      );
    }
  }

  // if (loading) return <LoadingComponent message={"Loading product..."} />;
  if (productStatus.includes("pending"))
    return <LoadingComponent message={"Loading product..."} />;

  if (!product) return <NotFound />;

  return (
    <Grid container spacing={6}>
      <Grid size={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid size={6}>
        <Typography variant="h3">{product.name}</Typography>
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
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid size={6}>
            <Button
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              // loading={submitting}
              // loading={status.includes("pendingRemoveItem" + product.id)}
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
