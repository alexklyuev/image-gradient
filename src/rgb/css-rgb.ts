import { RgbColor } from './rgb-color';

export class CssRgb {

  constructor(private rgbColor: RgbColor) {}

  public toString(): string {
    return `rgb(${RgbColor.hexToRgb(this.rgbColor.toHexString()).join(', ')})`;
  }

}
