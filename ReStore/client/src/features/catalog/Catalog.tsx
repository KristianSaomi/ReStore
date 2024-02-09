import { Product } from "../../app/models/products";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import ProductList from "./productList";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading products ..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
