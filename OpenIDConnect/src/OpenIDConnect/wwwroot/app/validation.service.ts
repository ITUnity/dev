import {Observable} from 'rxjs/Observable'
import {Observer} from 'rxjs/Observer'
import {Injectable} from 'angular2/core'
import {HashService} from './hash.service'
import {Http, Headers, Response} from 'angular2/http'
import 'rxjs/add/observable/forkJoin'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

@Injectable()
export class ValidationService {

    httpService: Http;
    hashService: HashService;

    constructor(http: Http, hs: HashService) {
        this.httpService = http;
        this.hashService = hs;
    }

    public validateToken(tenantId: string, clientId: string, state: string, nonce: string, token: string, tokenHeader: TokenHeader, tokenClaims: TokenClaims): Observable<boolean> {

        return Observable.create(observer => {

            //validate state
            if (typeof (state) === 'undefined') {
                console.error(`invalid state: ${state}`);
                observer.next(false);
                return;
            }

            //validate nonce
            if (sessionStorage[state] !== nonce) {
                console.error(`invalid nonce: ${nonce}`);
                observer.next(false);
                return;
            }

            //validate issuer
            if (tokenClaims.iss !== "https://sts.windows.net/" + tenantId + "/") {
                console.error(`invalid issuer: ${tokenClaims.iss}`);
                observer.next(false);
                return;
            }

            //validate audience
            if (tokenClaims.aud !== clientId) {
                console.error(`invalid audience: ${tokenClaims.aud}`);
                observer.next(false);
                return;
            }

            //validate expiration and signature (library can also handle issuer and audience)
            this.validateSignature(token).subscribe(
                validated => {
                    if (validated) {
                        observer.next(true);
                    }
                    else {
                        observer.next(false);
                    }
                },
                err => {
                    console.error(err);
                    observer.next(false);
                },
                () => { observer.complete(); }
            );

            return;

        });

    }

    public validateSignature(token): Observable<boolean> {
        /* Retrieve from federated metadata endpoint.
        In this sample, the document was downloaded locally */
        return this.httpService.get("metadata/metadata.xml")
            .map((res: Response) => {
                let dom = (new DOMParser()).parseFromString(res.text(), "text/xml");
                let json = xml2json(dom, "");
                let cert = "-----BEGIN CERTIFICATE-----" + JSON.parse(json).EntityDescriptor[0]["ds:Signature"]["KeyInfo"]["X509Data"]["X509Certificate"] + "-----END CERTIFICATE-----";
                let key = KEYUTIL.getKey(cert);
                return KJUR.jws.JWS.verifyJWT(token, key, { alg: ['RS256'] });
            })
    }

}