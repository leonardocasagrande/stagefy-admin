import { Box, Typography } from '@mui/material';
import ops from 'assets/images/ops.png';

const NoData = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
      <img src={ops} alt="ops" />
      <Typography variant="h1" color="error">
        OPS!
      </Typography>
      <Typography variant="subtitle1">
        Não encontramos resultados para sua busca!
      </Typography>
    </Box>
  );
};

export default NoData;
