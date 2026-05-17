import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Container, Grid, Typography, Pagination, Box, CircularProgress } from '@mui/material';
import TarjetaPersonaje from '../../componentes/TarjetaPersonaje/TarjetaPersonaje';
import './Inicio.css';

const Inicio = () => {
  const { especie } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const paginaActual = parseInt(searchParams.get('pagina')) || 1;

  const obtenerPersonajes = async (numeroPagina, filtroEspecie) => {
    setCargando(true);
    try {
      const valorEspecie = filtroEspecie || '';
      const url = `https://rickandmortyapi.com/api/character?page=${numeroPagina}&species=${valorEspecie}`;
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      
      if (datos.results) {
        setPersonajes(datos.results);
        setTotalPaginas(datos.info.pages);
      } else {
        setPersonajes([]);
        setTotalPaginas(0);
      }
    } catch (error) {
      console.error("Error al obtener personajes:", error);
      setPersonajes([]);
      setTotalPaginas(0);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('pagina')) {
      setSearchParams({});
    }
  }, [especie, setSearchParams]);

  useEffect(() => {
    obtenerPersonajes(paginaActual, especie);
  }, [paginaActual, especie]);

  const manejarCambioPagina = (evento, valor) => {
    setSearchParams({ pagina: valor });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tituloSeccion = especie 
    ? `Personajes: ${especie.charAt(0).toUpperCase() + especie.slice(1)}` 
    : 'Todos los Personajes';

  return (
    <Container maxWidth="xl" className="inicio-contenedor">
      <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ color: '#00ff00', fontWeight: 'bold', mb: 4 }}>
        {tituloSeccion}
      </Typography>

      {cargando ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress size={80} sx={{ color: '#00ff00' }} />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} className="grid-personajes">
            {personajes.length > 0 ? (
              personajes.map((personaje) => (
                <Grid item key={personaje.id} xs={12} sm={6} md={4} lg={3} display="flex" justifyContent="center">
                  <TarjetaPersonaje personaje={personaje} />
                </Grid>
              ))
            ) : (
              <Typography variant="h6" color="white" sx={{ mt: 4 }}>
                No se encontraron personajes para esta especie.
              </Typography>
            )}
          </Grid>

          {totalPaginas > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
              <Pagination 
                count={totalPaginas} 
                page={paginaActual} 
                onChange={manejarCambioPagina} 
                color="primary" 
                size="large"
                sx={{ 
                  '& .MuiPaginationItem-root': { color: 'white' },
                  '& .Mui-selected': { backgroundColor: '#00ff00 !important', color: 'black' }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default Inicio;
