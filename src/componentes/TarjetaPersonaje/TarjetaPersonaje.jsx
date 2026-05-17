import { Card, CardContent, CardMedia, Typography, Box, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './TarjetaPersonaje.css';

const TarjetaPersonaje = ({ personaje }) => {
  const navegar = useNavigate();
  if (!personaje) return null;

  const { id, name, status, species, gender, image } = personaje;

  const colorEstado = status === 'Alive' ? '#4caf50' : status === 'Dead' ? '#f44336' : '#9e9e9e';

  const manejarClick = () => {
    navegar(`/personaje/${id}`);
  };

  return (
    <Card className="tarjeta-personaje-raiz" sx={{ maxWidth: 345, backgroundColor: '#3c3e44', color: 'white' }}>
      <CardActionArea onClick={manejarClick}>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ff9800', fontWeight: 'bold' }}>
            {name}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2">
              <strong>Estado:</strong> 
              <Box component="span" sx={{ ml: 1, color: colorEstado }}>
                ● {status}
              </Box>
            </Typography>
            <Typography variant="body2">
              <strong>Especie:</strong> {species}
            </Typography>
            <Typography variant="body2">
              <strong>Género:</strong> {gender}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default TarjetaPersonaje;
