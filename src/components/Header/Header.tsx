import React, { FC, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch } from '../../hooks/index';
import { toggleNewBoardForm } from '../../slices/formsSlice';
import styles from './Header.module.scss';

const Header: FC = () => {
  const { navbar, headerContainer, board, headerOption, primary } = styles;
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef<null | HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const handleNewBoardClick = () => {
    dispatch(toggleNewBoardForm());
  };

  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > elTopOffset + elHeight) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

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
    <header id='sticky-header' className={`${navbar}${sticky.isSticky ? ` ${headerContainer}` : ''}`} ref={headerRef}>
      <div className={board}>
        <Button onClick={handleNewBoardClick}>Create board</Button>
      </div>
      <div className={headerOption}>
        <Button>Edit profile</Button>
        <Button>Sign out</Button>
        <FormControl sx={{ m: 1, minWidth: 80 }} size='small'>
          <InputLabel id='demo-simple-select-autowidth-label' className={primary}>
            Lang
          </InputLabel>
          <Select label='Lang' autoWidth labelId='demo-simple-select-autowidth-label' id='demo-simple-select-autowidth'>
            <MenuItem value='ru'>Ru</MenuItem>
            <MenuItem value='en'>En</MenuItem>
          </Select>
        </FormControl>
      </div>
    </header>
  );
};

export default Header;
