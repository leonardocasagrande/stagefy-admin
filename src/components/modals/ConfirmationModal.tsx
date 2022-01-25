import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Modal from './Modal';

interface IConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  primaryButtonColor?: 'primary' | 'secondary' | 'warning' | 'success';
  onAccept: () => void;
  primaryButtonText: string;
}

const ConfirmationModal = ({
  open,
  onClose,
  onAccept,
  title,
  description,
  primaryButtonText,
  primaryButtonColor = 'success',
}: IConfirmationModalProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onClose={onClose}
      description={description}
    >
      <Box display="flex" gap={1.5}>
        <Button
          variant="contained"
          onClick={onAccept}
          color={primaryButtonColor}
        >
          {primaryButtonText}
        </Button>
        <Button onClick={onClose} variant="contained" color="error">
          CANCELAR
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
