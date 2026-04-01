import React, { ChangeEvent } from 'react';
import { BuildButton } from '../BuildButton';
import { EmptyState } from '../EmptyState';
import { TreeView } from '../TreeView';
import { useTreeView } from '../TreeView/hooks/useTreeView';
import { UserInput } from '../UserInput';
import { useUserInput } from '../UserInput/hooks/useUserInput';
import s from './App.module.scss';

export const App = () => {
  const { userInput, onUserInputChange, isEmpty } = useUserInput();
  const { tree, errorMessage, buildTree, reset } = useTreeView();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInputChange(e);

    if (e.target.value.trim() === '') {
      reset();
    }
  };

  return (
    <div className={s.page}>
      <div className={s.content}>
        <h1 className={s.title}>Tree Builder</h1>
        <div className={s.inputRow}>
          <UserInput
            value={userInput}
            onChange={onInputChange}
            onSubmit={() => buildTree(userInput)}
          />
          <BuildButton
            disabled={isEmpty}
            onClick={() => buildTree(userInput)}
          />
        </div>
        {tree ? (
          <TreeView node={tree} />
        ) : (
          <EmptyState hasError={Boolean(errorMessage)} />
        )}
      </div>
    </div>
  );
};
