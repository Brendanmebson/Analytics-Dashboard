import React from 'react';
import { Grid } from '@mui/material';
import type { GridProps } from '@mui/material';

interface GridItemProps extends GridProps {
  children: React.ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  item?: boolean;
}
const GridItem: React.FC<GridItemProps> = ({ children, item, ...props }) => {
  return (
    <Grid item={true} {...props}>
      {children}
    </Grid>
  );
};

export default GridItem;