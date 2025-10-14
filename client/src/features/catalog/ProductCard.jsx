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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";

export default function ProductCard({ product }) {
  // const [loading, setLoading] = useState(false);
  const { status } = useSelector((state) => state.basket);
  // const { setBasket } = useStoreContext();
  const dispatch = useDispatch();

  // function handleAddItem(productId) {
  //   setLoading(true);
  //   agent.Basket.addItem(productId)
  //     // .then((basket) => setBasket(basket))
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
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
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {/* ${(product.price / 100).toFixed(2)} */}
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          // loading={loading}
          // onClick={() => handleAddItem(product.id)}
          size="small"
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id }))
          }
        >
          Add to cart
        </Button>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
