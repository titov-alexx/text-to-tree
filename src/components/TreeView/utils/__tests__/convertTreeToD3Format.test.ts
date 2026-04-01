import { describe, it, expect } from 'vitest';
import { convertTreeToD3Format } from '../convertTreeToD3Format';

describe('convertTreeToD3Format', () => {
  it('converts a leaf node (children becomes undefined)', () => {
    const result = convertTreeToD3Format({ name: 'A', children: [] });
    expect(result).toEqual({ name: 'A', children: undefined });
  });

  it('converts a tree with children', () => {
    const result = convertTreeToD3Format({
      name: 'A',
      children: [
        { name: 'B', children: [] },
        { name: 'C', children: [] },
      ],
    });
    expect(result).toEqual({
      name: 'A',
      children: [
        { name: 'B', children: undefined },
        { name: 'C', children: undefined },
      ],
    });
  });

  it('converts a nested tree', () => {
    const result = convertTreeToD3Format({
      name: 'A',
      children: [
        {
          name: 'B',
          children: [{ name: 'D', children: [] }],
        },
        { name: 'C', children: [] },
      ],
    });
    expect(result.children![0].children![0].name).toBe('D');
    expect(result.children![1].children).toBeUndefined();
  });
});
