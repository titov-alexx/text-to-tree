import { describe, it, expect } from 'vitest';
import { linkParentToChild } from '../linkParentToChild';
import { TreeNode } from '../../../../@common/types';
import { INVALID_INPUT_MESSAGE } from '../../../../@common/errors';

const createHelpers = () => {
  const nodeMap = new Map<string, TreeNode>();
  const parentMap = new Map<string, string>();

  const getOrCreateNode = (name: string): TreeNode => {
    if (!nodeMap.has(name)) {
      nodeMap.set(name, { name, children: [] });
    }
    return nodeMap.get(name)!;
  };

  return { nodeMap, parentMap, getOrCreateNode };
};

describe('linkParentToChild', () => {
  it('links a child to a parent', () => {
    const { parentMap, getOrCreateNode } = createHelpers();
    const parentNode = getOrCreateNode('A');

    linkParentToChild({
      parentNode,
      parentName: 'A',
      childName: 'B',
      getOrCreateNode,
      parentMap,
    });

    expect(parentNode.children).toHaveLength(1);
    expect(parentNode.children[0].name).toBe('B');
  });

  it('does not add duplicate children', () => {
    const { parentMap, getOrCreateNode } = createHelpers();
    const parentNode = getOrCreateNode('A');

    const params = {
      parentNode,
      parentName: 'A',
      childName: 'B',
      getOrCreateNode,
      parentMap,
    };

    linkParentToChild(params);
    linkParentToChild(params);

    expect(parentNode.children).toHaveLength(1);
  });

  it('throws when a node is its own parent', () => {
    const { parentMap, getOrCreateNode } = createHelpers();
    const parentNode = getOrCreateNode('A');

    expect(() =>
      linkParentToChild({
        parentNode,
        parentName: 'A',
        childName: 'A',
        getOrCreateNode,
        parentMap,
      }),
    ).toThrow(INVALID_INPUT_MESSAGE);
  });

  it('throws when a child already has a different parent', () => {
    const { parentMap, getOrCreateNode } = createHelpers();

    const parentA = getOrCreateNode('A');
    linkParentToChild({
      parentNode: parentA,
      parentName: 'A',
      childName: 'C',
      getOrCreateNode,
      parentMap,
    });

    const parentB = getOrCreateNode('B');
    expect(() =>
      linkParentToChild({
        parentNode: parentB,
        parentName: 'B',
        childName: 'C',
        getOrCreateNode,
        parentMap,
      }),
    ).toThrow(INVALID_INPUT_MESSAGE);
  });
});
