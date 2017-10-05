type SlotFn = (imageDataIndex: number, width: number, height: number) => number;

export class GradientImage {
  public static readonly solidColorFn = (color: number[]): SlotFn => {
    return (index: number, width: number, height: number): number => {
      const mod = index % 4;
      return color[mod];
    };
  };

  public static readonly horizontalGradientFn = (
    colorA: number[],
    colorB: number[],
    round: number = 1,
  ): SlotFn => {
    return (index: number, width: number, height: number): number => {
      const slotIndex = index % 4;
      const valA = colorA[slotIndex];
      const valB = colorB[slotIndex]
      const xPosition = (index % (width * 4)) / 4;
      const val = ((valA * (width - xPosition)) / width) + ((valB * (xPosition) / width));
      return Math.ceil(val / round) * round;
    };
  };

  public static readonly verticalGradientFn = (
    colorA: number[],
    colorB: number[],
    round: number = 1,
  ): SlotFn => {
    return (index: number, width: number, height: number): number => {
      const slotIndex = index % 4;
      const valA = colorA[slotIndex];
      const valB = colorB[slotIndex];
      const yPosition = Math.ceil(index / width / 4);
      const val = (valA * (height - yPosition)) / height + (valB * (yPosition) / height);
      return Math.ceil(val / round) * round;
    };
  };

  public static readonly gradientTwoDimsFn = (
    colorA: number[],
    colorB: number[],
    colorC: number[],
    round: number = 1,
  ): SlotFn => {
    return (index: number, width: number, height: number): number => {
      const slotIndex = index % 4;
      const valA = colorA[slotIndex];
      const valB = colorB[slotIndex];
      const valC = colorC[slotIndex];
      const yPosition = Math.ceil(index / width / 4);
      const xPosition = (index % (width * 4)) / 4;
      const valHExact = ((valA * (width - xPosition)) / width) + ((valB * (xPosition) / width));
      const valH = Math.round(valHExact / round) * round;
      const val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
      return Math.round(val / round) * round;
    };
  };

  public static readonly multiHorizontalFn = (
    colorsX: number[][],
    colorY?: number[],
  ): SlotFn => {
    return (index: number, width: number, height: number): number => {
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
      if (colorY) {
        const valC = colorY[slotIndex];
        const val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
        return val;
      } else {
        return valH;
      }
    }
  };

  public static readonly multiVerticalFn = (
    colorsY: number[][],
    colorX?: number[],
  ): SlotFn => {
    return (index: number, width: number, height: number): number => {
      const slotIndex = index % 4;
      const xPosition = (index % (width * 4)) / 4;
      const yPosition = Math.round(index / width / 4);
      const verticalRange = height / (colorsY.length - 1);
      const verticalSlot = Math.floor(yPosition / verticalRange);
      const relHeight = height / (colorsY.length - 1);
      const relWidth = width / (colorsY.length - 1);
      const relYPosition = Math.round(index / width / 4);
      const valA = colorsY[verticalSlot][slotIndex];
      const valB = (colorsY[verticalSlot + 1] || colorsY[verticalSlot])[slotIndex];
      const valT = valA * (relHeight - relYPosition) / relHeight;
      const valM = valB * relYPosition / relHeight;
      const valV = valT + valM;
      if (colorX) {
        const valC = colorX[slotIndex];
        const val = ((valV * (width - xPosition)) / width) + ((valC * (xPosition) / width));
        return val;
      } else {
        return valV;
      }
    }
  };

  private drawFn: SlotFn;

  constructor(
    private ctx: CanvasRenderingContext2D,
  ) {}

  public draw(fn: SlotFn): void {
    this.drawFn = fn;
    const {width, height} = this.ctx.canvas;
    const imageData = this.ctx.createImageData(width, height);
    for (let i = 0; i < width * height * 4; i++) {
      imageData.data[i] = fn(i, width, height);
    }
    this.ctx.putImageData(imageData, 0, 0);
  }

}
