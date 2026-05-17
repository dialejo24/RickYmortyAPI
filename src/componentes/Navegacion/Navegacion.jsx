import { useState } from 'react';
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

  const abierto = Boolean(anclaMenu);

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
      <Button color="inherit" sx={{ '&:hover': { color: '#00ff00' } }}>Inicio</Button>
      <Button color="inherit" sx={{ '&:hover': { color: '#00ff00' } }}>Humanos</Button>
      <Button color="inherit" sx={{ '&:hover': { color: '#00ff00' } }}>Alienígenas</Button>
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
        <MenuItem onClick={manejarCerrarMenu}>Robot</MenuItem>
        <MenuItem onClick={manejarCerrarMenu}>Cronenberg</MenuItem>
        <MenuItem onClick={manejarCerrarMenu}>Desconocido</MenuItem>
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
          <ListItemButton onClick={manejarAlternarMovil}>
            <ListItemText primary="Inicio" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={manejarAlternarMovil}>
            <ListItemText primary="Humanos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={manejarAlternarMovil}>
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
            <ListItemButton sx={{ pl: 4 }} onClick={manejarAlternarMovil}>
              <ListItemText primary="Robot" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={manejarAlternarMovil}>
              <ListItemText primary="Cronenberg" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }} onClick={manejarAlternarMovil}>
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
