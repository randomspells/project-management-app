import React, { FC, useEffect, useState } from 'react';
import { Button, Box, Stack, Typography, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import ControlledInput from '../../components/Inputs/ControlledInput/ControlledInput';
import { VALID_PASSWORD_INPUT, VALID_TEXT_INPUT } from '../../constants';
import { FormDataInterface } from '../../interfaces/index';
import { useSigninMutation } from '../../api/auth.api';
import { setAlertResult } from '../../slices/alertSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../api/user.api';
import Confirmation from '../../components/Confirmation/Confirmation';
import { logIn, logOut } from '../../slices/authSlice';

const EditProfilePage: FC = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const [signin, { error: signinError }] = useSigninMutation();
  const [
    updateUser,
    { error: updateUserError, isSuccess: isUpdateUserSuccess, isLoading },
  ] = useUpdateUserMutation();
  const [deleteUser, { error: deleteUserError }] = useDeleteUserMutation();

  const currentLogin = useAppSelector((state) => state.auth.currentUser?.login);
  const currentId = useAppSelector((state) => state.auth.currentId);

  const dispatch = useAppDispatch();

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

  const onSubmit = (data: FormDataInterface) => {
    const { oldPassword, password, login, name } = data;
    signin({
      login: currentLogin,
      password: oldPassword,
    })
      .then((result) => {
        if (!('data' in result)) return;
        if (result.data.token) {
          const { token } = result.data;
          updateUser({
            body: {
              login,
              name,
              password,
            },
            userId: currentId,
          }).catch((e) => dispatch(setAlertResult({ error: e })));
          dispatch(logIn({ login, token }));
        }
      })
      .catch((e) => dispatch(setAlertResult({ error: e })));
  };

  const handleUserDelete = () => {
    deleteUser({
      id: currentId,
    })
      .then(() => dispatch(logOut()))
      .catch((e) => dispatch(setAlertResult({ error: e })));
  };

  useEffect(() => {
    if (signinError) {
      dispatch(setAlertResult({ error: signinError }));
    } else if (updateUserError || isUpdateUserSuccess) {
      dispatch(
        setAlertResult({
          error: updateUserError,
          isSuccess: isUpdateUserSuccess,
        }),
      );
    } else if (deleteUserError) {
      dispatch(
        setAlertResult({
          error: deleteUserError,
        }),
      );
    }
  }, [signinError, updateUserError, isUpdateUserSuccess, deleteUserError]);

  return (
    <Container
      component='form'
      maxWidth='xs'
      sx={{ height: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}>
        Edit profile
      </Typography>
      <Box>
        <ControlledInput
          name='name'
          label='Name'
          errorText='Please, enter only letters'
          type='text'
          defaultValue=''
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          control={control}
        />
        <ControlledInput
          name='login'
          label='Login'
          errorText='Please, enter only letters'
          type='text'
          defaultValue=''
          rules={{ required: true, pattern: VALID_TEXT_INPUT }}
          control={control}
        />
        <ControlledInput
          name='oldPassword'
          label='Old password'
          errorText='Please, enter old password'
          type='password'
          defaultValue=''
          rules={{ required: true }}
          control={control}
        />
        <ControlledInput
          name='password'
          label='New password'
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
          <LoadingButton
            loading={isLoading}
            type='submit'
            disabled={!isValid}
            variant='contained'
            endIcon={<SaveIcon />}
          >
            Save
          </LoadingButton>
          <Button
            variant='outlined'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={toggleConfirmation}
          >
            Delete user
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
