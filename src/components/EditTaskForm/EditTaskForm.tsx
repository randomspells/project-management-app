import { Box, Button } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateTaskMutation } from '../../api/task.api';
import { FormTitleEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormDataInterface } from '../../interfaces';
import { setAlertResult } from '../../slices/alertSlice';
import { toggleEditTaskForm } from '../../slices/formSlice';
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

  const isEditTaskFormOpen = useAppSelector((state) => state.form.isEditTaskFormOpen);
  const currentTaskTitle = useAppSelector((state) => state.task.currentTask?.title);
  const currentTaskDescription = useAppSelector((state) => state.task.currentTask?.description);
  const currentTask = useAppSelector((state) => state.task.currentTask);
  const boardId = useAppSelector((state) => state.board.currentBoard?.id);
  const columnId = useAppSelector((state) => state.column.currentId);

  const [updateTask, { error: errorUpdate, isSuccess: isSuccessUpdate}] = useUpdateTaskMutation();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    reset();
    dispatch(toggleEditTaskForm());
  };

  const onSubmit = (data: FormDataInterface) => {
    const { taskTitle, taskDescription } = data;
    const updateTaskData = {
      body: {
        title: taskTitle,
        done: false,
        order: currentTask?.order,
        description: taskDescription,
        userId: currentTask?.userId,
        boardId,
        columnId,
      },
      boardId,
      columnId,
      taskId: currentTask?.id,
    }
    updateTask(updateTaskData).catch((e) => setAlertResult({ error: e}));
    handleClose();
  };

  useEffect(() => {
    dispatch(setAlertResult({ isSuccess: isSuccessUpdate, error: errorUpdate }));
  }, [isSuccessUpdate, errorUpdate]);
  
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
