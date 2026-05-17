import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Pagination, Box, CircularProgress } from '@mui/material';
import TarjetaPersonaje from '../../componentes/TarjetaPersonaje/TarjetaPersonaje';
import './Inicio.css';

const Inicio = () => {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const obtenerPersonajes = async (numeroPagina) => {
    setCargando(true);
    try {
      const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${numeroPagina}`);
      const datos = await respuesta.json();
      setPersonajes(datos.results);
      setTotalPaginas(datos.info.pages);
    } catch (error) {
      console.error("Error al obtener personajes:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPersonajes(pagina);
  }, [pagina]);

  const manejarCambioPagina = (evento, valor) => {
    setPagina(valor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl" className="inicio-contenedor">
      <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ color: '#00ff00', fontWeight: 'bold', mb: 4 }}>
        Rick and Morty
      </Typography>

      {cargando ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={80} sx={{ color: '#00ff00' }} />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {personajes.map((personaje) => (
              <Grid item key={personaje.id} xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="center">
                <TarjetaPersonaje personaje={personaje} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
            <Pagination 
              count={totalPaginas} 
              page={pagina} 
              onChange={manejarCambioPagina} 
              color="primary" 
              size="large"
              sx={{ 
                '& .MuiPaginationItem-root': { color: 'white' },
                '& .Mui-selected': { backgroundColor: '#00ff00 !important', color: 'black' }
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default Inicio;
