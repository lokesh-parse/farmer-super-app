import { useEffect, useState } from "react";
import {
  getMarketplaceItems,
  createMarketplaceItem,
  deleteMarketplaceItem,
} from "../../services/marketplaceService";

function MarketplacePage() {
  const [items, setItems] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    product_name: "",
    quantity: "",
    price: "",
    location: "",
    contact: "",
  });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getMarketplaceItems();
    setItems(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("product_name", formData.product_name);
    formDataObj.append("quantity", formData.quantity);
    formDataObj.append("price", formData.price);
    formDataObj.append("location", formData.location);
    formDataObj.append("contact", formData.contact);

    if (image) formDataObj.append("image", image);

    const newItem = await createMarketplaceItem(formDataObj);
    setItems((prev) => [newItem, ...prev]);

    setFormData({
      product_name: "",
      quantity: "",
      price: "",
      location: "",
      contact: "",
    });

    setImage(null);
    setPreview("");
    e.target.reset();
  };

  const handleDelete = async (id) => {
    await deleteMarketplaceItem(id);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="marketplace-page">
      <div className="marketplace-hero">
        <div>
          <h1>Marketplace</h1>
          <p>Buy and sell fresh farm products directly with farmers.</p>
        </div>
      </div>

      <div className="marketplace-layout">
        <div className="marketplace-panel">
          <h2>Add New Product</h2>

          <form className="marketplace-form" onSubmit={handleSubmit}>
            <input name="product_name" placeholder="Product Name" value={formData.product_name} onChange={handleChange} />
            <input name="quantity" placeholder="Quantity e.g. 2 quintal" value={formData.quantity} onChange={handleChange} />
            <input name="price" placeholder="Price ₹" value={formData.price} onChange={handleChange} />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
            <input name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} />

            <label className="image-upload-box">
              {preview ? <img src={preview} alt="Preview" /> : <span>Click to upload product image</span>}
              <input type="file" accept="image/*" onChange={handleImageChange} hidden />
            </label>

            <button type="submit">Add Product</button>
          </form>
        </div>

        <div className="marketplace-panel">
          <h2>Available Products</h2>

          <div className="product-grid">
            {items.map((item) => (
              <div key={item.id} className="product-card">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.product_name} />
                ) : (
                  <div className="no-image">No Image</div>
                )}

                <h3>{item.product_name}</h3>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Location: {item.location}</p>
                <p>Contact: {item.contact}</p>

                <div className="product-actions">
                  <a href={`https://wa.me/91${item.contact}`} target="_blank">
                    WhatsApp
                  </a>

                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketplacePage;