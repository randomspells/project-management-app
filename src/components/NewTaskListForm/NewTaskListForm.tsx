import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormTitleEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormDataInterface } from '../../interfaces';
import { toggleNewTaskListForm } from '../../slices/formsSlice';
import FormModal from '../FormModal/FormModal';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';

const TASK_LIST_TITLE_INPUT = {
  inputType: 'text',
  inputName: 'taskListTitle',
  labelText: 'Task list title',
  errorText: 'Title is required',
  validationRules: { required: true },
};

const NewTaskListForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const isNewTaskListFormOpen = useAppSelector((state) => state.forms.isNewTaskListFormOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    reset();
    dispatch(toggleNewTaskListForm());
  };

  const onSubmit = (data: FormDataInterface) => {
    console.log(data);
    handleClose();
  };

  // POST /boards/:boardId/columns request

  const { inputName, labelText, errorText, validationRules, inputType } = TASK_LIST_TITLE_INPUT;

  return (
    <FormModal isOpen={isNewTaskListFormOpen} handleClose={handleClose} formTitle={FormTitleEnum.NewTaskList}>
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          inputType={inputType}
          inputName={inputName}
          labelText={labelText}
          errorText={errorText}
          validationRules={validationRules}
          inputControl={control}
        />
        <Button type='submit' fullWidth variant='contained' size='large' sx={{ mt: 2, mb: 2 }} disabled={!isValid}>
          Create board
        </Button>
      </Box>
    </FormModal>
  );
};

export default NewTaskListForm;
