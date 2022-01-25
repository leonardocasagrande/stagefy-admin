import { Box } from '@mui/material';
import Sidebar from 'components/Sidebar';

const withSidebar = (Component: React.ComponentType) => ({ ...props }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      <Sidebar />
      <Component {...props} />
    </Box>
  );
};

export default withSidebar;
