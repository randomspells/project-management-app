import React, { FC, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Box, Avatar } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import ControlledInput from '../../components/Inputs/ControlledInput/ControlledInput';
import { FormDataInterface } from '../../interfaces';
import { useSigninMutation } from '../../api/auth.api';
import { useAppDispatch } from '../../hooks/index';
import { login } from '../../slices/authSlice';
import { VALID_PASSWORD_INPUT, VALID_TEXT_INPUT } from '../../constants';
import { RouteEnum } from '../../enums';
import { setAlertResult, toggleAlertIsOpen } from '../../slices/alertSlice';

const LoginPage: FC = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });
  const [signin, { data, error, isSuccess, isLoading }] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = (formData: FormDataInterface) => {
    signin(formData).catch((e) => dispatch(setAlertResult({ error: e })));
    dispatch(toggleAlertIsOpen());
  };

  useEffect(() => {
    dispatch(setAlertResult({ error, isSuccess }));
  }, [error, isSuccess]);

  useEffect(() => {
    if (data?.token) {
      dispatch(login({ ...data, login: getValues('login') }));
      navigate(RouteEnum.Main);
    }
  }, [data]);

  return (
    <Container
      component='form'
      maxWidth='xs'
      sx={{ height: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Avatar sx={{ m: 2, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
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
          sx={{ mt: 3, mb: 2 }}
          disabled={!isValid}
        >
          Login
        </LoadingButton>
        <Link to={RouteEnum.Signup}>{`Don't have an account? Sign Up`}</Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
