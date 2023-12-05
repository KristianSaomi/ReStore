import { Product } from "../../app/models/products";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import ProductList from "./productList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    agent.Catalog.list().then((products) => setProducts(products));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
