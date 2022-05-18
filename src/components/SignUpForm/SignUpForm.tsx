import React, { FC } from 'react';
import { Container, Button, Link, Typography, Box, Avatar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';
import { FormDataInterface } from '../../interfaces';
import { useSignupMutation } from '../../api/auth.api';
import { RouteEnum }  from '../../enums';

const SignUpForm: FC = () => {
  const { handleSubmit, control, formState: { isValid }} = useForm({ mode: 'onChange' });
  const [ signup, {isError, error, status} ] = useSignupMutation();

  const onSubmit = async (formData: FormDataInterface) => {
    await signup(formData)
      .catch((e) => console.error(e)); 
  }

  return (
    <Container component="form" maxWidth='xs' sx={{ height: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'auto' }}>
        <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <ControlledInput
          name="name"
          label="Name"
          type="text"
          rules={{ required: true }}
          errorText="This field can`t be empty"
          defaultValue=""
          control={control}
        />
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
          type="password"
          rules={{ required: true }}
          errorText="This field can`t be empty"
          defaultValue=""
          control={control}
        />
        { isError && <Alert severity="error">{JSON.stringify(error)}</Alert>}
        { status==='fulfilled' && <Alert severity="success">User has been added</Alert>}
        { status==='pending' && 'In process ...'}
        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }} disabled={!isValid}>
          Sign Up
        </Button>
        <Link href={RouteEnum.Login} variant="body2" sx={{ mx: 'auto' }}>
          Already have an account? Login.
        </Link>
      </Box>
    </Container> 
    );
  };

export default SignUpForm