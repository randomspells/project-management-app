import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { FormTitleEnum } from '../../../enums';
import {
  useAppDispatch,
  useAppSelector,
  useSetAlertResult,
} from '../../../hooks';
import { FormDataInterface } from '../../../interfaces';
import { toggleNewColumnForm } from '../../../slices/formSlice';
import FormModal from '../../modals/FormModal/FormModal';
import ControlledInput from '../../Inputs/ControlledInput/ControlledInput';
import { useCreateColumnMutation } from '../../../api/columns.api';
import { setAlertResult } from '../../../slices/alertSlice';

const TASK_LIST_TITLE_INPUT = {
  type: 'text',
  name: 'columnTitle',
  label: 'Task list title',
  errorText: 'Title is required',
  rules: { required: true },
};

const NewColumnForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const isNewColumnFormOpen = useAppSelector(
    (state) => state.form.isNewColumnFormOpen,
  );

  const dispatch = useAppDispatch();
  const { boardId } = useParams();

  const [
    createColumn,
    { error: createColumnError, isSuccess: isCreateColumnSuccess },
  ] = useCreateColumnMutation();

  const handleClose = () => {
    reset();
    dispatch(toggleNewColumnForm());
  };

  const onSubmit = (formData: FormDataInterface) => {
    const columnData = {
      body: {
        title: formData.columnTitle,
      },
      boardId,
    };
    createColumn(columnData).catch((e) =>
      dispatch(setAlertResult({ error: e })),
    );
    handleClose();
  };

  const { type, name, label, errorText, rules } = TASK_LIST_TITLE_INPUT;

  useSetAlertResult(isCreateColumnSuccess, createColumnError);

  return (
    <FormModal
      isOpen={isNewColumnFormOpen}
      handleClose={handleClose}
      formTitle={FormTitleEnum.NewColumn}
    >
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          type={type}
          name={name}
          label={label}
          errorText={errorText}
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
          Create task list
        </Button>
      </Box>
    </FormModal>
  );
};

export default NewColumnForm;
