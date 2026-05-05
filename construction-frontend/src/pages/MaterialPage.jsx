import { useState, useEffect } from "react";
import API from "../services/api";
import "./MaterialPage.css";

function MaterialPage() {

  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  // ===============================
  // FETCH MATERIALS
  // ===============================
  const fetchMaterials = async () => {
    try {
      const res = await API.get("/material"); // ✅ FIXED URL
      setMaterials(res.data.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // ===============================
  // ADD MATERIAL
  // ===============================
  const addMaterial = async () => {
    if (!name.trim() || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/material", {
        name,
        quantity: Number(quantity),
        pricePerUnit: Number(price)
      });

      setName("");
      setQuantity("");
      setPrice("");
      fetchMaterials();
    } catch (err) {
      console.error("Add Error:", err);
      alert("Failed to add material");
    }
  };

  // ===============================
  // DELETE MATERIAL
  // ===============================
  const deleteMaterial = async (id) => {

    console.log("Deleting Material ID:", id); // 🔥 DEBUG

    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    try {
      await API.delete(`/material/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete material");
    }
  };

  return (
    <div className="material-page">

      <h1 className="material-title">Material Management</h1>

      {/* ADD MATERIAL FORM */}
      <div className="material-form">
        <h2 className="form-section-title">Add New Material</h2>
        
        <div className="form-grid">
          <input
            className="form-input"
            placeholder="Material name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-input"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <input
            className="form-input"
            type="number"
            placeholder="Price per unit"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button className="btn-add" onClick={addMaterial}>
            Add Material
          </button>
        </div>
      </div>

      {/* MATERIAL LIST */}
      <div className="materials-section">
        <h2 className="materials-header">
          Materials ({materials.length})
        </h2>

        {materials.length === 0 ? (
          <div className="empty-state">
            <p>No materials added yet</p>
          </div>
        ) : (
          <div className="materials-grid">
            {materials.map((m) => (
              <div key={m.id} className="material-card"> {/* ✅ FIXED */}

                <h3 className="material-name">{m.name}</h3>

                <div className="material-info">
                  <span>Quantity:</span>
                  <span>{m.quantity}</span>
                </div>

                <div className="material-info">
                  <span>Price/Unit:</span>
                  <span>₹{Number(m.pricePerUnit).toLocaleString()}</span>
                </div>

                <div className="material-actions">
                  <button
                    className="btn-delete"
                    onClick={() => deleteMaterial(m.id)} // ✅ FIXED
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default MaterialPage;