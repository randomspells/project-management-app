import { Box, Button, Container, SxProps, Typography } from '@mui/material';
import React, { FC, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import SchemaRoundedIcon from '@mui/icons-material/SchemaRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import style from './WelcomePage.module.scss';
import { RouteEnum } from '../../enums';

type WelcomeInfoType = {
  title: string;
  description: string;
  icon: ReactElement;
};

const ICON_STYLE: SxProps = {
  mr: 1,
  fontSize: '40px',
  color: 'secondary.light',
};

const WELCOME_INFO: WelcomeInfoType[] = [
  {
    title: 'Team',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui aut sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!',
    icon: <GroupsRoundedIcon sx={ICON_STYLE} />,
  },
  {
    title: 'Project',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui aut sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!',
    icon: <SchemaRoundedIcon sx={ICON_STYLE} />,
  },
  {
    title: 'Course',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis numquam adipisci eveniet nesciunt qui aut sapiente facere ex voluptatum asperiores ad doloribus iusto aliquid rem, at molestias reiciendis labore!',
    icon: <SchoolRoundedIcon sx={ICON_STYLE} />,
  },
];

const WelcomePage: FC = () => {
  const { wrapper } = style;
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate(RouteEnum.Login);
  };

  const handleSignUp = () => {
    navigate(RouteEnum.Signup);
  };

  return (
    <Container component='main' className={wrapper} sx={{ mb: 4, flex: 'auto' }}>
      <Box component='nav' sx={{ display: 'flex', columnGap: 1, justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleLogIn}
        >
          Log In
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </Box>
      <Typography component='h1' variant='h1' textAlign='center' sx={{ my: { xs: 2, md: 4 } }}>
        Welcome!
      </Typography>
      <Box
        component='article'
        sx={{ display: 'flex', columnGap: 2, flexDirection: { xs: 'column', md: 'row' }, rowGap: 4 }}
      >
        {WELCOME_INFO.map((section) => (
          <Box component='section' key={section.title}>
            <Typography component='h2' variant='h2' sx={{ display: 'flex', alignItems: 'center' }}>
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
