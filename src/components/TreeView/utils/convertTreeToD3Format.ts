import { TreeNode } from '../../../@common/types';

type D3TreeNode = {
  name: string;
  children?: D3TreeNode[];
};

export const convertTreeToD3Format = (tree: TreeNode): D3TreeNode => ({
  name: tree.name,
  children:
    tree.children.length > 0
      ? tree.children.map(convertTreeToD3Format)
      : undefined,
});
