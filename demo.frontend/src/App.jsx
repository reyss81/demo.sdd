import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InventoryManager from './pages/InventoryManager';
import NoteManager from './pages/NoteManager';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
        <nav style={{ width: '250px', backgroundColor: '#f4f4f5', padding: '20px', borderRight: '1px solid #e4e4e7' }}>
          <h2 style={{ marginBottom: '20px', color: '#18181b' }}>Demo App</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#3f3f46', fontWeight: '500' }}>Dashboard</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/inventory" style={{ textDecoration: 'none', color: '#3f3f46', fontWeight: '500' }}>Inventory</Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/notes" style={{ textDecoration: 'none', color: '#3f3f46', fontWeight: '500' }}>Notes</Link>
            </li>
          </ul>
        </nav>
        <main style={{ flex: 1, padding: '40px', backgroundColor: '#ffffff' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryManager />} />
            <Route path="/notes" element={<NoteManager />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
