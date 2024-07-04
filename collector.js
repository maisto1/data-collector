document.addEventListener('DOMContentLoaded',function(){
    data = {
        "ua":navigator?.userAgent || '',
        "plugins": plugins(),
        "appVer":navigator.appVersion,
        "lang":navigator.language,
        "userLang":navigator.userLanguage,
        "browserLang":navigator.browserLanguage,
        "systemLang":navigator.systemLanguage,
        "langs":navigator.languages,
        "canvas":canvas(),
        "time":new Date().getTimezoneOffset(),
        "platform":navigator.platform,
        "res":screenSize(),
        "clientSize": clientSize(),
        "appCodeName":navigator.appCodeName,
        "appName":navigator.appName,
        "oscpu":window.navigator.oscpu || "",
    }

    fetch('https://serverdata-bphz.onrender.com/collect-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'*/*',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        changeStatus()
    })

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

    return scrR + "_" + scrL + "_" + width + "_" + height + "_" + sW + "_" + sAW + "_" + sAH
}

function screenSize(){
    return screen.width + "_" + screen.height + "_" + screen.colorDepth + "_" + window.devicePixelRatio
}

function changeStatus(){
    const spinner = document.querySelector('.spinner');

    spinner.style.display = 'none';

    const checkIcon = document.createElement('img');
    checkIcon.src = 'static/checked.png';
    checkIcon.alt = 'Check';
    checkIcon.classList.add('check-icon');

    spinner.parentNode.insertBefore(checkIcon, spinner.nextSibling);

}