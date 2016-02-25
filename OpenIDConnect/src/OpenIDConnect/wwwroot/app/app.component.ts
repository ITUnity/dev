import {Component} from 'angular2/core'
import {AuthContext} from './auth.context'

@Component({
    selector: 'app-main',
    templateUrl: '/app/main.html',
    providers: [AuthContext]
})


export class AppComponent {

    authContext: AuthContext;
    isAuthenticated: boolean;
    fullName: string;

    constructor(ctx: AuthContext) {

        this.authContext = ctx;

        this.authContext.validateSession().subscribe(validated => {
                if (validated) {
                    this.isAuthenticated = true;
                    this.fullName = this.authContext.fullName;
                    console.log('session validated!');
                }
                else {
                    this.isAuthenticated = false;
                    this.fullName = "Please log in";
                    console.log('session validation failed!');
            }
            },
                err => {
                    this.isAuthenticated = false;
                    this.fullName = "Please log in";
                    console.error(err);
            },
                () => {
                    console.log('validation complete!');
            });


    }

    logIn() {
        window.location.href = this.authContext.getSignInEndpoint();
    }

    logOut() {
        this.authContext.clear();
        this.isAuthenticated = false;
        window.location.href = this.authContext.getLogOutEndpoint();
    }

}