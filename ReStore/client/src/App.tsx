import { useEffect, useState } from "react";
import { Product } from "./products";

function App() {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/Products")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  function addProduct() {
    setProduct((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: "some brand",
        description: "some description",
        pictureUrl: "http://picsum.photos/200",
      },
    ]);
  }

  return (
    <>
      <div>
        <h1>Re-Store</h1>
        {product.map((product) => (
          <ul key={product.id}>
            <li>name: {product.name}</li>
            <li>price: {product.price}</li>
            <li>image: {product.pictureUrl}</li>
          </ul>
        ))}
        <button id="addingProduct" onClick={addProduct}>
          Add product
        </button>
      </div>
    </>
  );
}

export default App;
