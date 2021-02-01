import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_27uWSWI7vvqeQa3-eA-nA2ppZYnrjtw', 
    { 
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_27uWSWI7vvqeQa3-eA-nA2ppZYnrjtw', 
    { 
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),  
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      })
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS': 
        errorMessage = 'This email already exists!'
        break;
      case 'EMAIL_NOT_FOUND': 
        errorMessage = 'This email does not exist on this server!'
        break;
      case 'INVALID_PASSWORD': 
        errorMessage = 'Password is not valid!'
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  // private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  //   const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  //   const user = new User(email, userId, token, expirationDate);
  //   this.user.next(user);
  // }

}
