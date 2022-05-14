import { Box, Button } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { FormTitleEnum } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormDataInterface } from '../../interfaces';
import { toggleNewBoardForm } from '../../slices/formsSlice';
import FormModal from '../FormModal/FormModal';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';

const BOARD_TITLE_INPUT = {
  type: 'text',
  name: 'boardTitle',
  label: 'Board title',
  errorText: 'Title is required',
  rules: { required: true },
};

const NewBoardForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' });

  const isNewBoardFormOpen = useAppSelector((state) => state.forms.isNewBoardFormOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    reset();
    dispatch(toggleNewBoardForm());
  };

  const onSubmit = (data: FormDataInterface) => {
    console.log(data);
    handleClose();
  };

  // POST /boards request

  const { name, label, errorText, rules, type } = BOARD_TITLE_INPUT;
  return (
    <FormModal isOpen={isNewBoardFormOpen} handleClose={handleClose} formTitle={FormTitleEnum.NewBoard}>
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
        <Button type='submit' fullWidth variant='contained' size='large' sx={{ mt: 2, mb: 2 }} disabled={!isValid}>
          Create board
        </Button>
      </Box>
    </FormModal>
  );
};

export default NewBoardForm;
