/* eslint-disable jsx-a11y/label-has-associated-control */
import { PhotoCameraOutlined } from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/lab';
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  FormHelperText,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useFormik } from 'formik';
import { getErrorByKey } from 'helpers/utils';
import useStreamers from 'hooks/useStreamers';
import { useRef } from 'react';
import eventSchema, { TEventSchema } from 'schemas/event';
import Modal from './Modal';

interface IEventModalProps {
  open: boolean;
  onClose(): void;
  onSubmit(values: TEventSchema): void;
}

const EventModal = ({ open, onClose, onSubmit }: IEventModalProps) => {
  const { data: streamers } = useStreamers();

  const fileInput = useRef<HTMLInputElement>(null);

  const theme = useTheme();

  const {
    handleSubmit,
    getFieldProps,
    touched,
    errors,
    setFieldValue,
    values,
    setFieldTouched,
  } = useFormik({
    initialValues: eventSchema.getDefault(),
    validationSchema: eventSchema,
    onSubmit,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFieldTouched('image');
    if (files) {
      setFieldValue('image', files[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('viewImage', event.target?.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={8}>
          <Box display="flex" gap={8}>
            <Box display="flex" flexDirection="column" gap={5}>
              <TextField
                label="Nome do evento"
                variant="standard"
                placeholder="Digite sua resposta"
                {...getFieldProps('name')}
                error={!!getErrorByKey('name', touched, errors)}
                helperText={getErrorByKey('name', touched, errors)}
                autoComplete="new-password"
              />
              {!!streamers && (
                <Autocomplete
                  disablePortal
                  options={streamers}
                  getOptionLabel={(opt) => opt.artisticName}
                  onChange={(_, value) =>
                    setFieldValue('professionalId', value?.user.id ?? '')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Streamer"
                      variant="standard"
                      placeholder="Streamer"
                      {...getFieldProps('professionalId')}
                      error={!!getErrorByKey('professionalId', touched, errors)}
                      helperText={getErrorByKey(
                        'professionalId',
                        touched,
                        errors
                      )}
                    />
                  )}
                />
              )}
              <DatePicker
                label="Data do evento"
                value={getFieldProps('date').value}
                onChange={(val) => {
                  setFieldValue('date', val);
                  setFieldValue('time', null);
                }}
                disablePast
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...getFieldProps('date')}
                    variant="standard"
                    error={!!getErrorByKey('date', touched, errors)}
                    helperText={getErrorByKey('date', touched, errors)}
                  />
                )}
              />
              <TimePicker
                label="Horário do evento"
                value={getFieldProps('time').value}
                onChange={(val) => setFieldValue('time', val)}
                disabled={!values.date}
                minTime={
                  !!values.date &&
                  values.date instanceof Date &&
                  values.date.toLocaleDateString() ===
                    new Date().toLocaleDateString()
                    ? values.date
                    : undefined
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...getFieldProps('time')}
                    variant="standard"
                    error={!!getErrorByKey('time', touched, errors)}
                    helperText={getErrorByKey('time', touched, errors)}
                  />
                )}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap={3}>
              <Typography variant="subtitle2">Foto do evento</Typography>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <>
                    <IconButton
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        '&:hover': {
                          backgroundColor: theme.palette.background.default,
                        },
                      }}
                      onClick={() => fileInput.current?.click()}
                      color="primary"
                    >
                      <PhotoCameraOutlined />
                    </IconButton>
                    <input
                      style={{ display: 'none' }}
                      accept="image/*"
                      type="file"
                      ref={fileInput}
                      onChange={handleFileSelect}
                    />
                  </>
                }
              >
                <Avatar
                  sx={{ width: 184, height: 184 }}
                  alt="user-image"
                  src={values.viewImage}
                />
              </Badge>
              {!!getErrorByKey('image', touched, errors) && (
                <FormHelperText error>
                  {getErrorByKey('image', touched, errors)}
                </FormHelperText>
              )}
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="secondary" type="submit">
              Adicionar
            </Button>
          </Box>
        </Box>
      </form>
    </Modal>
  );
};

export default EventModal;
