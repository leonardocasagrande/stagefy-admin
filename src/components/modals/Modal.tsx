import { Close } from '@mui/icons-material';
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode } from 'react';

interface IModalProps {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
  title?: string;
  description?: string;
}

const Modal = ({
  open,
  onClose,
  children,
  title,
  description,
}: IModalProps) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Dialog
      open={open}
      PaperComponent={!isXs ? Box : undefined}
      fullScreen={isXs}
    >
      {isXs ? (
        <Box p={6} display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center">
            {!!title && (
              <Typography variant="h3" color="InfoText">
                {title}
              </Typography>
            )}
            <IconButton
              sx={{
                marginLeft: 'auto',
              }}
              onClick={onClose}
            >
              <Close />
            </IconButton>
          </Box>
          {!!description && (
            <Typography variant="body2" color="InfoText">
              {description}
            </Typography>
          )}
          {children}
        </Box>
      ) : (
        <>
          <Box display="flex" gap={1.5}>
            <Box
              p={6}
              borderRadius={4}
              bgcolor={theme.palette.background.default}
              display="flex"
              flexDirection="column"
              gap={2}
            >
              {!!title && (
                <Typography variant="h3" color="InfoText">
                  {title}
                </Typography>
              )}
              {!!description && (
                <Typography variant="body2" color="InfoText">
                  {description}
                </Typography>
              )}
              {children}
            </Box>
            <Box>
              <IconButton
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    backgroundColor: theme.palette.background.default,
                  },
                }}
                onClick={onClose}
              >
                <Close />
              </IconButton>
            </Box>
          </Box>
        </>
      )}
    </Dialog>
  );
};

export default Modal;
