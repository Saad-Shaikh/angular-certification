import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.template.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    errorMessage: string = null;

    constructor(private authService: AuthService) {
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const email = form.value.email;
            const password = form.value.password;

            this.isLoading = true;
            let authObservable: Observable<AuthResponseData>;
            if (this.isLoginMode) {
                authObservable = this.authService.login(email, password);
            } else {
                authObservable = this.authService.signUp(email, password);
            }

            authObservable.subscribe(
                response => {
                    this.isLoading = false;
                    this.errorMessage = null;
                },
                errorMessage => {
                    this.isLoading = false;
                    this.errorMessage = errorMessage;
                });
            form.reset();
        }
    }
}