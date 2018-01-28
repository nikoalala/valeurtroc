import { Injectable } from '@angular/core';

@Injectable()
export class IdGenService {

  constructor() { }

  public getID(): number {
    return (new Date()).getTime();
  }
}
