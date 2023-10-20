import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState([
    { name: "product1", price: 100.0 },
    { name: "product2", price: 200.0 },
  ]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, []);

  function addProduct() {
    setProduct((prevState) => [
      ...prevState,
      {
        name: "product" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
      },
    ]);
  }

  return (
    <>
      <div>
        <h1>Re-Store</h1>
        {product.map((item) => (
          <ul key={item.name}>
            <li>name: {item.name}</li>
            <li>price: {item.price}</li>
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
