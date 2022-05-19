import React, { FC } from 'react';
import { Link } from 'react-router-dom'
import { Container, Button, Typography, Box, Avatar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';
import { FormDataInterface } from '../../interfaces';
import { useSignupMutation } from '../../api/auth.api';
import { VALID_PASSWORD_INPUT, VALID_TEXT_INPUT } from '../../constants';
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
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          errorText="Please enter only letters (>2)"
          defaultValue=""
          control={control}
        />
        <ControlledInput
          name="login"
          label="Login"
          type="text"
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          errorText="Please enter only letters (>2)"
          defaultValue=""
          control={control}
        />
        <ControlledInput
          name="password"
          label="Password"
          type="password"
          rules={{ required: true, pattern: VALID_PASSWORD_INPUT }}
          errorText="Please enter EN letters and numbers (min length 6)"
          defaultValue=""
          control={control}
        />
        { isError && <Alert severity="error">{JSON.stringify(error)}</Alert>}
        { status==='fulfilled' && <Alert severity="success">User has been added</Alert>}
        { status==='pending' && 'In process ...'}
        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, mb: 2 }} disabled={!isValid}>
          Sign Up
        </Button>
        <Link to={RouteEnum.Login}>Already have an account? Login.</Link>
      </Box>
    </Container> 
    );
  };

export default SignUpForm