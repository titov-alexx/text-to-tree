import { describe, it, expect } from 'vitest';
import { getTreeSize } from '../getTreeSize';

describe('getTreeSize', () => {
  it('returns width=1 depth=1 for a single node', () => {
    expect(getTreeSize({ name: 'A', children: [] })).toEqual({
      width: 1,
      depth: 1,
    });
  });

  it('counts leaf nodes as width', () => {
    const tree = {
      name: 'A',
      children: [
        { name: 'B', children: [] },
        { name: 'C', children: [] },
        { name: 'D', children: [] },
      ],
    };
    expect(getTreeSize(tree)).toEqual({ width: 3, depth: 2 });
  });

  it('calculates depth from the longest branch', () => {
    const tree = {
      name: 'A',
      children: [
        {
          name: 'B',
          children: [{ name: 'D', children: [{ name: 'E', children: [] }] }],
        },
        { name: 'C', children: [] },
      ],
    };
    expect(getTreeSize(tree)).toEqual({ width: 2, depth: 4 });
  });

  it('calculates width across nested branches', () => {
    const tree = {
      name: 'A',
      children: [
        {
          name: 'B',
          children: [
            { name: 'D', children: [] },
            { name: 'E', children: [] },
          ],
        },
        { name: 'C', children: [{ name: 'F', children: [] }] },
      ],
    };
    expect(getTreeSize(tree)).toEqual({ width: 3, depth: 3 });
  });
});
