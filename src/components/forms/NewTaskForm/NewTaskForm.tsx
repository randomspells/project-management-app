import React, { FC } from 'react';
import { Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import FormModal from '../../modals/FormModal/FormModal';
import ControlledInput from '../../Inputs/ControlledInput/ControlledInput';
import {
  useAppDispatch,
  useAppSelector,
  useSetAlertResult,
} from '../../../hooks';
import { toggleNewTaskForm } from '../../../slices/formSlice';
import { useCreateTaskMutation } from '../../../api/task.api';
import { setAlertResult } from '../../../slices/alertSlice';
import { DESCRIPTION_INPUT, TITLE_INPUT } from '../../../constants';
import { FormDataInterface } from '../../../interfaces';

const NewTaskForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const boardId = useAppSelector((state) => state.board.currentBoard?.id);
  const columnId = useAppSelector((state) => state.column.currentId);
  const userId = useAppSelector((state) => state.auth.currentId);
  const isNewTaskFormOpen = useAppSelector(
    (state) => state.form.isNewTaskFormOpen,
  );

  const [
    createTask,
    { error: createTaskError, isSuccess: isCreateTaskSuccess },
  ] = useCreateTaskMutation();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    reset();
    dispatch(toggleNewTaskForm());
  };

  const onSubmit = (data: FormDataInterface) => {
    const { title, description } = data;
    const taskData = {
      body: {
        title,
        description,
        userId,
      },
      boardId,
      columnId,
    };
    createTask(taskData).catch((e) => dispatch(setAlertResult({ error: e })));
    handleClose();
  };

  const {
    name: titleName,
    rules: titleRules,
    type: titleType,
  } = TITLE_INPUT;

  const {
    type: descriptionType,
    name: descriptionName,
    rules: descriptionRules,
  } = DESCRIPTION_INPUT;

  useSetAlertResult(isCreateTaskSuccess, createTaskError);

  return (
    <FormModal
      isOpen={isNewTaskFormOpen}
      handleClose={handleClose}
      formTitle={<FormattedMessage id='new_task' />}
    >
      <Box component='form' sx={{ p: 5 }} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          name={titleName}
          label={<FormattedMessage id='task_title' />}
          type={titleType}
          rules={titleRules}
          errorText={<FormattedMessage id='title_required' />}
          defaultValue=''
          control={control}
        />
        <ControlledInput
          name={descriptionName}
          label={<FormattedMessage id='task_description' />}
          type={descriptionType}
          multiline
          rows={4}
          rules={descriptionRules}
          errorText={<FormattedMessage id='description_required' />}
          defaultValue=''
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
          <FormattedMessage id='create_task' />
        </Button>
      </Box>
    </FormModal>
  );
};

export default NewTaskForm;
