import React, { FC } from 'react';
import { Alert, Box, Grid, Snackbar } from '@mui/material';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleAlertIsOpen } from '../../slices/alertSlice';
import { getErrorMessage } from '../../utils';

const Alerts: FC = () => {
  const error = useAppSelector((state) => state.alert.error);
  const status = useAppSelector((state) => state.alert.status);
  const isOpen = useAppSelector((state) => state.alert.isOpen);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(toggleAlertIsOpen());
  };

  return (
    <Grid
      item
      component='div'
      xs={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'absolute',
        zIndex: '9999',
      }}
    >
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={4000}
      >
        <Box>
          {status === QueryStatus.rejected && (
            <Alert severity='error'>{getErrorMessage(error)}</Alert>
          )}
          {status === QueryStatus.fulfilled && (
            <Alert severity='success'>Success</Alert>
          )}
        </Box>
      </Snackbar>
    </Grid>
  );
};
export default Alerts;
