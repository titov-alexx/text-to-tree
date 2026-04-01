import { describe, it, expect } from 'vitest';
import { isTreeCycled } from '../isTreeCycled';
import { TreeNode } from '../../../../@common/types';

const node = (name: string, children: TreeNode[] = []): TreeNode => ({
  name,
  children,
});

describe('isTreeCycled', () => {
  it('returns false for a single node', () => {
    expect(isTreeCycled({ node: node('A') })).toBe(false);
  });

  it('returns false for a simple tree', () => {
    const tree = node('A', [node('B'), node('C')]);
    expect(isTreeCycled({ node: tree })).toBe(false);
  });

  it('returns false for a deep tree', () => {
    const tree = node('A', [node('B', [node('C', [node('D')])])]);
    expect(isTreeCycled({ node: tree })).toBe(false);
  });

  it('detects a direct cycle', () => {
    const a = node('A');
    const b = node('B', [a]);
    a.children.push(b);

    expect(isTreeCycled({ node: a })).toBe(true);
  });

  it('detects an indirect cycle', () => {
    const a = node('A');
    const c = node('C', [a]);
    const b = node('B', [c]);
    a.children.push(b);

    expect(isTreeCycled({ node: a })).toBe(true);
  });
});
