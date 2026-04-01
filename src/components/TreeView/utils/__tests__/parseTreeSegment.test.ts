import { describe, it, expect } from 'vitest';
import { parseTreeSegment } from '../parseTreeSegment';
import { INVALID_INPUT_MESSAGE } from '../../../../@common/errors';

describe('parseTreeSegment', () => {
  it('parses single name', () => {
    expect(parseTreeSegment('A')).toEqual(['A']);
  });

  it('parses comma-separated siblings', () => {
    expect(parseTreeSegment('B, C, D')).toEqual(['B', 'C', 'D']);
  });

  it('trims whitespace around names', () => {
    expect(parseTreeSegment('  A , B  ')).toEqual(['A', 'B']);
  });

  it('filters empty names from extra commas', () => {
    expect(parseTreeSegment('A,,B')).toEqual(['A', 'B']);
  });

  it('accepts multi-letter uppercase names', () => {
    expect(parseTreeSegment('ABC, DEF')).toEqual(['ABC', 'DEF']);
  });

  it('throws on empty segment', () => {
    expect(() => parseTreeSegment('')).toThrow(INVALID_INPUT_MESSAGE);
  });

  it('throws on lowercase letters', () => {
    expect(() => parseTreeSegment('a')).toThrow(INVALID_INPUT_MESSAGE);
  });

  it('throws on numbers', () => {
    expect(() => parseTreeSegment('A1')).toThrow(INVALID_INPUT_MESSAGE);
  });

  it('throws on special characters', () => {
    expect(() => parseTreeSegment('A-B')).toThrow(INVALID_INPUT_MESSAGE);
  });
});
