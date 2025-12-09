import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  MenuItem
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import { isValidUnifeiEmail, isValidPassword } from '../utils/validators';
import { ROLES } from '../utils/constants';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '' 
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = 'Nome de usuário é obrigatório.';
    
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!isValidUnifeiEmail(formData.email)) {
      newErrors.email = 'O e-mail deve ser @unifei.edu.br';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória.';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
    }

    if (!formData.role) newErrors.role = 'Selecione um tipo de usuário.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccess(false);

    if (!validate()) return;

    try {
      await register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Erro ao realizar cadastro. Tente novamente.';
      setGeneralError(msg);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          
          <Typography component="h1" variant="h5" align="center" sx={{ mb: 3 }}>
            Cadastro
          </Typography>

          {generalError && <Alert severity="error" sx={{ mb: 2 }}>{generalError}</Alert>}
          
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Cadastro realizado com sucesso! Redirecionando...
            </Alert>
          )}

          <Box component="form" onSubmit={handleRegister} noValidate>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nome de Usuário"
              name="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail (@unifei.edu.br)"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="role"
              label="Tipo de Usuário"
              id="role"
              value={formData.role}
              onChange={handleChange}
              error={!!errors.role}
              helperText={errors.role}
            >
              {ROLES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '50px' }}
              disabled={success}
            >
              Cadastrar
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  Já tem uma conta? Faça Login
                </Typography>
              </Link>
            </Box>

          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;