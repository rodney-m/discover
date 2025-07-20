import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { SignupRequest } from '../models/auth.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public register(accountDetails: SignupRequest): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'text/plain, */*',
        'Content-Type': 'application/json', // We send JSON
      }),
      responseType: 'text' as 'json', // We accept plain text as response.
    };
    return this.http
      .post<string>(`${this.apiUrl}/auth/sign-up`, accountDetails, httpOptions)
      .pipe(
        catchError((error: Error) => {
          return throwError(() => error);
        })
      );
  }
} 