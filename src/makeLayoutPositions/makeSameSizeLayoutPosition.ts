import { ContainerLayout, Position, Dimensions } from '../types/interfaces';
import { calculateColumnsForSameWidthLayouts } from './calculateColumnsForSameWidthLayouts';

/**
 * Same size layout for items that have the same width/height
 */
export default (
  containerWidth: number,
  itemsDimensions: Dimensions[],
  gutterPixels: number
): ContainerLayout => {
  const columns = calculateColumnsForSameWidthLayouts(
    containerWidth,
    itemsDimensions[0].width,
    gutterPixels
  );

  const itemsPositions = itemsDimensions.map(
    ({ width, height }, index): Position => {
      const row = Math.floor(index / columns);
      const col = index - columns * row;
      return {
        left: col * (width + gutterPixels),
        top: row * (height + gutterPixels),
      };
    }
  );

  const totalRows = Math.floor(itemsDimensions.length / columns) + 1;
  const firstItemHeight = itemsDimensions[0].height + gutterPixels;
  const containerHeight = totalRows * firstItemHeight + gutterPixels;

  return {
    containerHeight,
    itemsPositions,
  };
};
