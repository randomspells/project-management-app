import { Container } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const ErrorPage = () => <Container sx={{ height: '100%' }}><FormattedMessage id='error' /></Container>;

export default ErrorPage;
