import React, { FC } from 'react';
import style from './index.scss';

export type PrimaryButtonProps = {
  buttonHandler: () => void;
};

const PrimaryButton: FC<PrimaryButtonProps> = ({ buttonHandler }) => {
  const { button } = style;
  return (
    <button type='button' className={button} onClick={buttonHandler}>
      index
    </button>
  );
};

export default PrimaryButton;
