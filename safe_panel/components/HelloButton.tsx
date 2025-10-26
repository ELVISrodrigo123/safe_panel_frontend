import React from 'react';
import Button from '@mui/material/Button';

interface HelloButtonProps {
  name: string;
  onClick?: () => void;
}

const HelloButton: React.FC<HelloButtonProps> = ({ name, onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Hello, {name}!
    </Button>
  );
};

export default HelloButton;
