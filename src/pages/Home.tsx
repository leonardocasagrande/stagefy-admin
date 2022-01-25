import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import stagefyLogo from 'assets/images/logo_stagefy.png';
import axios from 'axios';
import LoginCard from 'components/LoginCard';
import { useApp } from 'hooks/AppContext';
import { useAuth } from 'hooks/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TLoginSchema } from 'schemas/login';

const Home = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { user } = useAuth();

  const navigate = useNavigate();

  const { setErrorMessage, setLoading } = useApp();

  const { signIn } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/consulta');
    }
  }, [user, navigate]);

  const handleLogin = async (info: TLoginSchema) => {
    setLoading(true);
    try {
      await signIn(info);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      } else if (err instanceof Error) {
        setErrorMessage(err.message);
      }
    }
    setLoading(false);
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center">
      <Container>
        <Box
          my={4}
          display="flex"
          flexDirection={isSm ? 'column' : 'row'}
          gap={isSm ? 4 : 12}
        >
          <Box display="flex" flexDirection="column" gap={4} maxWidth={680}>
            <img src={stagefyLogo} alt="logo" />
            <Typography variant="subtitle1">
              Tornando o bilinguismo acessível através de experiências
              artísticas e culturais ao vivo e gamificadas.
            </Typography>
          </Box>
          <Box flex={1}>
            <LoginCard onSubmit={handleLogin} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
