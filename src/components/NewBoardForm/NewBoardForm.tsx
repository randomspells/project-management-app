import { Box } from '@mui/material';
import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCreateBoardMutation } from '../../api/board.api';
import { FormTitleEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { InputInterface, FormDataInterface } from '../../interfaces';
import { setAlertResult } from '../../slices/alertSlice';
import { toggleNewBoardForm } from '../../slices/formSlice';
import FormModal from '../FormModal/FormModal';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';

const BOARD_TITLE_INPUT: InputInterface = {
  type: 'text',
  name: 'title',
  label: 'Board title',
  errorText: 'Title is required',
  rules: { required: true },
};

const BOARD_DESCRIPTION_INPUT: InputInterface = {
  type: 'text',
  name: 'description',
  label: 'Board description',
  errorText: 'Description is required',
  rules: { required: true },
};

const NewBoardForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const isNewBoardFormOpen = useAppSelector(
    (state) => state.form.isNewBoardFormOpen,
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    reset();
    dispatch(toggleNewBoardForm());
  };

  const [createBoard, { error, isSuccess, isLoading }] =
    useCreateBoardMutation();

  const onSubmit = ({ title, description }: FormDataInterface) => {
    createBoard({
      title,
      description,
    }).catch((e) => dispatch(setAlertResult({ error: e })));
    handleClose();
  };

  const {
    name: titleName,
    label: titleLabel,
    errorText: titleErrorText,
    rules: titleRules,
    type: titleType,
  } = BOARD_TITLE_INPUT;

  const {
    type: descriptionType,
    name: descriptionName,
    label: descriptionLabel,
    errorText: descriptionErrorText,
    rules: descriptionRules,
  } = BOARD_DESCRIPTION_INPUT;

  useEffect(() => {
    dispatch(setAlertResult({ isSuccess, error }));
  }, [isSuccess, error]);

  return (
    <FormModal
      isOpen={isNewBoardFormOpen}
      handleClose={handleClose}
      formTitle={FormTitleEnum.NewBoard}
    >
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          type={titleType}
          name={titleName}
          label={titleLabel}
          errorText={titleErrorText}
          rules={titleRules}
          control={control}
          defaultValue=''
        />
        <ControlledInput
          type={descriptionType}
          name={descriptionName}
          label={descriptionLabel}
          errorText={descriptionErrorText}
          rules={descriptionRules}
          control={control}
          defaultValue=''
          rows={4}
          multiline
        />
        <LoadingButton
          loading={isLoading}
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{ mt: 2, mb: 2 }}
          disabled={!isValid}
        >
          Create board
        </LoadingButton>
      </Box>
    </FormModal>
  );
};

export default NewBoardForm;
