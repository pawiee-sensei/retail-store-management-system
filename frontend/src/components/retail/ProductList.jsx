const ProductList = ({ products, onEdit }) => {
    if (!products.length) return <p>No products found</p>;
  
    return (
        <table border="1" cellPadding="10" style={{ width: "100%" }}>
            <thread>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thread>

        <tbody>
            {products.map((product) => (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td> 
                    <td>
                        <button onClick={() => onEdit(product)}>Edit</button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
    );
};

export default ProductList;