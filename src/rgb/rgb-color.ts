export class RgbColor {

  /**
   * [255, 255, 255] -> 'ffffff'
   */
  public static rgbToHex(rgb: number[]): string {
    return rgb
    .map(i => i.toString(16))
    .map(s => '0' + s)
    .map(s => s.slice(-2))
    .join('');
  }

  /**
   * 'ffffff' -> [255, 255, 255]
   */
  public static hexToRgb(hex: string): number[] {
    return hex
    .match(/\w{2}/g)
    .map(s => parseInt(s, 16));
  }

  /**
   * internally color stores as hex-string
   */
  private color: string;

  constructor(color: string | number[]) {
    if (typeof color === 'string') {
      this.color = color;
    } else if (Array.isArray(color)) {
      this.color = RgbColor.rgbToHex(color);
    }
  }

  /**
   * get color as primitive value
   */
  public toHexString(): string {
    return this.color;
  }

  /**
   * compares color to another color
   */
  public equalsTo(color: RgbColor): boolean {
    return this.toHexString() === color.toHexString();
  }

}
