declare module KJUR {
    module jws {
        module JWS {
            function readSafeJSONString(token: string): any;
            function verifyJWT(token: string, key: string, data: Object): boolean;
       }
    }
}

declare module KEYUTIL {
    function getKey(cert: string): string;
}

declare function b64utos(token: string);

declare class TokenHeader{
    alg: string;
    type: string;
    kid: string;
}

declare class TokenClaims{
    nonce: string; 
    family_name: string; 
    ver: string; 
    sub: string; 
    city: string; 
    iss: string; 
    jobTitle: string; 
    oid: string; 
    state: string; 
    name: string; 
    acr: string; 
    streetAddress: string; 
    given_name: string; 
    exp: string; 
    auth_time: string; 
    postalCode: string; 
    iat: string; 
    country: string; 
    nbf: string; 
    aud: string;
}


