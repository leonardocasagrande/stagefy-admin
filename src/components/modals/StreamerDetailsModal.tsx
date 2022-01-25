import { Avatar, Stack, Typography } from '@mui/material';
import { IProfessional } from 'types';
import Modal from './Modal';

interface IStreamerDetailsModalProps {
  professional: IProfessional;
  open: boolean;
  onClose: () => void;
}

const StreamerDetailsModal = ({
  professional,
  open,
  onClose,
}: IStreamerDetailsModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack direction="row" spacing={4}>
        <Avatar
          src={professional.user.avatar}
          sx={{ width: 190, height: 190 }}
        />
        <Stack direction="column" spacing={4}>
          <Typography variant="h2">{professional.artisticName}</Typography>
          <Stack direction="column" spacing={3}>
            <Typography variant="h6">sobre</Typography>
            <Typography>{professional.bio}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default StreamerDetailsModal;
