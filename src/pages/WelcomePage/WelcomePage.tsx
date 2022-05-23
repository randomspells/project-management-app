import { Box, Button, Container, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteEnum } from '../../enums';
import style from './WelcomePage.module.scss';
import { WELCOME_INFO } from '../../constants';

const WelcomePage: FC = () => {
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate(RouteEnum.Login);
  };

  const handleSignUp = () => {
    navigate(RouteEnum.Signup);
  };

  const { wrapper } = style;
  return (
    <Container
      component='main'
      className={wrapper}
      sx={{ mb: 4, flex: 'auto', mt: 2 }}
    >
      <Box
        component='nav'
        sx={{ display: 'flex', columnGap: 1, justifyContent: 'flex-end' }}
      >
        <Button variant='contained' color='primary' onClick={handleLogIn}>
          Log In
        </Button>
        <Button variant='contained' color='primary' onClick={handleSignUp}>
          Sign Up
        </Button>
      </Box>
      <Typography
        component='h1'
        variant='h1'
        textAlign='center'
        sx={{ my: { xs: 2, md: 4 } }}
      >
        Welcome!
      </Typography>
      <Box
        component='article'
        sx={{
          display: 'flex',
          columnGap: 2,
          flexDirection: { xs: 'column', md: 'row' },
          rowGap: 4,
        }}
      >
        {WELCOME_INFO.map((section) => (
          <Box component='section' key={section.title}>
            <Typography
              component='h2'
              variant='h2'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {section.icon}
              {section.title}
            </Typography>
            <Typography component='p'> {section.description}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default WelcomePage;
