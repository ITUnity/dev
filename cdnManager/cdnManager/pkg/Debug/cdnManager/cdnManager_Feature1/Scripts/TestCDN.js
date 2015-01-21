self.addEventListener('message', function (e) {

    "use strict"

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if(xmlhttp.status === 200) {
                self.postMessage(true);
            }
            else {
                self.postMessage(false);
            }
        }
    };

    var url = e.data.url;
    xmlhttp.open("GET", url, false);
    xmlhttp.responseType = 'arraybuffer';
    xmlhttp.send();

}, false);