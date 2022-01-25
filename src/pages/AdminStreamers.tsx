import { Box, Fade, Typography } from '@mui/material';
import axios from 'axios';
import AcceptStreamerCard from 'components/AcceptStreamerCard';
import withSidebar from 'components/HOCs/withSidebar';
import withSuccess from 'components/HOCs/withSuccess';
import { useApp } from 'hooks/AppContext';
import useNotAcceptedProfessionals from 'hooks/useNotAcceptedProfessionals';
import { acceptProfessional, refuseProfessional } from 'services/professionals';

const AdminStreamers = () => {
  const { data, mutate } = useNotAcceptedProfessionals();
  const { setErrorMessage, setSuccessMessage, setLoading } = useApp();

  const handleStreamerAccept = async (id: string) => {
    setLoading(true);
    try {
      await acceptProfessional(id);
      mutate();
      setSuccessMessage('Streamer aceito!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
    setLoading(false);
  };

  const handleStreamerRefuse = async (id: string) => {
    setLoading(true);
    try {
      await refuseProfessional(id);
      mutate();
      setSuccessMessage('Streamer recusado!');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
    setLoading(false);
  };

  return (
    <Fade in>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap={7}
        my={4}
        mx={3}
        width="100%"
      >
        <Typography variant="h1" align="center" color="secondary">
          Streamers
        </Typography>
        <Box
          display="flex"
          gap={4}
          flexWrap="wrap"
          sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
        >
          {data?.map((el) => (
            <AcceptStreamerCard
              onAccept={handleStreamerAccept}
              onRefuse={handleStreamerRefuse}
              professional={el}
              key={el.user.email}
            />
          ))}
        </Box>
      </Box>
    </Fade>
  );
};

export default withSuccess(withSidebar(AdminStreamers));
