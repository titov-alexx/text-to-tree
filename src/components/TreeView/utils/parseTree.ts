import { INVALID_INPUT_MESSAGE } from '../../../@common/errors';
import { TreeNode } from '../../../@common/types';
import { buildTree } from './buildTree';
import { extractPathsFromInput } from './extractPathsFromInput';
import { isTreeCycled } from './isTreeCycled';

/*
 This function converts a raw input string (e.g. "A > B, C; A > D") into a tree structure.
  1. Validates input and splits it into paths by ";"
  2. Builds the tree by processing parent-child relationships
  3. Checks for cycles and throws an error if found
*/
export const parseTree = (input: string): TreeNode => {
  const paths = extractPathsFromInput(input);
  const tree = buildTree(paths);

  if (isTreeCycled({ node: tree })) {
    throw new Error(INVALID_INPUT_MESSAGE);
  }

  return tree;
};
