import { INVALID_INPUT_MESSAGE } from '../../../@common/errors';
import { TreeNode } from '../../../@common/types';
import { parseTreeSegment } from './parseTreeSegment';
import { linkParentToChild } from './linkParentToChild';

/*
  This function processes an array of path strings (e.g. ["A > B > C, D", "A > E"])
  and builds a tree structure by creating nodes and linking parent-child relationships.
*/
export const buildTree = (paths: string[]): TreeNode => {
  const nodeMap = new Map<string, TreeNode>();
  const parentMap = new Map<string, string>();
  let rootName: string | null = null;

  const getOrCreateNode = (name: string): TreeNode => {
    if (!nodeMap.has(name)) {
      nodeMap.set(name, { name, children: [] });
    }
    return nodeMap.get(name)!;
  };

  for (const path of paths) {
    // Split path by ">" into chain segments, e.g. "A > B > C, D" -> ["A", "B", "C, D"]
    const segments = path
      .split('>')
      .map((segment) => segment.trim())
      .filter((segment) => segment.length > 0);

    if (segments.length === 0) {
      throw new Error(INVALID_INPUT_MESSAGE);
    }

    // Single node without ">" (e.g. just "A") — register it as root if first
    if (segments.length === 1) {
      const names = parseTreeSegment(segments[0]);

      // Comma-separated names without ">" are invalid (siblings need a parent)
      if (names.length > 1) {
        throw new Error(INVALID_INPUT_MESSAGE);
      }

      getOrCreateNode(names[0]);

      if (rootName === null) {
        rootName = names[0];
      }

      continue;
    }

    // Parse each segment into node names, splitting by "," for siblings
    // e.g. ["A", "B", "C, D"] -> [["A"], ["B"], ["C", "D"]]
    const parsedSegments = segments.map(parseTreeSegment);

    // First segment must be a single node (the chain starts from one parent)
    if (parsedSegments[0].length !== 1) {
      throw new Error(INVALID_INPUT_MESSAGE);
    }

    if (rootName === null) {
      rootName = parsedSegments[0][0];
    }

    // Walk the chain and create parent-child relationships between consecutive segments.
    // When a segment has multiple siblings (commas), the next ">" continues from the last sibling.
    for (let i = 0; i < parsedSegments.length - 1; i++) {
      const parentName = parsedSegments[i][parsedSegments[i].length - 1];
      const parentNode = getOrCreateNode(parentName);
      const childNames = parsedSegments[i + 1];

      for (const childName of childNames) {
        linkParentToChild({
          parentNode,
          parentName,
          childName,
          getOrCreateNode,
          parentMap,
        });
      }
    }
  }

  if (rootName === null) {
    throw new Error(INVALID_INPUT_MESSAGE);
  }

  return getOrCreateNode(rootName);
};
