import { BaseGradientImage } from './base-gradient-image';

export class MultiVerticalGradientImage extends BaseGradientImage {

  public drawPixelSlotFn(colorsX: number[][], colorsY: number[][]): (pixelSlotIndex: number) => number {
    const [width, height] = this.getWidthHeight();
    return (index: number): number => {
      const slotIndex = index % 4;
      const xPosition = (index % (width * 4)) / 4;
      const yPosition = Math.round(index / width / 4);
      const verticalRange = height / (colorsY.length - 1);
      const verticalSlot = Math.floor(yPosition / verticalRange);
      const relHeight = height / (colorsY.length - 1);
      const relYPosition = yPosition % relHeight;
      const valA = colorsY[verticalSlot][slotIndex];
      const valB = (colorsY[verticalSlot + 1] || colorsY[verticalSlot])[slotIndex];
      const valT = valA * (relHeight - relYPosition) / relHeight;
      const valM = valB * relYPosition / relHeight;
      const valV = valT + valM;
      if (Array.isArray(colorsX) && colorsX.length > 0) {
        const valC = colorsX[0][slotIndex];
        const val = ((valV * (width - xPosition)) / width) + ((valC * (xPosition) / width));
        return val;
      } else {
        return valV;
      }
    }
  }

}
