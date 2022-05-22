import React, { FC, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmationProps = {
  itemTitle: string;
  isOpen: boolean;
  toggleConfirmation: () => void;
  handleAccept: () => void;
};

const Confirmation: FC<ConfirmationProps> = ({
  itemTitle,
  isOpen,
  toggleConfirmation,
  handleAccept,
}) => {
  const stopDialogPropagation = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const handleDeclineClick = (e: MouseEvent) => {
    stopDialogPropagation(e);
    toggleConfirmation();
  };

  const handleAcceptClick = (e: MouseEvent) => {
    stopDialogPropagation(e);
    toggleConfirmation();
    handleAccept();
  };

  return (
    <Dialog
      open={isOpen}
      onClick={stopDialogPropagation}
      onClose={handleDeclineClick}
      aria-describedby='confirmation dialog'
    >
      <DialogTitle sx={{ color: 'text.secondary' }}>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id='confirmation'>
          You are going to delete &#34;{itemTitle}&#34;. This action is
          irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeclineClick}>No</Button>
        <Button onClick={handleAcceptClick}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;
