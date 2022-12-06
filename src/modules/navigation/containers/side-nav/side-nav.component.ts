import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {TokenStorageService, UserService} from '@modules/auth/services';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';
import { NavigationService } from '@modules/navigation/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'sb-side-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './side-nav.component.html',
    styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Input() sidenavStyle!: string;
    @Input() sideNavItems!: SideNavItems;
    @Input() sideNavSections!: SideNavSection[];
    user!: string;
    email!: string;
    roles: string [] = [];

    subscription: Subscription = new Subscription();
    routeDataSubscription!: Subscription;

    constructor(public navigationService: NavigationService,
                public userService: UserService,
                private tokenStorage: TokenStorageService) {}

    ngOnInit() {
        this.user = this.tokenStorage.getUser().username;
        this.email = this.tokenStorage.getUser().email;
        this.roles = this.tokenStorage.getUser().roles;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
