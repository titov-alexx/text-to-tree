import React, { useRef } from 'react';
import Tree, { CustomNodeElementProps } from 'react-d3-tree';
import { TreeNode } from '../../@common/types';
import s from './TreeView.module.scss';
import { TREE_LAYOUT } from './constants';
import { TreeNodeElement } from './elements';
import { useTreeLayout } from './hooks/useTreeLayout';

const renderCustomNode = ({ nodeDatum }: CustomNodeElementProps) => (
  <TreeNodeElement nodeDatum={nodeDatum} />
);

export const TreeView = ({ node }: { node: TreeNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    treeElements,
    uiViewParams: { translate, zoom },
    containerHeight,
  } = useTreeLayout({ node, containerRef });

  return (
    <div
      ref={containerRef}
      className={s.container}
      style={{ height: `${containerHeight}px` }}
    >
      <Tree
        data={treeElements}
        translate={translate}
        orientation="vertical"
        pathFunc="diagonal"
        separation={{ siblings: 1, nonSiblings: 1.2 }}
        renderCustomNodeElement={renderCustomNode}
        zoom={zoom}
        scaleExtent={{ min: 0.1, max: 2 }}
        collapsible={false}
        nodeSize={{ x: TREE_LAYOUT.NODE_WIDTH, y: TREE_LAYOUT.NODE_HEIGHT }}
      />
    </div>
  );
};
