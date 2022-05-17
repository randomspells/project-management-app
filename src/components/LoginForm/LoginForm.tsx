import React, { FC } from 'react';
import { Container, Button, Link, Typography, Box, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';
import { FormDataInterface } from '../../interfaces';

const LoginForm: FC = () => {
  const { handleSubmit, control, formState: { isValid }} = useForm({ mode: 'onChange' });

  const onSubmit = (data: FormDataInterface) => {
    console.log(data);
  }

  return (
    <Container component="form" maxWidth='xs' sx={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <ControlledInput
          name="login"
          label="Login"
          type="text"
          rules={{ required: true }}
          errorText="This field can`t be empty"
          defaultValue=""
          control={control}
        />
        <ControlledInput
          name="password"
          label="Password"
          type="text"
          rules={{ required: true }}
          errorText="This field can`t be empty"
          defaultValue=""
          control={control}
        />
        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }} disabled={!isValid}>
          Login
        </Button>
        <Link href="#signup" variant="body2" sx={{ mx: 'auto' }}>
          {`Don't have an account? Sign Up`}
        </Link>
      </Box>
    </Container> 
  )
};

export default LoginForm