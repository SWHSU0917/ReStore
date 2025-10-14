import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from "./ProductList";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";

export default function Catalog() {
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { productsLoaded, status } = useSelector((state) => state.catalog);
  const products = useSelector(productSelectors.selectAll);

  // useEffect(() => {
  //   // fetch("http://localhost:5000/api/products")
  //   //   .then((response) => response.json())
  //   //   .then((data) => setProducts(data));
  //   agent.Catalog.list()
  //     .then((products) => setProducts(products))
  //     .catch((error) => console.log(error))
  //     .finally(() => setLoading(false));
  // }, []);
  // if (loading) return <LoadingComponent message="Loading products..." />;

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
