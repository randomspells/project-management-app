import React, { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Avatar } from '@mui/material';
import { stringAvatar } from '../../utils';
import { RouteEnum } from '../../enums';
import { logout} from '../../slices/authSlice';
import { useAppDispatch } from '../../hooks/index';
import styles from './Header.module.scss';


const Header: FC = () => {
  const { navbar, headerContainer, board, headerOption, primary } = styles;
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef<null | HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenEditProfile = () => {
    navigate(RouteEnum.EditProfile);
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate(RouteEnum.Welcome);
  };

  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  const {
    sx: { bgcolor },
    children,
  } = stringAvatar('Oawd Kwdawd');

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
        <Button onClick={handleOpenEditProfile}>Edit profile</Button>
        <Button onClick={handleSignOut}>Sign out</Button>
        <FormControl sx={{ m: 1, minWidth: 80 }} size='small'>
          <InputLabel id='label' className={primary}>
            Lang
          </InputLabel>
          <Select label='Lang' autoWidth labelId='label'>
            <MenuItem defaultValue=''> </MenuItem>
            <MenuItem value='ru'>Ru</MenuItem>
            <MenuItem value='en'>En</MenuItem>
          </Select>
        </FormControl>
      </div>
    </header>
  );
};

export default Header;
