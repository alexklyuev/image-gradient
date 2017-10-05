export class RgbaColor {

  constructor(private color: number[]) {}

  public toString(): string {
    return this.color.join(', ');
  }

  public toUintArray(): number[] {
    return this.color
    .map(i => Math.abs(i))
    .map(i => i | 0);
  }

}
