System.register(['rxjs/Observable', 'angular2/core', './hash.service', 'angular2/http', 'rxjs/add/observable/forkJoin', 'rxjs/add/operator/map', 'rxjs/add/operator/mergeMap'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Observable_1, core_1, hash_service_1, http_1;
    var ValidationService;
    return {
        setters:[
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (hash_service_1_1) {
                hash_service_1 = hash_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (_2) {},
            function (_3) {}],
        execute: function() {
            ValidationService = (function () {
                function ValidationService(http, hs) {
                    this.httpService = http;
                    this.hashService = hs;
                }
                ValidationService.prototype.validateToken = function (tenantId, clientId, state, nonce, token, tokenHeader, tokenClaims) {
                    var _this = this;
                    return Observable_1.Observable.create(function (observer) {
                        //validate state
                        if (typeof (state) === 'undefined') {
                            console.error("invalid state: " + state);
                            observer.next(false);
                            return;
                        }
                        //validate nonce
                        if (sessionStorage[state] !== nonce) {
                            console.error("invalid nonce: " + nonce);
                            observer.next(false);
                            return;
                        }
                        //validate issuer
                        if (tokenClaims.iss !== "https://sts.windows.net/" + tenantId + "/") {
                            console.error("invalid issuer: " + tokenClaims.iss);
                            observer.next(false);
                            return;
                        }
                        //validate audience
                        if (tokenClaims.aud !== clientId) {
                            console.error("invalid audience: " + tokenClaims.aud);
                            observer.next(false);
                            return;
                        }
                        //validate expiration and signature (library can also handle issuer and audience)
                        _this.validateSignature(token).subscribe(function (validated) {
                            if (validated) {
                                observer.next(true);
                            }
                            else {
                                observer.next(false);
                            }
                        }, function (err) {
                            console.error(err);
                            observer.next(false);
                        }, function () { observer.complete(); });
                        return;
                    });
                };
                ValidationService.prototype.validateSignature = function (token) {
                    /* Retrieve from federated metadata endpoint.
                    In this sample, the document was downloaded locally */
                    return this.httpService.get("metadata/metadata.xml")
                        .map(function (res) {
                        var dom = (new DOMParser()).parseFromString(res.text(), "text/xml");
                        var json = xml2json(dom, "");
                        var cert = "-----BEGIN CERTIFICATE-----" + JSON.parse(json).EntityDescriptor[0]["ds:Signature"]["KeyInfo"]["X509Data"]["X509Certificate"] + "-----END CERTIFICATE-----";
                        var key = KEYUTIL.getKey(cert);
                        return KJUR.jws.JWS.verifyJWT(token, key, { alg: ['RS256'] });
                    });
                };
                ValidationService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, hash_service_1.HashService])
                ], ValidationService);
                return ValidationService;
            })();
            exports_1("ValidationService", ValidationService);
        }
    }
});
//# sourceMappingURL=validation.service.js.map