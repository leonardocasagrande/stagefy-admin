import { Menu } from '@mui/icons-material';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import stagefyLogo from 'assets/images/logo_stagefy_drawer.png';
import axios from 'axios';
import { useApp } from 'hooks/AppContext';
import { useAuth } from 'hooks/AuthContext';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Link = styled(NavLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&.active': {
    color: theme.palette.secondary.main,
  },
}));

const drawerWidth = 263;

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { setLoading, setErrorMessage } = useApp();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignout = async () => {
    setLoading(true);
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
    setLoading(false);
  };

  const drawer = (
    <Box
      pt={7}
      pl={6}
      pr={5}
      pb={12}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <img src={stagefyLogo} alt="logo" />
      <Box mt={10} display="flex" flexDirection="column" gap={4}>
        <Link to="/consulta">
          <Typography variant="h4">Consultar</Typography>
        </Link>
        <Link to="/eventos">
          <Typography variant="h4">Eventos</Typography>
        </Link>
        <Link to="/streamers">
          <Typography variant="h4">Streamers</Typography>
        </Link>
        <Link to="/carrossel">
          <Typography variant="h4">Carrossel</Typography>
        </Link>
      </Box>
      <Box marginTop="auto" display="flex" justifyContent="center">
        <Button onClick={handleSignout} color="error">
          SAIR
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <IconButton
        color="primary"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, ml: 2, mt: 1, display: { sm: 'none' } }}
      >
        <Menu />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
        PaperProps={{
          sx: {
            boxShadow: '4px 4px 9px rgb(0 0 0 / 25%)',
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
