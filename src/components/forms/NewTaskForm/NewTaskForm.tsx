import React, { FC } from 'react';
import { Button, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import FormModal from '../../modals/FormModal/FormModal';
import { FormTitleEnum } from '../../../enums';
import ControlledInput from '../../inputs/ControlledInput/ControlledInput';
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

  useSetAlertResult(isCreateTaskSuccess, createTaskError);

  return (
    <FormModal
      isOpen={isNewTaskFormOpen}
      handleClose={handleClose}
      formTitle={FormTitleEnum.NewTask}
    >
      <Box component='form' sx={{ p: 5 }} onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          name={titleName}
          label={titleLabel}
          type={titleType}
          rules={titleRules}
          errorText={titleErrorText}
          defaultValue=''
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
          Create task
        </Button>
      </Box>
    </FormModal>
  );
};

export default NewTaskForm;
