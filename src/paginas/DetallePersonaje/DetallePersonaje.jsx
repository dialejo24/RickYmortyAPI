import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Button, 
  Paper, 
  Grid, 
  Divider,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DetallePersonaje = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDetalle = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const datos = await respuesta.json();
        setPersonaje(datos);
      } catch (error) {
        console.error("Error al obtener el detalle:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDetalle();
  }, [id]);

  if (cargando) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={80} sx={{ color: '#00ff00' }} />
      </Box>
    );
  }

  if (!personaje || personaje.error) {
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h5" color="error">Personaje no encontrado</Typography>
        <Button onClick={() => navegar(-1)} startIcon={<ArrowBackIcon />} sx={{ mt: 2, color: '#00ff00' }}>
          Volver
        </Button>
      </Container>
    );
  }

  const { name, status, species, gender, image, origin, location, episode } = personaje;
  const colorEstado = status === 'Alive' ? '#4caf50' : status === 'Dead' ? '#f44336' : '#9e9e9e';

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        onClick={() => navegar(-1)} 
        startIcon={<ArrowBackIcon />} 
        sx={{ mb: 4, color: '#00ff00', '&:hover': { backgroundColor: 'rgba(0, 255, 0, 0.1)' } }}
      >
        Volver
      </Button>

      <Paper elevation={6} sx={{ p: 0, overflow: 'hidden', backgroundColor: '#3c3e44', color: 'white', borderRadius: 4 }}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <Box 
              component="img" 
              src={image} 
              alt={name} 
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
            />
          </Grid>
          <Grid item xs={12} md={7} sx={{ p: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ color: '#ff9800', fontWeight: 'bold' }}>
              {name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: colorEstado }} />
              <Typography variant="h6">
                {status} - {species}
              </Typography>
            </Box>

            <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#9e9e9e' }}>Género:</Typography>
                <Typography variant="h6">{gender}</Typography>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ color: '#9e9e9e' }}>Origen:</Typography>
                <Typography variant="h6">{origin.name}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: '#9e9e9e' }}>Última ubicación conocida:</Typography>
                <Typography variant="h6">{location.name}</Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ color: '#9e9e9e', mb: 1 }}>Episodios donde aparece:</Typography>
                <Chip 
                  label={`${episode.length} episodios`} 
                  sx={{ backgroundColor: '#00ff00', color: 'black', fontWeight: 'bold' }} 
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default DetallePersonaje;
