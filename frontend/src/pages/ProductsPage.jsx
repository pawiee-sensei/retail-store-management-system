import { useEffect, useState } from "react";
import { getProducts } from "../services/product.js";
import ProductList from "../components/retail/ProductList.jsx";
import ProductForm from "../components/retail/ProductForm.jsx";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
        <h1>Products</h1>
        <button onClick={() => setShowForm(true)}>Add Product</button>
        {showForm && (
          <ProductForm
            onClose={() => setShowForm(false)}
            onSuccess={fetchProducts}
          />
        )}
        <ProductList products={products} /> 
    </div>
  );
};

export default ProductPage;
