import { useRef, useState } from 'react';
import { INVALID_INPUT_MESSAGE } from '../../../@common/errors';
import { TreeNode } from '../../../@common/types';
import { parseTree } from '../utils/parseTree';

export const useTreeView = () => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const lastInputRef = useRef<string | null>(null);

  const buildTree = (input: string) => {
    if (input === lastInputRef.current) return;

    lastInputRef.current = input;
    setTree(null);
    setErrorMessage(null);

    try {
      const result = parseTree(input);
      setTree(result);
    } catch (e) {
      setErrorMessage(INVALID_INPUT_MESSAGE);
    }
  };

  const reset = () => {
    lastInputRef.current = null;
    setTree(null);
    setErrorMessage(null);
  };

  return { tree, errorMessage, buildTree, reset };
};
