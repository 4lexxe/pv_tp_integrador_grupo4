import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link as MuiLink 
} from '@mui/material';
import { useAppContext } from '../../context/AppContext'; 

const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAppContext(); 

  const validateEmail = (email) => {
    
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!validateEmail(email)) {
      setError('El formato del correo electrónico no es válido.'); 
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.'); 
      return;
    }

    if (password !== confirmPassword) {
      setError('La contraseña y la confirmación no coinciden.'); 
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name); 
      setSuccess('¡Registro exitoso! Redirigiendo al login...'); 
      setTimeout(() => {
        navigate('/login'); 
      }, 2000); 
    } catch (err) {
      setError(err.message || 'Error al registrar el usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Registro de Usuario
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Nombre Completo"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2, width: '100%' }}>{success}</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Registrarse'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <MuiLink href="/login" variant="body2">
              ¿Ya tienes una cuenta? Inicia sesión
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Registro;