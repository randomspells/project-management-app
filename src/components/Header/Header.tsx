import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Avatar } from '@mui/material';
import {  stringAvatar } from '../../utils';
import { RouteEnum, StorageEnum } from '../../enums';
import { logOut } from '../../slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import styles from './Header.module.scss';
import LOCALES from '../../translation/locales';

const Header: FC = () => {
  const { navbar, headerContainer, board, headerOption } = styles;
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const login = useAppSelector((state) => state.auth.currentUser?.login);

  const headerRef = useRef<null | HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenEditProfile = () => {
    navigate(RouteEnum.EditProfile);
  };

  const handleSignOut = () => {
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

  const handleChangeLanguages = (e: SelectChangeEvent<string>) => {
    localStorage.setItem(StorageEnum.Locale, e.target.value);
  };

  const currentLocale = useAppSelector((state) => state.translation.currentLang) as string;

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
    <header
      id='sticky-header'
      className={`${navbar}${sticky.isSticky ? ` ${headerContainer}` : ''}`}
      ref={headerRef}
    >
      <div className={board}>
        <Avatar sx={{ bgcolor, width: 35, height: 35, fontSize: 14 }}>
          {children}
        </Avatar>
      </div>
      <div className={headerOption}>
        <Button onClick={handleOpenEditProfile}>
          <FormattedMessage id='edit_profile' />
        </Button>
        <Button onClick={handleSignOut}>Sign out</Button>
        <FormControl sx={{ m: 1, minWidth: 80 }} size='small'>
          <InputLabel id='label'>
            <FormattedMessage id='lang' />
          </InputLabel>
          <Select
            label='Lang'
            autoWidth
            labelId='label'
            value={currentLocale}
            onChange={handleChangeLanguages}
          >
            {languages.map(({ name, code }) => (
              <MenuItem value={code} key={code}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </header>
  );
};

export default Header;
