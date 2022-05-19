import { Alert, Grid, Snackbar } from '@mui/material';
import React, { FC } from 'react';

type AlertsProps = {
  successMessage: string | null;
  errorMessage: string | null;
};

const Alerts: FC<AlertsProps> = ({ successMessage, errorMessage }) => {

  const handleClose = () => {
  };

  const isOpen = true;

  return (
    <Grid
      item
      component='div'
      xs={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      {successMessage && (
        <Snackbar
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={2000}
        >
          <Alert severity='success'>{successMessage}</Alert>
        </Snackbar>
      )}
    </Grid>
  );
};
export default Alerts;
