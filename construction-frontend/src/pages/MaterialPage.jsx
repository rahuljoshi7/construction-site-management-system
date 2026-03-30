import { useState, useEffect } from "react";
import API from "../services/api";
import './MaterialPage.css';

function MaterialPage() {

  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const fetchMaterials = async () => {
    try {
      const res = await API.get("/material");
      setMaterials(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const addMaterial = async () => {
    if (!name || !quantity || !price) {
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
      console.error(err);
      alert("Failed to add material");
    }
  };

  const deleteMaterial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this material?")) {
      return;
    }

    try {
      await API.delete(`/material/${id}`);
      fetchMaterials();
    } catch (err) {
      console.error(err);
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
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Material
          </button>
        </div>
      </div>

      {/* MATERIALS LIST */}
      <div className="materials-section">
        <h2 className="materials-header">
          Materials ({materials.length})
        </h2>

        {materials.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📦</div>
            <p className="empty-state-text">No materials added yet</p>
          </div>
        ) : (
          <div className="materials-grid">
            {materials.map(m => (
              <div key={m._id} className="material-card">
                
                <h3 className="material-name">{m.name}</h3>

                <div className="material-info">
                  <span className="material-label">Quantity</span>
                  <span className="material-value">{m.quantity}</span>
                </div>

                <div className="material-info">
                  <span className="material-label">Price/Unit</span>
                  <span className="material-value price">₹{m.pricePerUnit?.toLocaleString()}</span>
                </div>

                <div className="material-actions">
                  <button 
                    className="btn-delete" 
                    onClick={() => deleteMaterial(m._id)}
                  >
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="14" height="14">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
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