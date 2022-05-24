import React, { FC, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import ControlledInput from '../../components/Inputs/ControlledInput/ControlledInput';
import { FormDataInterface } from '../../interfaces';
import { useSigninMutation, useSignupMutation } from '../../api/auth.api';
import { VALID_PASSWORD_INPUT, VALID_TEXT_INPUT } from '../../constants';
import { RouteEnum } from '../../enums';
import { setAlertResult } from '../../slices/alertSlice';
import { useAppDispatch } from '../../hooks';
import { logIn } from '../../slices/authSlice';

const SignUpPage: FC = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const [signup, { error, isSuccess, isLoading }] = useSignupMutation();
  const [signin, { data: { token } = '' }] = useSigninMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData: FormDataInterface) => {
    const { login, password } = formData;
    await signup(formData)
      .then(() =>
        signin({
          login,
          password,
        }).catch((e) => dispatch(setAlertResult({ error: e }))),
      )
      .catch((e) => dispatch(setAlertResult({ error: e })));
  };

  useEffect(() => {
    dispatch(setAlertResult({ error, isSuccess }));
  }, [error, isSuccess]);

  useEffect(() => {
    if (token) {
      const login = getValues('login');
      dispatch(logIn({ token, login }));
      navigate(RouteEnum.Main);
    }
  }, [token]);

  return (
    <Container
      component='form'
      maxWidth='xs'
      sx={{ height: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 'auto',
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <ControlledInput
          name='name'
          label='Name'
          type='text'
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          errorText='Please enter only EN letters. Min length 3.'
          defaultValue=''
          control={control}
        />
        <ControlledInput
          name='login'
          label='Login'
          type='text'
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          errorText='Please enter only EN letters. Min length 3.'
          defaultValue=''
          control={control}
        />
        <ControlledInput
          name='password'
          label='Password'
          type='password'
          rules={{ required: true, pattern: VALID_PASSWORD_INPUT }}
          errorText='Please enter EN letters and numbers. Min length 6.'
          defaultValue=''
          control={control}
        />
        <LoadingButton
          loading={isLoading}
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{ mt: 1, mb: 2 }}
          disabled={!isValid}
        >
          Sign Up
        </LoadingButton>
        <Link component={RouterLink} to={RouteEnum.Login}>
          Already have an account? Login.
        </Link>
      </Box>
    </Container>
  );
};

export default SignUpPage;
