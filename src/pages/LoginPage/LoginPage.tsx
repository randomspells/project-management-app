import React, { FC, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import ControlledInput from '../../components/Inputs/ControlledInput/ControlledInput';
import { FormDataInterface } from '../../interfaces';
import { useSigninMutation } from '../../api/auth.api';
import {
  useAppDispatch,
  useAppSelector,
  useLogInWithRedirect,
  useSetAlertResult,
} from '../../hooks/index';
import { VALID_LOGIN_INPUT, VALID_PASSWORD_INPUT } from '../../constants';
import { RouteEnum } from '../../enums';
import { setAlertResult } from '../../slices/alertSlice';

const LoginPage: FC = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const [
    signin,
    {
      data: { token } = '',
      error: signinError,
      isSuccess: isSigninSuccess,
      isLoading: isSigninLoading,
    },
  ] = useSigninMutation();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.currentUser?.isAuthenticated,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData: FormDataInterface) => {
    try {
      await signin(formData);
    } catch (e) {
      dispatch(setAlertResult({ error: e }));
    }
  };

  useSetAlertResult(isSigninSuccess, signinError);
  useLogInWithRedirect(token, signinError, getValues('login'));

  useEffect(() => {
    if (isAuthenticated) {
      navigate(RouteEnum.Main);
    }
  }, []);

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
          <FormattedMessage id='login' />
        </Typography>
        <ControlledInput
          name='login'
          label={<FormattedMessage id='login_input' />}
          type='text'
          rules={{ required: true, pattern: VALID_LOGIN_INPUT }}
          errorText={<FormattedMessage id='validate_login_input' />}
          defaultValue=''
          control={control}
        />
        <ControlledInput
          name='password'
          label={<FormattedMessage id='password_input' />}
          type='password'
          rules={{ required: true, pattern: VALID_PASSWORD_INPUT }}
          errorText={<FormattedMessage id='validate_sigin_password' />}
          defaultValue=''
          control={control}
        />
        <LoadingButton
          loading={isSigninLoading}
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{ mt: 3, mb: 2 }}
          disabled={!isValid}
        >
          <FormattedMessage id='login' />
        </LoadingButton>
        <Link component={RouterLink} to={RouteEnum.Signup}>
          <FormattedMessage id='dont_have_account' />
        </Link>
      </Box>
    </Container>
  );
};

export default LoginPage;
