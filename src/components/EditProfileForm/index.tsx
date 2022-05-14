import React, { FC } from 'react';
import {Button, Box, Stack} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';
import { VALID_PASSWORD_INPUT, VALID_TEXT_INPUT } from '../../constants';
import { FormDataInterface } from "../../interfaces/index";

const EditProfileForm: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data: FormDataInterface) => {
    console.log(data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ControlledInput
          name='Name'
          label='Name'
          errorText='Please, enter only letters'
          type='text'
          defaultValue=''
          rules={ {required: true, pattern: VALID_TEXT_INPUT} }
          control={control}
        />
        <ControlledInput
          name='Login'
          label='Login'
          errorText='Please, enter only letters'
          type='text'
          defaultValue=''
          rules={ {required: true, pattern: VALID_TEXT_INPUT} }
          control={control}
        />
        <ControlledInput
          name='Password'
          label='Password'
          errorText='Please, enter letters and numbers'
          type='password'
          defaultValue=''
          rules={ {required: true, pattern: VALID_PASSWORD_INPUT} }
          control={control}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button disabled={!isValid} variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button type='submit' disabled={!isValid} variant="contained" endIcon={<SaveIcon />}>
            Save
          </Button>
        </Stack>
      </Box>
    </Box>
  )
};

export default EditProfileForm;
