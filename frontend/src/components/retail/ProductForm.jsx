import { useState } from "react";
import { useEffect } from "react";
import { createProduct, updateProduct } from "../../services/product.js";


//=============
// USE STATE
//=============
const ProductForm = ({ onClose, onSuccess, initialData }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");


   const isEdit = Boolean(initialData); 

  
    useEffect (() => {
      if (initialData) {
        setName(initialData.name || "");
        setPrice(initialData.price || "");
        setStock(initialData.stock || "");
        setCategory(initialData.category || "");
      }
    }, [initialData]);
  
//================
// HANDLE SUBMIT
//================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateProduct(
          initialData.id,{
            name: name.trim(),
            price: Number(price),
            stock: Number(stock),
            category,
          });

      } else {
        await createProduct({
          name: name.trim(),
          price: Number(price),
          stock: Number(stock),
          category,
        });
      }


  onSuccess && onSuccess();
  onClose();
    } catch (error) {
      console.error(error);
    }
  };

   

  return (
    <div className = "modal-overlay">
      <div className="modal">

    <form onSubmit={handleSubmit} className="product-form">
      <h3 className="product-form__title">
        {initialData ? "Edit Product" : "Add Product"}
      </h3>

      <div className="product-form__field">
        <label className="product-form__label">Product Name</label>
        <input className="product-form__input"

          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}

          required
        />
      </div>

      <div className="product-form__field">
        <label className="product-form__label">Price</label>
        <input className="product-form__input"

          placeholder="Enter price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}

          required
        />
      </div>

      <div className="product-form__field">
        <label className="product-form__label">Stock</label>
        <input className="product-form__input"

          placeholder="Enter stock quantity"
          type="number"
          min="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}

          required
        />
      </div>

      <div className="product-form__field">
        <label className="product-form__label">Category</label>
        <select className="product-form__input"

          value={category}
          onChange={(e) => setCategory(e.target.value)}
          
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>

      <div className="product-form__actions">
        <button type="submit" className="product-form__button product-form__button--primary">Save</button>
        <button type="button" className="product-form__button product-form__button--secondary" onClick={onClose}>Cancel</button>
       </div>
     </form>
    </div>
  </div>

  );
};

export default ProductForm;
