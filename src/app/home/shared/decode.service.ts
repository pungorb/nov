import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {

  constructor() { }

  decodeBase64(base64String: string): string {
    return atob(base64String);
  }
}
