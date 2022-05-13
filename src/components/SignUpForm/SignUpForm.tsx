import React, { FC } from 'react';
import { Container, TextField, Button, Link, Typography, Box, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignUpForm: FC = () => (
  <Container component="form" maxWidth='xs' sx={{ height: '100%' }}>
    <Box sx={{mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'auto' }}>
      <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      <TextField
        error = {!false}
        helperText="This field can't be empty"
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        autoComplete="name"
        autoFocus
        />
      <TextField
        margin="normal"
        required
        fullWidth
        id="login"
        label="Login"
        name="login"
        autoComplete="username"
        />
      <TextField
        error = {false}
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        autoComplete="current-password"
        /> 
      <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
      <Link href="#login" variant="body2" sx={{ mx: 'auto' }}>
        Already have an account? Login.
      </Link>
    </Box>
  </Container> 
  )

export default SignUpForm