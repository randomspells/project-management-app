import React, { FC, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { stopPropagation } from '../../../utils';

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
  const handleDeclineClick = (e: MouseEvent) => {
    stopPropagation(e);
    toggleConfirmation();
  };

  const handleAcceptClick = (e: MouseEvent) => {
    stopPropagation(e);
    toggleConfirmation();
    handleAccept();
  };

  return (
    <Dialog
      open={isOpen}
      onClick={handleDeclineClick}
      onClose={handleDeclineClick}
      aria-describedby='confirmation dialog'
    >
      <Box onClick={stopPropagation}>
        <DialogTitle sx={{ color: 'text.secondary' }}>
          <FormattedMessage id='sure' />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='confirmation'>
            <FormattedMessage id='you_are_going_to_delete' /> &#34;{itemTitle}&#34;<FormattedMessage id='irreversible' />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeclineClick}><FormattedMessage id='no' /></Button>
          <Button onClick={handleAcceptClick}><FormattedMessage id='yes' /></Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Confirmation;
