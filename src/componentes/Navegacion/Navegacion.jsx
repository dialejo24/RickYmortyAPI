import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Menu, 
  MenuItem, 
  Box, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Collapse
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Navegacion = () => {
  const [anclaMenu, setAnclaMenu] = useState(null);
  const [movilAbierto, setMovilAbierto] = useState(false);
  const [submenuAbierto, setSubmenuAbierto] = useState(false);
  const navegar = useNavigate();

  const abierto = Boolean(anclaMenu);

  const manejarClickEspecie = (especie) => {
    const ruta = especie ? `/especie/${especie}` : '/';
    navegar(ruta);
    manejarCerrarMenu();
    if (movilAbierto) setMovilAbierto(false);
  };

  const manejarAbrirMenu = (evento) => {
    setAnclaMenu(evento.currentTarget);
  };

  const manejarCerrarMenu = () => {
    setAnclaMenu(null);
  };

  const manejarAlternarMovil = () => {
    setMovilAbierto(!movilAbierto);
  };

  const manejarAlternarSubmenu = () => {
    setSubmenuAbierto(!submenuAbierto);
  };

  const itemsNavegacion = (
    <>
      <Button component={Link} to="/" color="inherit" sx={{ '&:hover': { color: '#00ff00' } }}>Inicio</Button>
      <Button component={Link} to="/especie/human" color="inherit" sx={{ '&:hover': { color: '#00ff00' } }}>Humanos</Button>
      <Button component={Link} to="/especie/alien" color="inherit" sx={{ '&:hover': { color: '#00ff00' } }}>Alienígenas</Button>
      <Button
        color="inherit"
        onClick={manejarAbrirMenu}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ '&:hover': { color: '#00ff00' } }}
      >
        Más Especies
      </Button>
      <Menu
        anchorEl={anclaMenu}
        open={abierto}
        onClose={manejarCerrarMenu}
        PaperProps={{
          sx: { backgroundColor: '#3c3e44', color: 'white' }
        }}
      >
        <MenuItem onClick={() => manejarClickEspecie('robot')}>Robot</MenuItem>
        <MenuItem onClick={() => manejarClickEspecie('cronenberg')}>Cronenberg</MenuItem>
        <MenuItem onClick={() => manejarClickEspecie('unknown')}>Desconocido</MenuItem>
      </Menu>
    </>
  );

  const contenidoMenuMovil = (
    <Box sx={{ width: 250, backgroundColor: '#202329', height: '100%', color: 'white' }}>
      <Typography variant="h6" sx={{ p: 2, color: '#00ff00', fontWeight: 'bold' }}>
        RM-API
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={manejarAlternarMovil}>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/especie/human" onClick={manejarAlternarMovil}>
            <ListItemText primary="Humanos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/especie/alien" onClick={manejarAlternarMovil}>
            <ListItemText primary="Alienígenas" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={manejarAlternarSubmenu}>
            <ListItemText primary="Más Especies" />
            {submenuAbierto ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={submenuAbierto} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} onClick={() => manejarClickEspecie('robot')}>
              <ListItemText primary="Robot" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => manejarClickEspecie('cronenberg')}>
              <ListItemText primary="Cronenberg" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={() => manejarClickEspecie('unknown')}>
              <ListItemText primary="Desconocido" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#202329' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="abrir menu"
          edge="start"
          onClick={manejarAlternarMovil}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#00ff00', fontWeight: 'bold' }}>
          RM-API
        </Typography>
        
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          {itemsNavegacion}
        </Box>

        <Drawer
          variant="temporary"
          open={movilAbierto}
          onClose={manejarAlternarMovil}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250, backgroundColor: '#202329' },
          }}
        >
          {contenidoMenuMovil}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navegacion;
