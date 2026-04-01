import { INVALID_INPUT_MESSAGE } from '../../../@common/errors';
import { TreeNode } from '../../../@common/types';

type LinkParentToChildParams = {
  parentNode: TreeNode;
  parentName: string;
  childName: string;
  getOrCreateNode: (name: string) => TreeNode;
  parentMap: Map<string, string>;
};

/*
 Links a child node to a parent node, with validation:
 - a node cannot be its own parent
 - a node can only have one parent
 - duplicate children are ignored
*/
export const linkParentToChild = ({
  parentNode,
  parentName,
  childName,
  getOrCreateNode,
  parentMap,
}: LinkParentToChildParams) => {
  // A node cannot be its own parent
  if (childName === parentName) {
    throw new Error(INVALID_INPUT_MESSAGE);
  }

  const childNode = getOrCreateNode(childName);

  // A node can only have one parent in a tree
  if (parentMap.has(childName) && parentMap.get(childName) !== parentName) {
    throw new Error(INVALID_INPUT_MESSAGE);
  }

  parentMap.set(childName, parentName);

  // Avoid adding duplicate children (e.g. "A > B; A > B")
  if (!parentNode.children.some((child) => child.name === childName)) {
    parentNode.children.push(childNode);
  }
};
