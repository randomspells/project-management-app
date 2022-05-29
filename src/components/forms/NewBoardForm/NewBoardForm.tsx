import { Box } from '@mui/material';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormattedMessage } from 'react-intl';
import { useCreateBoardMutation } from '../../../api/board.api';
import { TITLE_INPUT, DESCRIPTION_INPUT } from '../../../constants';
import {
  useAppDispatch,
  useAppSelector,
  useSetAlertResult,
} from '../../../hooks';
import { FormDataInterface } from '../../../interfaces';
import { setAlertResult } from '../../../slices/alertSlice';
import { toggleNewBoardForm } from '../../../slices/formSlice';
import FormModal from '../../modals/FormModal/FormModal';
import ControlledInput from '../../Inputs/ControlledInput/ControlledInput';

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
    rules: titleRules,
    type: titleType,
  } = TITLE_INPUT;

  const {
    type: descriptionType,
    name: descriptionName,
    rules: descriptionRules,
  } = DESCRIPTION_INPUT;

  useSetAlertResult(isSuccess, error);

  return (
    <FormModal
      isOpen={isNewBoardFormOpen}
      handleClose={handleClose}
      formTitle={<FormattedMessage id='new_board' />}
    >
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <ControlledInput
          type={titleType}
          name={titleName}
          label={<FormattedMessage id='board_title' />}
          errorText={<FormattedMessage id='title_required' />}
          rules={titleRules}
          control={control}
          defaultValue=''
        />
        <ControlledInput
          type={descriptionType}
          name={descriptionName}
          label={<FormattedMessage id='board_description' />}
          errorText={<FormattedMessage id='description_required' />}
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
          <FormattedMessage id='create_board' />
        </LoadingButton>
      </Box>
    </FormModal>
  );
};

export default NewBoardForm;
