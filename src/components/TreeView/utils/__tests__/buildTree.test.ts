import { describe, it, expect } from 'vitest';
import { buildTree } from '../buildTree';
import { INVALID_INPUT_MESSAGE } from '../../../../@common/errors';

describe('buildTree', () => {
  it('builds a simple parent-child tree', () => {
    const tree = buildTree(['A > B']);
    expect(tree.name).toBe('A');
    expect(tree.children).toHaveLength(1);
    expect(tree.children[0].name).toBe('B');
  });

  it('builds a tree with multiple children', () => {
    const tree = buildTree(['A > B, C']);
    expect(tree.name).toBe('A');
    expect(tree.children).toHaveLength(2);
    expect(tree.children.map((c) => c.name)).toEqual(['B', 'C']);
  });

  it('builds a chain of nodes', () => {
    const tree = buildTree(['A > B > C']);
    expect(tree.name).toBe('A');
    expect(tree.children[0].name).toBe('B');
    expect(tree.children[0].children[0].name).toBe('C');
  });

  it('merges multiple paths with the same root', () => {
    const tree = buildTree(['A > B', 'A > C']);
    expect(tree.name).toBe('A');
    expect(tree.children).toHaveLength(2);
    expect(tree.children.map((c) => c.name)).toEqual(['B', 'C']);
  });

  it('handles a single root node', () => {
    const tree = buildTree(['A']);
    expect(tree.name).toBe('A');
    expect(tree.children).toHaveLength(0);
  });

  it('throws on comma-separated names without a parent', () => {
    expect(() => buildTree(['A, B'])).toThrow(INVALID_INPUT_MESSAGE);
  });

  it('throws when first segment has multiple names', () => {
    expect(() => buildTree(['A, B > C'])).toThrow(INVALID_INPUT_MESSAGE);
  });
});
