import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ 
  providedIn: 'root' 
})

export class AuthService {
  public apiUrl = 'http://localhost/api';

  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login.php`, data);
  }

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup.php`, data);
  }
}