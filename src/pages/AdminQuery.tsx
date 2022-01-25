import { Container, Fade, Typography } from '@mui/material';
import { Box } from '@mui/system';
import withSidebar from 'components/HOCs/withSidebar';

const AdminQuery = () => {
  return (
    <Fade in>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          justifyContent="center"
          my={4}
        >
          <Typography variant="h1" align="center" color="secondary">
            Consultar
          </Typography>
        </Box>
      </Container>
    </Fade>
  );
};

export default withSidebar(AdminQuery);
