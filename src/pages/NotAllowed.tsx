import { Box, Button, Container, Typography } from '@mui/material';
import notAllowed from 'assets/images/401.jpg';
import { useAuth } from 'hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const NotAllowed = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleGoBack = () => {
    if (user) {
      navigate('/consulta');
      return;
    }
    navigate('/');
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        justifyContent="center"
      >
        <Typography variant="h2" align="center">
          Página não autorizada
        </Typography>
        <img src={notAllowed} alt="not-authorized" />
        <Button onClick={handleGoBack}>Voltar</Button>
      </Box>
    </Container>
  );
};

export default NotAllowed;
