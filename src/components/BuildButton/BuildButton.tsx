import React from 'react';
import s from './BuildButton.module.scss';

type BuildButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

export const BuildButton = ({ disabled, onClick }: BuildButtonProps) => (
  <button className={s.buildBtn} onClick={onClick} disabled={disabled}>
    Build Tree
  </button>
);
