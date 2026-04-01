import { INVALID_INPUT_MESSAGE } from '../../../@common/errors';

/*
  This util validates the user's input string and splits it into individual paths by ";".
  Always returns a non-empty array or throws an error in case of invalid input.
*/
export const extractPathsFromInput = (input: string): string[] => {
  const trimmed = input.trim();

  // checks for lowercase letters, numbers and unsupported separators
  const hasInvalidChars = /[^\sA-Z>,;]/.test(trimmed);

  if (!trimmed || hasInvalidChars) {
    throw new Error(INVALID_INPUT_MESSAGE);
  }

  const paths = trimmed
    .split(';')
    .map((path) => path.trim())
    .filter((path) => path.length > 0);

  if (paths.length === 0) {
    throw new Error(INVALID_INPUT_MESSAGE);
  }
  return paths;
};
