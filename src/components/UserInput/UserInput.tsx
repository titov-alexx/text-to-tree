import React, { ChangeEvent } from 'react';
import s from './UserInput.module.scss';

type UserInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export const UserInput = ({ value, onChange, onSubmit }: UserInputProps) => (
  <input
    type="text"
    className={s.userInput}
    value={value}
    onChange={onChange}
    onKeyDown={(e) => {
      if (e.key === 'Enter') onSubmit();
    }}
    placeholder="Example: A > B, C; A > D"
  />
);
