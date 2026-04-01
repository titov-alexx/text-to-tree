import { describe, it, expect } from 'vitest';
import { extractPathsFromInput } from '../extractPathsFromInput';
import { INVALID_INPUT_MESSAGE } from '../../../../@common/errors';

describe('extractPathsFromInput', () => {
  it('splits input by semicolons', () => {
    expect(extractPathsFromInput('A > B; A > C')).toEqual(['A > B', 'A > C']);
  });

  it('trims whitespace from paths', () => {
    expect(extractPathsFromInput('  A > B ;  A > C  ')).toEqual([
      'A > B',
      'A > C',
    ]);
  });

  it('returns single path when no semicolons', () => {
    expect(extractPathsFromInput('A > B > C')).toEqual(['A > B > C']);
  });

  it('filters out empty segments from extra semicolons', () => {
    expect(extractPathsFromInput('A > B;; A > C')).toEqual([
      'A > B',
      'A > C',
    ]);
  });

  it('throws on lowercase letters', () => {
    expect(() => extractPathsFromInput('a > b')).toThrow(INVALID_INPUT_MESSAGE);
  });

  it('throws on numbers', () => {
    expect(() => extractPathsFromInput('A > 1')).toThrow(INVALID_INPUT_MESSAGE);
  });

  it('throws on unsupported special characters', () => {
    expect(() => extractPathsFromInput('A > B | C')).toThrow(
      INVALID_INPUT_MESSAGE,
    );
  });
});
