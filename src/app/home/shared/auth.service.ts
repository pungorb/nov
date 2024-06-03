import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = '/api/user/auth';
  private authTokenKey = 'x-pingu-authtoken';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password};
    return this.http.post<any>(this.apiUrl, body, { observe: 'response' }).pipe(
      tap(response => {
        const token = response.headers.get(this.authTokenKey);
        if (token) {
          localStorage.setItem(this.authTokenKey, token);
        }
      })
    );
  } 

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  updateUser(userId: string, userData: any): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-pingu-authtoken': token || ''
    });
    return this.http.put<any>(`/api/user/${userId}`, userData, { headers });
  }
}
