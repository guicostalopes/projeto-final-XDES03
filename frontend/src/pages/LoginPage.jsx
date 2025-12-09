import { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  Link as MuiLink,
  Paper 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError('');

    try {

      const data = await login(email, password);

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role', data.role);
      localStorage.setItem('avatar', data.starWarsCharacter);

      navigate('/products');
      
    } catch (err) {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Login Supermercado
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height: '50px' }}
            >
              Entrar
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary" sx={{ cursor: 'pointer' }}>
                  Não tem uma conta? Cadastre-se
                </Typography>
              </Link>
            </Box>

          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;