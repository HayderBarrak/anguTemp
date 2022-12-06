import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService, UserService} from '@modules/auth/services';

@Component({
    selector: 'sb-top-nav-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav-user.component.html',
    styleUrls: ['top-nav-user.component.scss'],
})
export class TopNavUserComponent implements OnInit {
    user!: string;
    email!: string;

    constructor(private userService: UserService,
                private tokenStorage: TokenStorageService,
                private route: Router
                ) {}
    ngOnInit() {
        this.user = this.tokenStorage.getUser().username;
        this.email = this.tokenStorage.getUser().email;
    }

    logOut(){
        this.tokenStorage.signOut();
        this.route.navigate(["/auth/login"])
    }

}
