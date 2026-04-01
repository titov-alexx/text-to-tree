import { INVALID_INPUT_MESSAGE } from '../../../@common/errors';

/*
 Parses a single segment string into an array of validated node names.
 Splits by "," for siblings and validates each name is uppercase letters only.
 e.g. "C, D" -> ["C", "D"]
*/
export const parseTreeSegment = (segment: string): string[] => {
  const names = segment
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  if (names.length === 0) {
    throw new Error(INVALID_INPUT_MESSAGE);
  }

  for (const name of names) {
    // Node names must contain only uppercase letters (A-Z)
    if (!/^[A-Z]+$/.test(name)) {
      throw new Error(INVALID_INPUT_MESSAGE);
    }
  }

  return names;
};
