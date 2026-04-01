import { RefObject, useLayoutEffect, useMemo, useState } from 'react';
import { TreeNode } from '../../../@common/types';
import { TREE_LAYOUT } from '../constants';
import { convertTreeToD3Format } from '../utils/convertTreeToD3Format';
import { getTreeSize } from '../utils/getTreeSize';

type UseTreeLayoutParams = {
  node: TreeNode;
  containerRef: RefObject<HTMLDivElement | null>;
};

export const useTreeLayout = ({ node, containerRef }: UseTreeLayoutParams) => {
  const [uiViewParams, setViewConfig] = useState({
    translate: { x: 0, y: 0 },
    zoom: 1,
  });
  const treeElements = useMemo(() => convertTreeToD3Format(node), [node]);
  const treeSize = useMemo(() => getTreeSize(node), [node]);

  const containerHeight = Math.max(
    TREE_LAYOUT.MIN_CONTAINER_HEIGHT,
    treeSize.depth * TREE_LAYOUT.HEIGHT_PER_LEVEL,
  );

  /*
   Using useLayoutEffect (not useEffect) here to calculate zoom/position before the render,
   preventing a visible flash of the tree at the wrong position
  */
  useLayoutEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      const neededWidth = treeSize.width * TREE_LAYOUT.NODE_WIDTH;
      const neededHeight = treeSize.depth * TREE_LAYOUT.NODE_HEIGHT;
      const fitZoom = Math.min(1, width / neededWidth, height / neededHeight);
      const zoom = Math.max(TREE_LAYOUT.MIN_ZOOM, fitZoom);
      const treePixelHeight = neededHeight * zoom;
      const topPadding = Math.max(
        TREE_LAYOUT.MIN_TOP_PADDING,
        (height - treePixelHeight) / 2,
      );

      setViewConfig({ translate: { x: width / 2, y: topPadding }, zoom });
    }
  }, [node, treeSize, containerHeight, containerRef]);

  return { treeElements, uiViewParams, containerHeight };
};
