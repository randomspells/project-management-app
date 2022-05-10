import React, { FC, useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import styles from './header.module.scss';

const Header: FC = () => {
  const [sticky, setSticky] = useState({ isSticky: false, offset: 0 });
  const headerRef = useRef<null | HTMLDivElement>(null);

  const handleScroll = (elTopOffset: number, elHeight: number) => {
    if (window.pageYOffset > (elTopOffset + elHeight)) {
      setSticky({ isSticky: true, offset: elHeight });
    } else {
      setSticky({ isSticky: false, offset: 0 });
    }
  };

  useEffect(() => {
    const header = headerRef.current?.getBoundingClientRect();
    const handleScrollEvent = () => {
      handleScroll(header!.top, header!.height)
    }
 
    window.addEventListener('scroll', handleScrollEvent);
 
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  return (
    <header
    id="sticky-header"
    className={`${styles.navbar}${sticky.isSticky ? ` ${ styles.headerContainer}` : ''}`}
    ref={headerRef}
    >
      <div className={styles.board}>
        <Button>Create board</Button>
      </div>
      <div className={styles.headerOption}>
        <Button>Edit profile</Button>
        <Button>Sign out</Button>
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-simple-select-autowidth-label" className={styles.primary}>Lang</InputLabel>
          <Select
            label="Lang"
            autoWidth
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
          >
            <MenuItem value="ru">Ru</MenuItem>
            <MenuItem value="en">En</MenuItem>
          </Select>
        </FormControl>
      </div>
    </header>
  )
};

export default Header;
