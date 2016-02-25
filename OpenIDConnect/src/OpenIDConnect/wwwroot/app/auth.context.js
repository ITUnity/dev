System.register(['angular2/core', 'rxjs/Observable', './validation.service', './hash.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1, validation_service_1, hash_service_1;
    var AuthContext;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (validation_service_1_1) {
                validation_service_1 = validation_service_1_1;
            },
            function (hash_service_1_1) {
                hash_service_1 = hash_service_1_1;
            }],
        execute: function() {
            AuthContext = (function () {
                function AuthContext(vs, hs) {
                    this.clientId = ""; //GUID from the application registration
                    this.tenantId = ""; //GUID from the Azure tenant
                    this.validationService = vs;
                    this.hashService = hs;
                    //create a new session
                    if (!window.location.hash) {
                        this.state = this.createNonce();
                        this.nonce = this.createNonce();
                        sessionStorage[this.state] = this.nonce;
                    }
                }
                AuthContext.prototype.validateSession = function () {
                    var _this = this;
                    return Observable_1.Observable.create(function (observer) {
                        //look for a return fragment, which indicates a token
                        if (window.location.hash) {
                            try {
                                //reconstitute session information
                                _this.state = _this.hashService.getValueFromHash('state');
                                _this.nonce = sessionStorage[_this.state];
                                //extract token information
                                var token = _this.hashService.getValueFromHash('id_token');
                                var tokenHeader = KJUR.jws.JWS.readSafeJSONString(b64utos(token.split('.')[0]));
                                var tokenClaims = KJUR.jws.JWS.readSafeJSONString(b64utos(token.split('.')[1]));
                                var tokenSignature = token.split('.')[2];
                                //get profile information from token
                                console.log("claims: " + tokenClaims);
                                _this.fullName = tokenClaims.name;
                                //validate token
                                _this.validationService.validateToken(_this.tenantId, _this.clientId, _this.state, _this.nonce, token, tokenHeader, tokenClaims)
                                    .subscribe(function (validated) {
                                    if (validated) {
                                        console.info('token validated!');
                                        observer.next(true);
                                    }
                                    else {
                                        console.info('token validation failed!');
                                        observer.next(false);
                                    }
                                }, function (err) {
                                    observer.error(err);
                                }, function () {
                                    observer.complete();
                                });
                            }
                            catch (err) {
                                observer.error(err);
                            }
                        }
                        else {
                            observer.next(false);
                        }
                    });
                };
                AuthContext.prototype.getSignInEndpoint = function () {
                    var endpoint = "https://login.microsoftonline.com/" + this.tenantId + "/oauth2/authorize?" +
                        "response_type=id_token&" +
                        "response_mode=fragment&" +
                        "client_id=" + this.clientId + "&" +
                        "redirect_uri=https://localhost:44330/&" +
                        "scope=openid&" +
                        "state=" + this.state + "&" +
                        "nonce=" + this.nonce;
                    console.log(endpoint);
                    return endpoint;
                };
                AuthContext.prototype.getLogOutEndpoint = function () {
                    var endpoint = "https://login.microsoftonline.com/" + this.tenantId + "/oauth2/logout?" +
                        "post_logout_redirect_uri=https://localhost:44330/";
                    console.log(endpoint);
                    return endpoint;
                };
                AuthContext.prototype.clear = function () {
                    this.nonce = undefined;
                    this.state = undefined;
                };
                AuthContext.prototype.createNonce = function () {
                    var nonce = "";
                    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for (var i = 0; i < 32; i++) {
                        nonce += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    return nonce;
                };
                AuthContext = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [validation_service_1.ValidationService, hash_service_1.HashService])
                ], AuthContext);
                return AuthContext;
            })();
            exports_1("AuthContext", AuthContext);
        }
    }
});
//# sourceMappingURL=auth.context.js.map