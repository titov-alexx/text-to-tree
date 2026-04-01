import { TreeNode } from '../../../@common/types';

type TreeSize = { width: number; depth: number };

/*
 This util calculates the dimensions of a tree for layout purposes.
  - width: the total number of leaf nodes (horizontal spread)
  - depth: the longest path from a root to a leaf (vertical spread)
*/
export const getTreeSize = (node: TreeNode): TreeSize => {
  if (node.children.length === 0) {
    return { width: 1, depth: 1 };
  }

  let totalWidth = 0;
  let maxDepth = 0;

  for (const child of node.children) {
    const size = getTreeSize(child);

    totalWidth += size.width;
    maxDepth = Math.max(maxDepth, size.depth);
  }

  return { width: Math.max(1, totalWidth), depth: maxDepth + 1 };
};
