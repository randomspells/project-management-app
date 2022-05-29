import { Box, CircularProgress } from '@mui/material';
import React, { FC } from 'react';

const Loader: FC = () => (
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
    <CircularProgress />
  </Box>
);

export default Loader;
