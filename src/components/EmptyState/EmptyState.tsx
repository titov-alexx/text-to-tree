import React from 'react';
import { INVALID_INPUT_MESSAGE } from '../../@common/errors';
import s from './EmptyState.module.scss';

export const EmptyState = ({ hasError = false }: { hasError?: boolean }) => (
  <div className={s.container}>
    <span className={s.icon}>{hasError ? '❌' : '🌳'}</span>
    <span className={hasError ? s.errorText : s.text}>
      {hasError ? INVALID_INPUT_MESSAGE : 'Your tree will appear here'}
    </span>
  </div>
);
