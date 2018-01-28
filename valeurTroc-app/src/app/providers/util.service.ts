import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

  constructor() { }

  public getColorFromString(str: string): string {
    return '#' + this.intToRGB(this.hashCode(str));
  }

  private hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  private intToRGB(i): string {
    const c = (i & 0x00FFFFFF)
      .toString(16)
      .toUpperCase();

    return '00000'.substring(0, 6 - c.length) + c;
  }


}
