import {Injectable} from 'angular2/core'
import {Observable} from 'rxjs/Observable'
import {Observer} from 'rxjs/Observer'
import {ValidationService} from './validation.service'
import {HashService} from './hash.service'


@Injectable()
export class AuthContext {

    public clientId: string = "";//GUID from the application registration
    public tenantId: string = "";//GUID from the Azure tenant
    public state: string;
    public nonce: string;

    public fullName: string;

    validationService: ValidationService;
    hashService: HashService;

    constructor(vs: ValidationService, hs: HashService) {

        this.validationService = vs;
        this.hashService = hs;

        //create a new session
        if (!window.location.hash) {
            this.state = this.createNonce();
            this.nonce = this.createNonce();
            sessionStorage[this.state] = this.nonce;
        }
    }

    public validateSession(): Observable<boolean>{

        return Observable.create(observer => {

            //look for a return fragment, which indicates a token
            if (window.location.hash) {

                try {
                    //reconstitute session information
                    this.state = this.hashService.getValueFromHash('state');
                    this.nonce = sessionStorage[this.state];

                    //extract token information
                    let token: string = this.hashService.getValueFromHash('id_token');
                    let tokenHeader: TokenHeader = KJUR.jws.JWS.readSafeJSONString(b64utos(token.split('.')[0]));
                    let tokenClaims: TokenClaims = KJUR.jws.JWS.readSafeJSONString(b64utos(token.split('.')[1]));
                    let tokenSignature: string = token.split('.')[2];

                    //get profile information from token
                    console.log(`claims: ${tokenClaims}`);
                    this.fullName = tokenClaims.name;

                    //validate token
                    this.validationService.validateToken(this.tenantId, this.clientId, this.state, this.nonce, token, tokenHeader, tokenClaims)
                        .subscribe(validated => {
                            if (validated) {
                                console.info('token validated!');
                                observer.next(true);
                            }
                            else {
                                console.info('token validation failed!');
                                observer.next(false);
                            }
                        },
                        err => {
                            observer.error(err);
                        },
                        () => {
                            observer.complete();
                        });
                }
                catch (err) {
                    observer.error(err)
                }
            }
            else {
                observer.next(false);
            }

        });
    }

    public getSignInEndpoint(): string {
        let endpoint =
            "https://login.microsoftonline.com/" + this.tenantId + "/oauth2/authorize?" +
            "response_type=id_token&" +
            "response_mode=fragment&" +
            "client_id=" + this.clientId + "&" +
            "redirect_uri=https://localhost:44330/&" +
            "scope=openid&" +
            "state=" + this.state + "&" +
            "nonce=" + this.nonce;
        console.log(endpoint);
        return endpoint;
    }

    public getLogOutEndpoint(): string {
        let endpoint =
            "https://login.microsoftonline.com/" + this.tenantId + "/oauth2/logout?" +
            "post_logout_redirect_uri=https://localhost:44330/";
        console.log(endpoint);
        return endpoint;
    }

    public clear() {
        this.nonce = undefined;
        this.state = undefined;
    }

    private createNonce(): string {
        let nonce = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 32; i++) {
            nonce += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return nonce;
    }
}