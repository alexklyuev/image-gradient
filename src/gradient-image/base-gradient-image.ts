export abstract class BaseGradientImage {
  protected colorsX: number[][];
  protected colorsY: number[][];

  constructor(
    private ctx: CanvasRenderingContext2D,
  ) {}

  public abstract drawPixelSlotFn(colorsX: number[][], colorsY: number[][]): (pixelSlotIndex: number) => number;

  public draw(
    colorsX: number[][],
    colorsY: number[][],
  ): void {
    this.colorsX = colorsX;
    this.colorsY = colorsY;
    const [width, height] = this.getWidthHeight();
    const imageData = this.ctx.createImageData(width, height);
    for (let i = 0; i < width * height * 4; i++) {
      imageData.data[i] = this.drawPixelSlotFn(this.colorsX, this.colorsY)(i);
    }
    this.ctx.putImageData(imageData, 0, 0);
  }

  public getColorByCoords(x: number, y: number): number[] {
    const [width, height] = this.getWidthHeight();
    const firstIndex = (y * width + x) * 4;
    const color: number[] = [];
    for (let i = firstIndex; i < firstIndex + 4; i++) {
      const slotValue = this.drawPixelSlotFn(this.colorsX, this.colorsY)(i);
      const slotValueRounded = Math.round(slotValue); 
      color.push(slotValueRounded);
    }
    return color;
  }

  protected getWidthHeight(): [number, number] {
    const {width, height} = this.ctx.canvas;
    return [width, height];
  }

}
