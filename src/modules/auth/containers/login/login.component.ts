import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@modules/auth/services';
import {TokenStorageService} from '@modules/auth/services/token-storage.service';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: any = {
        username: null,
        password: null
    };
    isLoggedIn = false;
    isLoginFailed = false;
    errorMessage = '';
    roles: string[] = [];
    user!: string;
    constructor(private authService : AuthService,
                private tokenStorage: TokenStorageService,
                private route : Router) {}
    ngOnInit() {
        if (this.tokenStorage.getToken()) {
            this.isLoggedIn = true;
            this.roles = this.tokenStorage.getUser().roles;
        }
    }

    onSubmit(): void {
        const { username, password } = this.form;
        this.authService.login(username, password).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);
                this.roles = this.tokenStorage.getUser().roles;
                this.user = this.tokenStorage.getUser().username;
                this.route.navigate(['/dashboard'])
        },
            error => {
                this.errorMessage = error.error.message;
                this.isLoginFailed = true;
            }
        )
    }

}
