import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CATEGORIES } from '../../utils/constants';

const ProductModal = ({ open, onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.productName,
        price: productToEdit.price,
        quantity: productToEdit.quantity,
        category: productToEdit.category
      });
    } else {
      setFormData({ name: '', price: '', quantity: '', category: '' });
    }
  }, [productToEdit, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            {productToEdit ? 'Editar Produto' : 'Adicionar Produto'}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <TextField
            margin="dense"
            label="Nome do Produto"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Preço (R$)"
            name="price"
            type="number"
            fullWidth
            required
            value={formData.price}
            onChange={handleChange}
            inputProps={{ step: "0.01", min: "0" }}
          />
          <TextField
            margin="dense"
            label="Quantidade"
            name="quantity"
            type="number"
            fullWidth
            required
            value={formData.quantity}
            onChange={handleChange}
            inputProps={{ min: "0" }}
          />
          <TextField
            margin="dense"
            select
            label="Categoria"
            name="category"
            fullWidth
            required
            value={formData.category}
            onChange={handleChange}
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat.value} value={cat.value}>
                {cat.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose} color="error">Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">Salvar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductModal;