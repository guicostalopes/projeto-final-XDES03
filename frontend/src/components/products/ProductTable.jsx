import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { CATEGORIES } from '../../utils/constants';

const ProductTable = ({ products, onEdit, onDelete, onUpdateQuantity }) => {
  
  const getCategoryLabel = (catValue) => {
    const cat = CATEGORIES.find(c => c.value === catValue);
    return cat ? cat.label : catValue;
  };

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell><strong>Produto</strong></TableCell>
            <TableCell align="right"><strong>Preço</strong></TableCell>
            <TableCell align="center"><strong>Quantidade</strong></TableCell>
            <TableCell align="center"><strong>Categoria</strong></TableCell>
            <TableCell align="center"><strong>Ações</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell>{product.productName}</TableCell>
              
              <TableCell align="right">
                R$ {product.price.toFixed(2)}
              </TableCell>
              
              <TableCell align="center">
                <IconButton 
                  color="error" 
                  size="small"
                  onClick={() => onUpdateQuantity(product, -1)}
                  disabled={product.quantity <= 0}
                >
                  <RemoveCircleIcon />
                </IconButton>
                
                <span style={{ margin: '0 10px', fontWeight: 'bold' }}>
                  {product.quantity}
                </span>

                <IconButton 
                  color="success" 
                  size="small"
                  onClick={() => onUpdateQuantity(product, 1)}
                >
                  <AddCircleIcon />
                </IconButton>
              </TableCell>

              <TableCell align="center">
                <Chip label={getCategoryLabel(product.category)} variant="outlined" />
              </TableCell>

              <TableCell align="center">
                <IconButton color="primary" onClick={() => onEdit(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Nenhum produto cadastrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;