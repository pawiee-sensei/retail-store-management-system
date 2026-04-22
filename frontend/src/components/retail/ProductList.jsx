import { deleteProduct } from "../../services/product";


const ProductList = ({ products, onEdit, onDelete }) => {
    if (!products.length) return <p>No products found</p>;

const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
        await deleteProduct(id);
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
};
  
    return (
        <div className="product-table">
        <table className="product-table__table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>

        <tbody>
            {products.map((product) => (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>{product.category}</td> 
                    <td className="product-table__actions">
                        <button
                            className="product-table__edit-button"
                            onClick={() => onEdit(product)}
                        >
                            Edit
                        </button>

                        <button className="product-table__edit-button "
                            onClick={() => handleDelete(product.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
        </div>
    );
};

export default ProductList;
