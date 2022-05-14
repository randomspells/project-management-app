import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormTitleEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormDataInterface } from '../../interfaces';
import { toggleEditTaskForm } from '../../slices/formsSlice';
import FormModal from '../FormModal/FormModal';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';

const TASK_TITLE_INPUT = {
  type: 'text',
  name: 'taskTitle',
  label: 'Task Title',
  errorText: 'Title is required',
  rules: { required: true },
};

const TASK_DESCRIPTION_INPUT = {
  type: 'text',
  name: 'taskDescription',
  label: 'Task Description',
  errorText: ' ',
  rules: { required: false },
  multiline: true,
  rows: 4,
};

const EditTaskForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const isEditTaskFormOpen = useAppSelector((state) => state.forms.isEditTaskFormOpen);
  const currentTaskTitle = useAppSelector((state) => state.task.currentTask?.title);
  const currentTaskDescription = useAppSelector((state) => state.task.currentTask?.description);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    reset();
    dispatch(toggleEditTaskForm());
  };

  const onSubmit = (data: FormDataInterface) => {
    console.log(data);
    handleClose();
  };

  // PUT /boards/:boardId/columns/:columnId/tasks request

  return (
    <FormModal isOpen={isEditTaskFormOpen} handleClose={handleClose} formTitle={FormTitleEnum.EditTask}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          type={TASK_TITLE_INPUT.type}
          name={TASK_TITLE_INPUT.name}
          label={TASK_TITLE_INPUT.label}
          errorText={TASK_TITLE_INPUT.errorText}
          rules={TASK_TITLE_INPUT.rules}
          defaultValue={currentTaskTitle || ''}
          control={control}
        />
        <ControlledInput
          type={TASK_DESCRIPTION_INPUT.type}
          name={TASK_DESCRIPTION_INPUT.name}
          label={TASK_DESCRIPTION_INPUT.label}
          errorText={TASK_DESCRIPTION_INPUT.errorText}
          rules={TASK_DESCRIPTION_INPUT.rules}
          defaultValue={currentTaskDescription || ''}
          multiline={TASK_DESCRIPTION_INPUT.multiline}
          rows={4}
          control={control}
        />
        <Button type='submit' fullWidth variant='contained' size='large' sx={{ mt: 2, mb: 2 }} disabled={!isValid}>
          Save task
        </Button>
      </Box>
    </FormModal>
  );
};

export default EditTaskForm;
