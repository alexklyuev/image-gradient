import { RgbaColor } from './rgba-color';

export class CssRgba {
  private color: RgbaColor;

  constructor(color: RgbaColor | number[]) {
    if (color instanceof RgbaColor) {
      this.color = color;
    } else {
      this.color = new RgbaColor(color);
    }
  }

  public toString(): string {
    const [r, g, b, a] = this.color.toUintArray();
    return `rgba(${r}, ${g}, ${b}, ${Math.round(a / 25.5) / 10})`;
  }

  public toUintArray(): number[] {
    return this.color.toUintArray();
  }

}
