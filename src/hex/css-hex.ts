import { RgbColor } from '../rgb/rgb-color';

export class CssHex {

  constructor(private rgbColor: RgbColor) {}
  
  public toString(): string {
    return `#${this.rgbColor.toHexString()}`;
  }

}

