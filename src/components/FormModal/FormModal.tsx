import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React, { FC, ReactElement } from 'react';

type FormModalProps = {
  formTitle: string;
  isOpen: boolean;
  handleClose: () => void;
  children: ReactElement;
};

const FormModal: FC<FormModalProps> = ({ isOpen, handleClose, formTitle, children }) => (
  <Dialog onClose={handleClose} open={isOpen}>
    <DialogTitle component='h1' variant='h5'>
      {formTitle}
    </DialogTitle>
    <DialogContent>{children}</DialogContent>
  </Dialog>
);

export default FormModal;
