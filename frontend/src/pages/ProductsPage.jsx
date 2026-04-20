import {useEffect, useState} from "react";
import {getProducts} from "../services/products.js";
import ProductList from "../components/retail/ProductList.jsx";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
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

        fetchProducts();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
    <div>
        <h1>Products</h1>
        <ProductList products={products} /> 
    </div>
    ); 
};