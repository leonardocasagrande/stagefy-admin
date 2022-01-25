import { Search } from '@mui/icons-material';
import {
  Box,
  Fade,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import EventTable from 'components/EventTable';
import withSidebar from 'components/HOCs/withSidebar';
import withSuccess from 'components/HOCs/withSuccess';
import EventModal from 'components/modals/EventModal';
import NoData from 'components/NoData';
import { useApp } from 'hooks/AppContext';
import useEvents from 'hooks/useEvents';
import { useState } from 'react';
import { TEventSchema } from 'schemas/event';
import { createEvent, deleteEvent } from 'services/events';

const AdminEvents = () => {
  const { setErrorMessage, setLoading, setSuccessMessage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [newEventOpen, setNewEventOpen] = useState(false);

  const { data, mutate } = useEvents(appliedSearchTerm);

  const handleCreate = async (form: TEventSchema) => {
    setLoading(true);
    try {
      const date = new Date(form.date);
      date.setHours(
        form.time.getHours(),
        form.time.getMinutes(),
        form.time.getSeconds()
      );

      await createEvent({
        date,
        image: form.image,
        name: form.name,
        professionalId: form.professionalId,
      });
      setNewEventOpen(false);
      setSuccessMessage('Evento criado com sucesso!');
      mutate();
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setErrorMessage(err.response.data.message);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (eventId: string) => {
    setLoading(true);
    try {
      await deleteEvent(eventId);
      setSuccessMessage('Live excluída com sucesso!');
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
        maxWidth="100%"
        flex={1}
      >
        <Typography variant="h1" align="center" color="secondary">
          Eventos
        </Typography>
        <TextField
          label="BUSCAR"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={() => setAppliedSearchTerm(searchTerm)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setAppliedSearchTerm(searchTerm);
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {!!data && (
          <EventTable
            rows={data}
            onAddEvent={() => setNewEventOpen(true)}
            onDeleteEvent={handleDelete}
          />
        )}
        {!!data && !data.length && <NoData />}
        <EventModal
          open={newEventOpen}
          onClose={() => setNewEventOpen(false)}
          onSubmit={handleCreate}
        />
      </Box>
    </Fade>
  );
};

export default withSuccess(withSidebar(AdminEvents));
