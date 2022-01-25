import { PaletteOptions } from '@mui/material';
import { colors } from '../contents/colorDefinitions';

const palette: PaletteOptions = {
  primary: {
    main: colors.primaryMain,
    dark: colors.primaryDark,
    light: colors.primaryLight,
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: colors.secondaryMain,
    dark: colors.secondaryDark,
    light: colors.secondaryLight,
  },
  error: {
    main: colors.errorMain,
    dark: colors.errorDark,
    light: colors.errorLight,
  },
  warning: {
    main: colors.warningMain,
    dark: colors.warningDark,
    light: colors.warningLight,
    contrastText: '#FFFFFF',
  },
  success: {
    main: colors.successMain,
    light: colors.successLight,
    dark: colors.successDark,
    contrastText: '#FFFFFF',
  },
  text: {
    primary: colors.textMain,
    secondary: colors.textDark,
    disabled: colors.disabled,
  },
  background: {
    default: colors.primaryBg,
    paper: colors.secondaryBg,
  },
  info: {
    main: colors.textLight,
  },
};

export default palette;
