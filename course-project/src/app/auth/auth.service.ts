import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {User} from "./user.model";
import {Router} from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    kind?: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiKey = 'AIzaSyCQ21RvzqRFkQW024OMrim48JYtoIBxbPA';
    private tokenExpirationTimeout: any;
    userSubject = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router) {
    }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(AuthService.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(AuthService.handleError),
            tap(responseData => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.userSubject.next(loadedUser);
            this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
            this.router.navigate(['/recipes']);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimeout = setTimeout(() => this.logout(), expirationDuration);
    }

    logout() {
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimeout) {
            clearTimeout(this.tokenExpirationTimeout);
        }
        this.tokenExpirationTimeout = null;
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
    }

    private static handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        return throwError(AuthService.getErrorMessageFromErrorCode(errorResponse.error.error.message));
    }

    private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, id, token, expirationDate);
        this.userSubject.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        this.router.navigate(['/recipes']);
    }

    private static getErrorMessageFromErrorCode(errorCode: string) {
        switch (errorCode) {
            case 'EMAIL_EXISTS':
                return 'The email address is already in use by another account.';
            case 'OPERATION_NOT_ALLOWED':
                return 'Password sign-in is disabled for this project.';
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return 'We have blocked all requests from this device due to unusual activity. Try again later.';
            case 'EMAIL_NOT_FOUND':
                return 'There is no user record corresponding to this email id.';
            case 'INVALID_PASSWORD':
                return 'The password is invalid.';
            case 'USER_DISABLED':
                return 'The user account has been disabled by an administrator.';
        }
    }
}