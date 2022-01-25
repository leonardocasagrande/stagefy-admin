import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Card,
  Fade,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useFormik } from 'formik';
import { getErrorByKey } from 'helpers/utils';
import { useState } from 'react';
import { loginSchema } from 'schemas';
import { TLoginSchema } from 'schemas/login';

interface ILoginCard {
  onSubmit: (values: TLoginSchema) => void;
}

const LoginCard = ({ onSubmit }: ILoginCard) => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: loginSchema.getDefault(),
    validationSchema: loginSchema,
    onSubmit,
  });

  const handlePasswordShow = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Fade in>
      <Card>
        <form onSubmit={handleSubmit}>
          <Box p={6} display="flex" flexDirection="column" gap={6}>
            <Typography variant="h1">Login</Typography>
            <TextField
              fullWidth
              label="E-mail"
              placeholder="Digite seu e-mail"
              variant="standard"
              error={!!getErrorByKey('email', touched, errors)}
              helperText={getErrorByKey('email', touched, errors)}
              {...getFieldProps('email')}
            />
            <Box display="flex" flexDirection="column" gap={4}>
              <TextField
                fullWidth
                label="Senha"
                placeholder="Digite sua senha"
                error={!!getErrorByKey('password', touched, errors)}
                helperText={
                  getErrorByKey('password', touched, errors) ??
                  'A senha deve conter pelo menos 8 digitos.'
                }
                variant="standard"
                type={showPassword ? 'text' : 'password'}
                {...getFieldProps('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="info"
                        onClick={handlePasswordShow}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button color="primary">Esqueci minha senha</Button>
            </Box>
            <Box
              display="flex"
              gap={3}
              alignItems="center"
              flexDirection="column"
            >
              <Box width={200}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  Entrar
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Card>
    </Fade>
  );
};

export default LoginCard;
