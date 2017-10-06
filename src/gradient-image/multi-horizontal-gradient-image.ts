import { BaseGradientImage } from './base-gradient-image';

export class MultiHorizontalGradientImage extends BaseGradientImage {

  public drawPixelSlotFn(colorsX: number[][], colorsY: number[][]): (pixelSlotIndex: number) => number {
    const [width, height] = this.getWidthHeight();
    return (index: number): number => {
      const slotIndex = index % 4;
      const xPosition = (index % (width * 4)) / 4;
      const yPosition = Math.round(index / width / 4);
      const horizontalRange = width / (colorsX.length - 1);
      const horizontalSlot = Math.floor(xPosition / horizontalRange);
      const relWidth = width / (colorsX.length - 1);
      const relXPosition = (index % (relWidth * 4)) / 4;
      const valA = colorsX[horizontalSlot][slotIndex];
      const valB = colorsX[horizontalSlot + 1][slotIndex];
      const valL = valA * (relWidth - relXPosition) / relWidth;
      const valR = valB * relXPosition / relWidth;
      const valH = valL + valR;
      if (Array.isArray(colorsY) && colorsY.length > 0) {
        const valC = colorsY[0][slotIndex];
        const val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
        return val;
      } else {
        return valH;
      }
    }
  }

}
