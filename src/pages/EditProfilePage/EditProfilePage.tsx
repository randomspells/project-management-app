import React, { FC, useState } from 'react';
import { Button, Box, Stack, Typography, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import ControlledInput from '../../components/Inputs/ControlledInput/ControlledInput';
import { VALID_PASSWORD_INPUT, VALID_TEXT_INPUT } from '../../constants';
import { FormDataInterface, UserInterface } from '../../interfaces/index';
import { useSigninMutation } from '../../api/auth.api';
import { setAlertResult } from '../../slices/alertSlice';
import { useAppDispatch, useAppSelector, useSetAlertResult } from '../../hooks';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../api/user.api';
import Confirmation from '../../components/modals/Confirmation/Confirmation';
import { logIn, logOut } from '../../slices/authSlice';
import { RouteEnum } from '../../enums';

export const checkIfLoginExist = (
  users: UserInterface[],
  login: string,
): boolean => users.some((user: UserInterface) => user.login === login);

const EditProfilePage: FC = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const { data: users = [] } = useGetUsersQuery();
  const [signin, { error: signinError, isSuccess: isSigninSuccess }] =
    useSigninMutation();
  const [
    updateUser,
    { error: updateUserError, isSuccess: isUpdateUserSuccess, isLoading },
  ] = useUpdateUserMutation();
  const [
    deleteUser,
    { error: deleteUserError, isSuccess: isDeleteUserSuccess },
  ] = useDeleteUserMutation();

  const currentLogin = useAppSelector((state) => state.auth.currentUser?.login);
  const currentId = useAppSelector((state) => state.auth.currentId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
  });

  const toggleConfirmation = () => {
    setIsConfirmationOpen(!isConfirmationOpen);
  };

  const handleCancelClick = () => {
    navigate(RouteEnum.Main);
  };

  const onSubmit = (data: FormDataInterface) => {
    if (!currentLogin) return;
    const { oldPassword, password, login, name } = data;
    const loginBody = {
      login: currentLogin,
      password: oldPassword,
    };
    const updateUserBody = {
      login,
      name,
      password,
    };
    try {
      const isLoginExist = checkIfLoginExist(users, login);
      if (isLoginExist && login !== currentLogin) {
        throw new Error('Login already exist!');
      }
      signin(loginBody).then((result) => {
        if (!('data' in result)) return;
        if (result.data.token) {
          const { token } = result.data;
          updateUser({
            body: updateUserBody,
            userId: currentId,
          });
          dispatch(logIn({ login, token }));
        }
      });
    } catch (e) {
      dispatch(setAlertResult({ error: e }));
    }
  };

  const handleUserDelete = () => {
    deleteUser({
      id: currentId,
    })
      .then(() => dispatch(logOut()))
      .catch((e) => dispatch(setAlertResult({ error: e })));
  };

  useSetAlertResult(isSigninSuccess, signinError);
  useSetAlertResult(isDeleteUserSuccess, deleteUserError);
  useSetAlertResult(isUpdateUserSuccess, updateUserError);

  return (
    <Container
      component='form'
      maxWidth='xs'
      sx={{ height: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}>
        <FormattedMessage id='edit_profile' />
      </Typography>
      <Box>
        <ControlledInput
          name='name'
          label={<FormattedMessage id='name_input' />}
          errorText='Please, enter only letters'
          type='text'
          defaultValue=''
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          control={control}
        />
        <ControlledInput
          name='login'
          label={<FormattedMessage id='login_input' />}
          errorText='Please, enter only letters'
          type='text'
          defaultValue=''
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          control={control}
        />
        <ControlledInput
          name='oldPassword'
          label={<FormattedMessage id='old_password' />}
          errorText='Please, enter old password'
          type='password'
          defaultValue=''
          rules={{ required: true }}
          control={control}
        />
        <ControlledInput
          name='password'
          label={<FormattedMessage id='new_password' />}
          errorText='Please, enter letters and numbers'
          type='password'
          defaultValue=''
          rules={{ required: true, pattern: VALID_PASSWORD_INPUT }}
          control={control}
        />
        <Stack
          direction='row'
          spacing={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button variant='outlined' onClick={handleCancelClick}>
            <FormattedMessage id='cancel' />
          </Button>
          <LoadingButton
            loading={isLoading}
            type='submit'
            disabled={!isValid}
            variant='contained'
            endIcon={<SaveIcon />}
          >
            <FormattedMessage id='save' />
          </LoadingButton>
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={toggleConfirmation}
          >
            <FormattedMessage id='delete_user' />
          </Button>
          <Confirmation
            itemTitle={currentLogin || ''}
            isOpen={isConfirmationOpen}
            toggleConfirmation={toggleConfirmation}
            handleAccept={handleUserDelete}
          />
        </Stack>
      </Box>
    </Container>
  );
};

export default EditProfilePage;
