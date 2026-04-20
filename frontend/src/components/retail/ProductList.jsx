const ProductList = ({ products }) => {
    if (!products.length) return <p>No products found</p>;
  
    return (
    <ul>
        {products.map((p) => {
            <li key={p.id}>
                {p.name} - ${p.price} - {p.stock}   
            </li>
        })}
    </ul>
    ); 
};

export default ProductList