import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toggleNewBoardForm } from '../../slices/formsSlice';
import FormModal from '../FormModal/FormModal';
import ControlledInput from '../Inputs/ControlledInput/ControlledInput';

const BOARD_TITLE_INPUT = {
  inputType: 'text',
  inputName: 'boardTitle',
  labelText: 'Board title',
  errorText: 'Title is required',
  validationRules: { required: true },
};

type FormDataType = {
  [x: string]: string;
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

  const onSubmit = (data: FormDataType) => {
    console.log(data);
    handleClose();
  };

  // POST /boards request

  const { inputName, labelText, errorText, validationRules, inputType } = BOARD_TITLE_INPUT;
  return (
    <FormModal isOpen={isNewBoardFormOpen} handleClose={handleClose} formTitle='New board'>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
    </FormModal>
  );
};

export default NewBoardForm;
