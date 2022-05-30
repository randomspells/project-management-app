import React, { FC, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Avatar, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import ControlledInput from '../../components/Inputs/ControlledInput/ControlledInput';
import { FormDataInterface } from '../../interfaces';
import { useSigninMutation, useSignupMutation } from '../../api/auth.api';
import { VALID_PASSWORD_INPUT, VALID_TEXT_INPUT } from '../../constants';
import { RouteEnum } from '../../enums';
import { setAlertResult } from '../../slices/alertSlice';
import {
  useAppDispatch,
  useAppSelector,
  useLogInWithRedirect,
  useSetAlertResult,
} from '../../hooks';

const SignUpPage: FC = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const [
    signup,
    {
      error: signupError,
      isSuccess: isSignupSuccess,
      isLoading: isSignupLoading,
    },
  ] = useSignupMutation();
  const [signin, { data: { token } = '' }] = useSigninMutation();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.currentUser?.isAuthenticated,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (formData: FormDataInterface) => {
    const { login, password, name } = formData;
    const signupBody = {
      name,
      login,
      password,
    };
    const signinBody = {
      login,
      password,
    };
    try {
      await signup(signupBody);
      await signin(signinBody);
    } catch (e) {
      dispatch(setAlertResult({ error: e }));
    }
  };

  useSetAlertResult(isSignupSuccess, signupError);
  useLogInWithRedirect(token, signupError, getValues('login'));

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
          <FormattedMessage id='sign_up' />
        </Typography>
        <ControlledInput
          name='name'
          label={<FormattedMessage id='name_input' />}
          type='text'
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          errorText={<FormattedMessage id='validate_signin_input' />}
          defaultValue=''
          control={control}
        />
        <ControlledInput
          name='login'
          label={<FormattedMessage id='login_input' />}
          type='text'
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          errorText={<FormattedMessage id='validate_signin_input' />}
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
          loading={isSignupLoading}
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{ mt: 1, mb: 2 }}
          disabled={!isValid}
        >
          <FormattedMessage id='sign_up' />
        </LoadingButton>
        <Link component={RouterLink} to={RouteEnum.Login}>
          <FormattedMessage id='have_account' />
        </Link>
      </Box>
    </Container>
  );
};

export default SignUpPage;
