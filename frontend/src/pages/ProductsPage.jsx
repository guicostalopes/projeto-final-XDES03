import { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import ProductTable from '../components/products/ProductTable';
import ProductModal from '../components/products/ProductModal';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';

const ProductsPage = () => {
  const navigate = useNavigate();
  
  const userAvatar = localStorage.getItem('avatar') || 'User';
  const username = localStorage.getItem('username') || 'Usuário';

  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleOpenModal = (product = null) => {
    setProductToEdit(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = async (formData) => {
    try {
      if (productToEdit) {
        await updateProduct(productToEdit.id, formData);
        showAlert('Produto atualizado com sucesso!', 'success');
      } else {
        await createProduct(formData);
        showAlert('Produto criado com sucesso!', 'success');
      }
      fetchProducts();
      handleCloseModal();
    } catch (error) {
      showAlert('Erro ao salvar produto.', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await deleteProduct(id);
        showAlert('Produto excluído.', 'success');
        fetchProducts();
      } catch (error) {
        showAlert('Erro ao excluir produto.', 'error');
      }
    }
  };

  const handleUpdateQuantity = async (product, amount) => {
    try {
      const newQuantity = product.quantity + amount;
      if (newQuantity < 0) return;

      const payload = {
        name: product.productName,
        price: product.price,
        quantity: newQuantity,
        category: product.category
      };

      await updateProduct(product.id, payload);
      fetchProducts();
    } catch (error) {
      showAlert('Erro ao atualizar estoque.', 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Gerenciamento de Produtos
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
             Olá, {username} ({userAvatar})
          </Typography>
        </Box>
        <Button variant="outlined" color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
          Sair
        </Button>
      </Box>

      {alert.show && (
        <Alert severity={alert.type} sx={{ mb: 2 }}>{alert.message}</Alert>
      )}

      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={() => handleOpenModal()}
          sx={{ height: 50 }}
        >
          Novo Produto
        </Button>
      </Box>

      <ProductTable 
        products={products}
        onEdit={handleOpenModal}
        onDelete={handleDeleteProduct}
        onUpdateQuantity={handleUpdateQuantity}
      />

      <ProductModal 
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />
    </Container>
  );
};

export default ProductsPage;