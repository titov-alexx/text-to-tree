import { describe, it, expect } from 'vitest';
import { parseTree } from '../parseTree';
import { INVALID_INPUT_MESSAGE } from '../../../../@common/errors';

describe('parseTree', () => {
  it('parses a simple tree', () => {
    const tree = parseTree('A > B, C');
    expect(tree.name).toBe('A');
    expect(tree.children.map((c) => c.name)).toEqual(['B', 'C']);
  });

  it('parses multiple paths separated by semicolons', () => {
    const tree = parseTree('A > B; A > C');
    expect(tree.name).toBe('A');
    expect(tree.children.map((c) => c.name)).toEqual(['B', 'C']);
  });

  it('parses a deep chain', () => {
    const tree = parseTree('A > B > C > D');
    expect(tree.children[0].children[0].children[0].name).toBe('D');
  });

  it('throws on invalid characters', () => {
    expect(() => parseTree('a > b')).toThrow(INVALID_INPUT_MESSAGE);
  });

  it('throws when a node would have two parents (cycle-like)', () => {
    expect(() => parseTree('A > B; C > B')).toThrow(INVALID_INPUT_MESSAGE);
  });
});
