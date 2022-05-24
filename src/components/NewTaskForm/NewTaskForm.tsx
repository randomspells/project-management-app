import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormModal from '../FormModal/FormModal';
import { FormTitleEnum } from '../../enums';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleNewTaskForm } from '../../slices/formSlice';
import { useCreateTaskMutation, useGetAllTasksQuery } from '../../api/task.api';
import { setAlertError, setAlertStatus, toggleAlertIsOpen } from '../../slices/alertSlice';
import { DESCRIPTION_INPUT, TITLE_INPUT } from '../../constants';
import { FormDataInterface } from '../../interfaces';

const NewTaskForm: FC = () => {
  const { 
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm({ mode: 'onChange' });

  const isNewTaskFormOpen = useAppSelector((state) => state.form.isNewTaskFormOpen);
  const { boardId } = useParams();
  const dispatch = useAppDispatch();

  const [createTask, { error, status }] = useCreateTaskMutation();
  const { data: tasks = []} = useGetAllTasksQuery(boardId, columnId);

  const handleClose = () => {
    reset();
    dispatch(toggleNewTaskForm());
  };

  const onSubmit = (data: FormDataInterface) => {
    const taskData = {
      body: {
        title: data.taskTitle,
        order: tasks.length[tasks.length - 1].order + 1,
      },
      boardId,
      columnId,
    }
    createTask(taskData).catch((e) => 
      dispatch(setAlertResult({ error: e})));
    dispatch(toggleAlertIsOpen());
    handleClose();
  }

  const onClose = () => {
    dispatch(toggleNewTaskForm());
  }

  const {
    name: titleName,
    label: titleLabel,
    errorText: titleErrorText,
    rules: titleRules,
    type: titleType,
  } = TITLE_INPUT;

  const {
    type: descriptionType,
    name: descriptionName,
    label: descriptionLabel,
    errorText: descriptionErrorText,
    rules: descriptionRules,
  } = DESCRIPTION_INPUT;

  useEffect(() => {
    dispatch(setAlertError({ error }));
    dispatch(setAlertStatus({ status }));
  }, [error, status]);
  
  return (
    <FormModal
      isOpen={isNewTaskFormOpen}
      handleClose={onClose}
      formTitle={FormTitleEnum.NewTask}
    >
      <Box component="form" sx={{p: 5}} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          name={titleName}
          label={titleLabel}
          type={titleType}
          rules={titleRules}
          errorText={titleErrorText}
          defaultValue=""
          control={control}
        />
        <ControlledInput
          name={descriptionName}
          label={descriptionLabel}
          type={descriptionType}
          multiline
          rows={4}
          rules={descriptionRules}
          errorText={descriptionErrorText}
          defaultValue=""
          control={control}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{ mt: 2, mb: 2 }}
          disabled={!isValid}
        >
          Create task
        </Button>
      </Box>
    </FormModal>
  );
};

export default NewTaskForm;