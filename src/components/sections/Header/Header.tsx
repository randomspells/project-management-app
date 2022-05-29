import React, {  FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { CloseRounded, MenuRounded } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { stringAvatar } from '../../../utils';
import { RouteEnum } from '../../../enums';
import { logOut } from '../../../slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import styles from './Header.module.scss';
import LOCALES from '../../../translation/locales';

interface HeaderProps {
  handleChange: (e: SelectChangeEvent) => void;
}

const Header: FC<HeaderProps> = ({ handleChange }) => {
  const { navbar, headerContainer, avatarWrapper, menuWrapper } = styles;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const login = useAppSelector((state) => state.auth.currentUser?.login);
  const isMatchQuery = useMediaQuery('(max-width:600px)');

  const headerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleOpenEditProfile = () => {
    closeMenu();
    navigate(RouteEnum.EditProfile);
  };

  const handleSignOut = () => {
    closeMenu();
    dispatch(logOut());
    navigate(RouteEnum.Welcome);
  };

  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  const languages = [
    { name: 'En', code: LOCALES.ENGLISH },
    { name: 'Ru', code: LOCALES.RUSSIAN }
  ];

  const {
    sx: { bgcolor },
    children,
  } = stringAvatar(login || 'Unknown User');

  useEffect(() => {
    const header = headerRef.current?.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header!.top, header!.height);
    };

    window.addEventListener('scroll', handleScrollEvent);

    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <Box
      component='header'
      id='sticky-header'
      className={`${navbar}${sticky.isSticky ? ` ${headerContainer}` : ''}`}
      ref={headerRef}
    >
      <Box component='section' className={avatarWrapper}>
        <Avatar sx={{ bgcolor, width: 35, height: 35, fontSize: 14 }}>
          {children}
        </Avatar>
        <Typography component='span' variant='body1' sx={{ pl: 1 }}>
          {login}
        </Typography>
      </Box>
      <Box>
        {!isMenuOpen ? (
          <IconButton
            onClick={openMenu}
            sx={{
              height: '40px',
              display: isMatchQuery ? 'block' : 'none',
              m: 1,
              zIndex: 500,
            }}
          >
            <MenuRounded />
          </IconButton>
        ) : (
          <Box
            sx={{
              display: isMatchQuery ? 'block' : 'none',
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              zIndex: 300,
            }}
          >
            <IconButton onClick={closeMenu} sx={{ m: 1 }}>
              <CloseRounded />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box
        component='section'
        className={menuWrapper}
        sx={{ display: isMenuOpen || !isMatchQuery ? 'flex' : 'none' }}
      >
        <Button onClick={handleOpenEditProfile}>
          <FormattedMessage id='edit_profile' />
        </Button>
        <Button onClick={handleSignOut}>
          <FormattedMessage id='sign_out' />
        </Button>
        <FormControl sx={{ m: 1, minWidth: 80 }} size='small'>
          <InputLabel id='label'>
            <FormattedMessage id='lang' />
          </InputLabel>
          <Select
            label='Lang'
            autoWidth
            labelId='label'
            defaultValue=''
            onChange={handleChange}
          >
            {languages.map(({ name, code }) => (
              <MenuItem value={code} key={code}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Header;
