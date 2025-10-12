var myGameInstance = null;
var container = document.querySelector('#unity-container');
var canvas = document.querySelector('#unity-canvas');
var progressBarFull = document.querySelector('#unity-progress-bar-full');
var loadingBar = document.querySelector('#unity-loading-bar');

var player;
var lb;
var payments;

var buildUrl = 'Build';
var config = {
    dataUrl: buildUrl + '/take-actions.data.br',
    frameworkUrl: buildUrl + '/take-actions.framework.js.gz',
    codeUrl: buildUrl + '/take-actions.wasm.br',
    streamingAssetsUrl: 'assets',
    companyName: 'DefaultCompany',
    productName: 'Test3D',
    productVersion: '0.0.1',
    showBanner: null,
};

loadingBar.style.display = 'block';
config['webglContextAttributes'] = { preserveDrawingBuffer: true };

if (/iPhone|iPad|iPod|Android|Mobi/i.test(navigator.userAgent)) {
    config.devicePixelRatio = 1;
}

canvas.style.width = '100%';
canvas.style.height = '100%';

function init() {
    createUnityInstance(canvas, config, (progress) => {
        sendLoadProgress(Math.min(0.9,progress));
    }).then((unityInstance) => {
        loadingBar.style.display = 'none';
        myGameInstance = unityInstance;

        myGameInstance.SendMessage('Webgl', 'OnSDKInitialized');

        window.addEventListener('beforeunload', function (e) {
            myGameInstance.SendMessage('Webgl', 'OnRefresh');
        });
    });
}

init();

window.addEventListener('wheel', (event) => event.preventDefault(), {
    passive: false,
});

window.addEventListener('keydown', (event) => {
    if (['ArrowUp', 'ArrowDown', ' '].includes(event.key)) {
        event.preventDefault();
    }
});

function resetWindowFocus() {
    console.log('[resetWindowFocus]');
    window.focus();
    canvas.focus();
}

function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000);
}

function inverseLerp(a, b, value) {
    if (a != b) return clamp01((value - a) / (b - a));
    else return 0.0;
}

function clamp01(value) {
    if (value < 0.0) return 0.0;
    else if (value > 1.0) return 1.0;
    else return value;
}

function lockCursor(value) {
    if (value) {
        const promise = canvas.requestPointerLock({
            unadjustedMovement: true,
        });

        if (!promise) {
            console.log('disabling mouse acceleration is not supported');
            return;
        }

        return promise.catch((error) => {
            if (error.name === 'NotSupportedError') {
                return canvas.requestPointerLock();
            }
        });
    } else {
        document.exitPointerLock();
    }
}

document.addEventListener('pointerlockchange', lockChangeAlert, false);

function lockChangeAlert() {
    if (document.pointerLockElement === canvas) {
        myGameInstance.SendMessage('Webgl', 'OnPointerLocked');
    } else {
        myGameInstance.SendMessage('Webgl', 'OnPointerUnlocked');
    }
}

function getOtherGames() {
    myGameInstance.SendMessage('Webgl', 'GetOtherGamesCallback', '[]');
}

function clickedOnOtherGameIcon(index, lang) {}
