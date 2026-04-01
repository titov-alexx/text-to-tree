import React from 'react';
import { TreeNodeDatum } from 'react-d3-tree';

export const TreeNodeElement = ({
  nodeDatum,
}: {
  nodeDatum: TreeNodeDatum;
}) => (
  <g>
    <circle r={20} fill="#3a3a3a" stroke="#888" strokeWidth={2} />
    <text
      fill="white"
      strokeWidth={0}
      textAnchor="middle"
      dy=".35em"
      fontSize={14}
      fontWeight="bold"
    >
      {nodeDatum.name}
    </text>
  </g>
);
