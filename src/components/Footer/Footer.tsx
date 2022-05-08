import { Avatar, Box, Container, Link, Typography } from '@mui/material';
import React, { FC } from 'react';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import style from './Footer.module.scss';

type GithubInfoType = {
  name: string;
  link: string;
  avatar: string;
};

const GITHUB_INFO: GithubInfoType[] = [
  {
    name: 'ViktorElenich',
    link: 'https://github.com/ViktorElenich',
    avatar: 'https://avatars.githubusercontent.com/u/89132609?v=4',
  },
  { name: 'kchrgn', link: 'https://github.com/kchrgn', avatar: 'https://avatars.githubusercontent.com/u/88321335?v=4' },
  {
    name: 'randomspells',
    link: 'https://github.com/randomspells',
    avatar: 'https://avatars.githubusercontent.com/u/81480069?v=4',
  },
];

const Footer: FC = () => {
  const { footer, userInfo, userAvatar, userLink, year, rsschoolInfoWrapper, rsschoolLogo } = style;
  return (
    <Container className={footer} component='footer' maxWidth={false} sx={{ display: 'flex', py: 2 }}>
      <Box
        component='section'
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          rowGap: 2,
        }}
      >
        {GITHUB_INFO.map((user) => (
          <Box className={userInfo} mr={4} key={user.name}>
            <Avatar className={userAvatar} alt={user.name} src={user.avatar} sx={{ width: 30, height: 30 }} />
            <Link
              className={userLink}
              href={user.link}
              target='_blank'
              underline='hover'
              sx={{ color: 'text.primary', ml: 1 }}
            >
              {user.name}
            </Link>
          </Box>
        ))}
      </Box>
      <Box className={rsschoolInfoWrapper} component='section' sx={{ alignSelf: { xs: 'end', md: 'center' } }}>
        <Typography
          className={year}
          component='span'
          sx={{ display: { xs: 'none', sm: 'block' }, opacity: { sm: '0', md: '1' }, fontSize: 14 }}
        >
          2022
        </Typography>
        <RocketLaunchRoundedIcon sx={{ color: 'text.primary', width: 20, height: 20, mx: 1, opacity: 0.8 }} />
        <Link className={rsschoolLogo} href='https://rs.school/index.html' target='_blank' />
      </Box>
    </Container>
  );
};

export default Footer;
