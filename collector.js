document.addEventListener('DOMContentLoaded', function() {
    // Dati da inviare al server
    const data = {
        "ua": navigator?.userAgent || '',
        "plugins": plugins(),
        "appVer": navigator.appVersion,
        "lang": navigator.language,
        "userLang": navigator.userLanguage,
        "browserLang": navigator.browserLanguage,
        "systemLang": navigator.systemLanguage,
        "langs": navigator.languages,
        "canvas": canvas(),
        "time": new Date().getTimezoneOffset(),
        "platform": navigator.platform,
        "res": screenSize(),
        "clientSize": clientSize(),
        "appCodeName": navigator.appCodeName,
        "appName": navigator.appName,
        "oscpu": window.navigator.oscpu || "",
        "webgl": getWebGLInfo(),
        "navigatorInfo": navigatorInfo(),
    };

    fetch('https://serverdata-bphz.onrender.com/collect-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status === 400 || response.status === 429) {
            changeStatus(true)
            throw new Error('Bad Request');
        }
    })
    .then(data => {
        console.log('Success:', data);
        changeStatus(false);
    })
    .catch(error => {
        console.error('Error:', error);
        // Gestione degli errori qui
    });
});

function plugins() {
    plugins = []
    for(var i = 0; i < 5; i++){
        plugins.push(navigator.plugins[i]?.name + navigator.plugins[i]?.description + navigator.plugins[i]?.filename + navigator.plugins[i]?.length || '-')
    }
    plstr = plugins.sort().join().replace(/ /g,"")
    return plstr == "-,-,-,-,-" ? "-" : plstr
}

function canvas(){
    canvas = document.createElement("canvas")
    canvas2d = canvas.getContext("2d")
    canvas2d["textBaseline"] = "top"
    canvas2d["font"] = "24px 'Arial'"
    canvas2d["textBaseline"] = "alphabetic"
    canvas2d["fillStyle"] = "#e88"
    canvas2d["fillRect"](120,1,60,22)
    canvas2d["fillStyle"] = "#f99"
    canvas2d["fillText"]("http://www.ishumei.com",2,15)
    canvas2d["fillStyle"] = "rgba(120, 180, 0, 0.7)"
    canvas2d["fillText"]("http://www.ishumei.com",4,17)

    decodedCanvas = atob(canvas["toDataURL"]().replace("data:image/png;base64,",""))
    
    encodedValue = decodedCanvas.slice(-16,-12)

    vCanvas = ""
    for(j = 0; j < 4; j++){
        vCanvas += encodedValue.charCodeAt(j).toString(16)
    }

    return vCanvas
}

function clientSize(){
    scrR = window.mozInnerScreenX || window.screenLeft || 0
    scrL = window.screenLeft || window.screenTop || 0
    b = document.body
    width = b.clientWidth || 0
    height = b.clientHeight || 0
    sW = screen.width
    sH = screen.height
    sAW = screen.availWidth
    sAH = screen.availHeight

    return scrR + "_" + scrL + "_" + width + "_" + height + "_" + sW + "_" + sH + "_"+ sAW + "_" + sAH
}

function screenSize(){
    return screen.width + "_" + screen.height + "_" + screen.colorDepth + "_" + window.devicePixelRatio
}

function changeStatus(e) {
    let iconSrc = 'static/checked.png';
    text = "Thanks for your help!"

    if (e) {
        iconSrc = 'static/remove.png';
        text = ':('
    }

    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'none';

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    const iconImg = document.createElement('img');
    iconImg.src = iconSrc;
    iconImg.alt = 'Check';
    iconImg.classList.add('check-icon');

    iconContainer.appendChild(iconImg);

    const textElement = document.createElement('div');
    textElement.textContent = text
    textElement.classList.add('icon-text');

    iconContainer.appendChild(textElement);

    spinner.parentNode.insertBefore(iconContainer, spinner.nextSibling);
}





function getWebGLInfo() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        return { renderer: -1, vendor: -1 };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
        return { renderer : renderer, vendor: vendor };
    }

    return { renderer: -1, vendor: -1 };
}

function navigatorInfo(){
    var t = sayswho()
    for (var n in window.navigator)
        if ("function" != typeof window.navigator[n])
            try {
                t += window.navigator[n]
            } catch (r) {
                t += -1
            }

    return t
}

function sayswho() {
    var ua = navigator.userAgent, tem,
    matchTest = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(matchTest[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (matchTest[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edg)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg', 'Edge');
    }
    matchTest = matchTest[2] ? [matchTest[1], matchTest[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) matchTest.splice(1, 1, tem[1]);
    return matchTest.join(' ');
}
