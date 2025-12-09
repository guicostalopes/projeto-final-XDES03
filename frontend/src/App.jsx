import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import ProductsPage from './pages/ProductsPage'; 

function App() {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;