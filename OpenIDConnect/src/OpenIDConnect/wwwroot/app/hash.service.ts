export class HashService {
    constructor() {
    }
    public getValueFromHash(key: string): string {

        try {
            var args = window.location.hash.substring(1).split("&");
            var r = null;
            for (var i = 0; i < args.length; i++) {
                var n = args[i].split("=");
                if (n[0] == key)
                    r = decodeURIComponent(n[1]);
            }
            return r;
        }
        catch (err) {
            return null;
        }
    }
}