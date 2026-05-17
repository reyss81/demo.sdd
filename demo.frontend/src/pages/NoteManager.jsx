import React, { useState, useEffect } from 'react';
import { noteService } from '../services/noteService';

const NoteManager = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      const data = await noteService.getAll();
      setNotes(data);
    } catch (err) {
      setError('Failed to fetch notes');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await noteService.create(formData);
      setFormData({ title: '', content: '' });
      fetchNotes();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await noteService.delete(id);
      fetchNotes();
    } catch (err) {
      setError('Failed to delete note');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Notes Manager</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Add New Note</h3>
        <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
          <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" required style={{ padding: '8px' }} />
          <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="Content" required style={{ padding: '8px', minHeight: '80px' }} />
          <button type="submit" disabled={loading} style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
            {loading ? 'Adding...' : 'Add Note'}
          </button>
        </div>
      </form>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {notes.map(note => (
          <div key={note.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', minWidth: '250px', background: '#fff9c4' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>{note.title}</h4>
            <p style={{ margin: '0 0 15px 0', color: '#555' }}>{note.content}</p>
            <button onClick={() => handleDelete(note.id)} style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none', padding: 0 }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteManager;
