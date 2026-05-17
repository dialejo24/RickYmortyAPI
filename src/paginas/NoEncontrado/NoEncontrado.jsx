import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const NoEncontrado = () => {
  const navegar = useNavigate();

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 10, color: 'white' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h1" component="div" sx={{ fontSize: '8rem', fontWeight: 'bold', color: '#00ff00' }}>
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          ¡Ups! Página no encontrada
        </Typography>
        <Typography variant="body1" sx={{ color: '#9e9e9e', mb: 4 }}>
          Parece que te has perdido en otra dimensión. La página que buscas no existe.
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navegar('/')}
          sx={{ 
            backgroundColor: '#00ff00', 
            color: 'black', 
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#00cc00' }
          }}
        >
          Volver al Inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NoEncontrado;
