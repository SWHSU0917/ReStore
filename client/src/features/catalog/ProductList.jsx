import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid size={3} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
