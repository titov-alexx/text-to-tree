import { TreeNode } from '../../../@common/types';

type IsTreeCycledParams = {
  node: TreeNode;
  visited?: Set<string>;
  path?: Set<string>;
};

/*
  This function detects cycles in a tree structure (e.g. A -> B -> C -> A).
  Walks each branch using DFS, tracking the current path.
  If a node appears twice in the same path - this is a cycle.
*/
export const isTreeCycled = ({
  node,
  visited = new Set<string>(),
  path = new Set<string>(),
}: IsTreeCycledParams): boolean => {
  if (path.has(node.name)) return true;
  if (visited.has(node.name)) return false;

  visited.add(node.name);
  path.add(node.name);

  for (const child of node.children) {
    if (isTreeCycled({ node: child, visited, path })) return true;
  }

  path.delete(node.name);
  return false;
};
