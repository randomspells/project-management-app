import React, { FC, ReactElement } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

type FormModalProps = {
  formTitle: string;
  isOpen: boolean;
  handleClose: () => void;
  children: ReactElement;
};

const FormModal: FC<FormModalProps> = ({
  isOpen,
  handleClose,
  formTitle,
  children,
}) => (
  <Dialog onClose={handleClose} open={isOpen}>
    <IconButton
      color='primary'
      onClick={handleClose}
      sx={{ position: 'absolute', right: 0, top: 0, m: 1 }}
    >
      <CloseRoundedIcon />
    </IconButton>
    <DialogTitle component='h1' variant='h5'>
      {formTitle}
    </DialogTitle>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default FormModal;
