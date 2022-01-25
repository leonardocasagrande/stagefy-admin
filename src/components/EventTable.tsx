import {
  Avatar,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import { IEvent } from 'types';
import ConfirmationModal from './modals/ConfirmationModal';

interface IEventTableProps {
  rows: IEvent[];
  onAddEvent?: () => void;
  onPauseEvent?: (id: string) => void;
  onDeleteEvent?: (id: string) => void;
}

const EventTable = ({
  rows,
  onAddEvent,
  onPauseEvent,
  onDeleteEvent,
}: IEventTableProps) => {
  const [rowForDelete, setRowForDelete] = useState<string | null>(null);
  const [rowForPause, setRowForPause] = useState<string | null>();

  const handleDelete = () => {
    if (rowForDelete && onDeleteEvent) {
      onDeleteEvent(rowForDelete);
      setRowForDelete(null);
    }
  };

  const handlePause = () => {
    if (rowForPause && onPauseEvent) {
      onPauseEvent(rowForPause);
      setRowForPause(null);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Capa</TableCell>
            <TableCell>Evento</TableCell>
            <TableCell>Streamer</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Horário</TableCell>
            <TableCell>Views</TableCell>
            {!!onAddEvent && (
              <TableCell style={{ textAlign: 'right' }}>
                <Button
                  onClick={onAddEvent}
                  variant="contained"
                  color="secondary"
                >
                  Incluir evento
                </Button>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Avatar
                  sx={{ width: 52, height: 52, margin: '0 auto' }}
                  variant="rounded"
                  src={row.image}
                />
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.professional.artisticName}</TableCell>
              <TableCell>
                {new Date(row.date).toLocaleDateString('pt-br')}
              </TableCell>
              <TableCell>
                {new Date(row.date).toLocaleTimeString('pt-br', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
              <TableCell>{row.views}</TableCell>
              {!!onAddEvent && (
                <TableCell>
                  <Box display="flex" gap={3} justifyContent="flex-end">
                    {!!onPauseEvent && (
                      <Button
                        onClick={() => setRowForPause(row.id)}
                        variant="contained"
                        color="warning"
                      >
                        pausar
                      </Button>
                    )}
                    {!!onDeleteEvent && (
                      <Button
                        onClick={() => setRowForDelete(row.id)}
                        variant="contained"
                        color="error"
                      >
                        excluir
                      </Button>
                    )}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!!onDeleteEvent && (
        <ConfirmationModal
          open={!!rowForDelete}
          description="Você deseja mesmo excluir essa live?"
          title="excluir evento"
          onAccept={handleDelete}
          onClose={() => setRowForDelete(null)}
          primaryButtonText="Excluir"
          primaryButtonColor="success"
        />
      )}
      {!!onPauseEvent && (
        <ConfirmationModal
          open={!!rowForPause}
          description="Você deseja mesmo pausar essa live?"
          title="pausar evento"
          onAccept={handlePause}
          onClose={() => setRowForPause(null)}
          primaryButtonText="Pausar"
          primaryButtonColor="success"
        />
      )}
    </TableContainer>
  );
};

export default EventTable;
