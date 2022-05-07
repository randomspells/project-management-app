import React, { FC } from 'react';
import { Container, TextField, Button, Link, Typography, Box, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginForm: FC = () => (
  <Container component="form" maxWidth='xs'>
    <Box sx={{mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <TextField
        error = {!false}
        helperText="This field can't be empty"
        margin="normal"
        required
        fullWidth
        id="login"
        label="Login"
        name="login"
        autoComplete="username"
        autoFocus
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
        Login
      </Button>
      <Link href="#signup" variant="body2" sx={{ mx: 'auto' }}>
        {`Don't have an account? Sign Up`}
      </Link>
    </Box>
  </Container> 
  )

export default LoginForm