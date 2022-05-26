import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useGetTasksQuery, useUpdateTaskMutation } from '../../api/task.api';
import { FormTitleEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormDataInterface } from '../../interfaces';
import { setAlertResult } from '../../slices/alertSlice';
import { toggleEditTaskForm } from '../../slices/formSlice';
import { countOrder } from '../../utils';
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
  const boardId = useAppSelector((state) => state.board.currentBoard?.id);
  const columnId = useAppSelector((state) => state.column.currentId);
  const taskId = useAppSelector((state) => state.task.currentTask?.id);
  const userId = useAppSelector((state) => state.auth.currentId);
  const { data: tasks = [] } = useGetTasksQuery({ boardId, columnId });

  const [updateTask] = useUpdateTaskMutation();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    reset();
    dispatch(toggleEditTaskForm());
  };

  const onSubmit = (data: FormDataInterface) => {
    const { title, description } = data;
    const updateTaskData = {
      taskId,
      body: {
        title,
        done: false,
        order: countOrder(tasks),
        description,
        userId,
        boardId,
        columnId,
      }
    }
    updateTask(updateTaskData).catch((e) => setAlertResult({ error: e}));
    handleClose();
  };
  
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
