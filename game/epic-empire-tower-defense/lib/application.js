const application = (function () {
    let canvas = document.querySelector('#unity-canvas');
    function bannerException(message, type) {
        if (type == 'error') {
            console.error(message);
            return;
        }
        console.warn(message);
    }
    let config = {
        arguments: [],
        dataUrl: runtimeData.dataURL,
        frameworkUrl: runtimeData.frameworkURL,
        workerUrl: runtimeData.workerURL,
        codeUrl: runtimeData.codeURL,
        symbolsUrl: runtimeData.symbolsURL,
        streamingAssetsUrl: runtimeData.streamingURL,
        companyName: runtimeData.companyName,
        productName: runtimeData.productName,
        productVersion: runtimeData.productVersion,
        showBanner: bannerException,
    };

    let instance = null;

    return {
        initialize: function () {
            let script = document.createElement('script');
            script.src = runtimeData.loaderURL;
            script.onload = () => {
                createUnityInstance(canvas, config, (progress) => {
                    sendLoadProgress(Math.min(0.9,progress));
                })
                    .then((unityInstance) => {
                        instance = unityInstance;
                        sendLoadProgress(1);
                    })
                    .catch((message) => {
                        console.error(message);
                    });
            };
            document.body.appendChild(script);
        },

        publishEvent(methodName, stringValue) {
            if (instance == null || instance == undefined) return;
            instance.SendMessage('JSCallbacks', methodName, stringValue);
        },

        isMobile() {
            return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
    };
})();
