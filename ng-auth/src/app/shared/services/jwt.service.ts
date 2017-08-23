import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {
  private accessToken = 'access-token';

  getToken(): string {
    return localStorage.getItem(this.accessToken);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.accessToken, token);
  }

  destroyToken(): void {
    localStorage.removeItem(this.accessToken);
  }
}
