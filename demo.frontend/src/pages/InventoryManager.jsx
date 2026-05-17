import React, { useState, useEffect } from 'react';
import { inventoryService } from '../services/inventoryService';

const InventoryManager = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', quantity: 0, price: 0.0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      const data = await inventoryService.getAll();
      setItems(data);
    } catch (err) {
      setError('Failed to fetch inventory');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await inventoryService.create(formData);
      setFormData({ name: '', quantity: 0, price: 0.0 });
      fetchItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await inventoryService.delete(id);
      fetchItems();
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Inventory Manager</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Add New Item</h3>
        <div style={{ marginBottom: '10px' }}>
          <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required style={{ padding: '8px', marginRight: '10px' }} />
          <input name="quantity" type="number" value={formData.quantity} onChange={handleInputChange} placeholder="Quantity" required style={{ padding: '8px', marginRight: '10px' }} />
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} placeholder="Price" required style={{ padding: '8px', marginRight: '10px' }} />
          <button type="submit" disabled={loading} style={{ padding: '8px 16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
            {loading ? 'Adding...' : 'Add Item'}
          </button>
        </div>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
            <th>ID</th><th>Name</th><th>Quantity</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '10px 0' }}>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>
                <button onClick={() => handleDelete(item.id)} style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryManager;
