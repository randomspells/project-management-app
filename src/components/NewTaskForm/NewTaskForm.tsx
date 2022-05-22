import React, { FC } from 'react';
import { Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormModal from '../FormModal/FormModal';
import { FormTitleEnum } from '../../enums';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleNewTaskForm } from '../../slices/formSlice';

const NewTaskForm: FC = () => {
  const { handleSubmit, control, formState: { isValid }} = useForm({ mode: 'onChange' });

  const isNewTaskFormOpen = useAppSelector((state) => state.form.isNewTaskFormOpen);
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    dispatch(toggleNewTaskForm());
  }

  const onClose = () => {
    dispatch(toggleNewTaskForm());
  }
  
  return (
    <FormModal isOpen={isNewTaskFormOpen} handleClose={onClose} formTitle={FormTitleEnum.NewTask}>
      <Box component="form" sx={{p: 5}} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          name="taskTitle"
          label="Title"
          type="text"
          rules={{ required: true }}
          errorText="This field can`t be empty"
          defaultValue=""
          control={control}
        />
        <ControlledInput
          name="taskDescription"
          label="Description"
          type="text"
          multiline
          rows={4}
          rules={{ required: false }}
          errorText="This field can`t be empty"
          defaultValue=""
          control={control}
        />
        <Button type='submit' fullWidth variant='contained' size='large' sx={{ mt: 2, mb: 2 }} disabled={!isValid}>
          Create task
        </Button>
      </Box>
    </FormModal>
  );
};

export default NewTaskForm;