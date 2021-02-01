import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC_27uWSWI7vvqeQa3-eA-nA2ppZYnrjtw', 
    { 
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(errorRes =>{
      let errorMessage = 'An unknown error occurred!';
      if(!errorRes.error || !errorRes.error.error) {
        return throwError(errorMessage);
      }
      switch(errorRes.error.error.message) {
        case 'EMAIL_EXISTS': 
          errorMessage = 'This email already exists!';
      }
      return throwError(errorMessage);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC_27uWSWI7vvqeQa3-eA-nA2ppZYnrjtw', 
    { 
      email: email,
      password: password,
      returnSecureToken: true
    });
    // .pipe(catchError(errorRes =>{
    //   let errorMessage = 'An unknown error occurred!';
    //   if(!errorRes.error || !errorRes.error.error) {
    //     return throwError(errorMessage);
    //   }
    //   switch(errorRes.error.error.message) {
    //     case 'EMAIL_NOT_FOUND': 
    //       errorMessage = 'This email does not exist on this server!';
    //     case 'INVALID_PASSWORD': 
    //       errorMessage = 'Password is not valid!';
    //   }
    //   return throwError(errorMessage);
    // }));
  }

}
