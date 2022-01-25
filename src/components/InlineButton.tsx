import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface IInlineButtonProps {
  onClick: () => void;
  children: ReactNode;
}

const InlineButton = ({ children, onClick }: IInlineButtonProps) => {
  const handleClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <Typography
      sx={{
        cursor: 'pointer',
      }}
      component="span"
      color="primary"
      onClick={handleClick}
    >
      {children}
    </Typography>
  );
};

export default InlineButton;
