import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  useAppDispatch,
  useAppSelector,
  useSetAlertResult,
} from '../../../hooks';
import { FormDataInterface } from '../../../interfaces';
import { toggleNewTaskListForm } from '../../../slices/formSlice';
import FormModal from '../../modals/FormModal/FormModal';
import ControlledInput from '../../Inputs/ControlledInput/ControlledInput';
import { useCreateColumnMutation } from '../../../api/columns.api';
import { setAlertResult } from '../../../slices/alertSlice';

const TASK_LIST_TITLE_INPUT = {
  type: 'text',
  name: 'taskListTitle',
  errorText: 'Title is required',
  rules: { required: true },
};

const NewTaskListForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const isNewTaskListFormOpen = useAppSelector(
    (state) => state.form.isNewTaskListFormOpen,
  );

  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const [
    createColumn,
    { error: createColumnError, isSuccess: isCreateColumnSuccess },
  ] = useCreateColumnMutation();

  const handleClose = () => {
    reset();
    dispatch(toggleNewTaskListForm());
  };

  const onSubmit = (formData: FormDataInterface) => {
    const columnData = {
      body: {
        title: formData.taskListTitle,
      },
      boardId,
    };
    createColumn(columnData).catch((e) =>
      dispatch(setAlertResult({ error: e })),
    );
    handleClose();
  };

  const { type, name, rules } = TASK_LIST_TITLE_INPUT;

  useSetAlertResult(isCreateColumnSuccess, createColumnError);

  return (
    <FormModal
      isOpen={isNewTaskListFormOpen}
      handleClose={handleClose}
      formTitle={<FormattedMessage id='new_task_list' />}
    >
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          type={type}
          name={name}
          label={<FormattedMessage id='task_list_title' />}
          errorText={<FormattedMessage id='title_required' />}
          rules={rules}
          control={control}
          defaultValue=''
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{ mt: 2, mb: 2 }}
          disabled={!isValid}
        >
          <FormattedMessage id='create_task_list' />
        </Button>
      </Box>
    </FormModal>
  );
};

export default NewTaskListForm;
