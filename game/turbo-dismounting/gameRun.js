openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'turbo-dismounting.loader.js',
        unityConfigOptions: {
            codeUrl: 'turbo-dismounting.wasm.gz',
            dataUrl: 'turbo-dismounting.data.js.gz',
            memoryUrl: '',
            symbolsUrl: '',
            frameworkUrl: 'turbo-dismounting.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'turbo-dismounting.wasm.gz',
        dataUrl: 'turbo-dismounting.data.js.gz',
        memoryUrl: '',
        symbolsUrl: '',
        frameworkUrl: 'turbo-dismounting.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'turbo-dismounting',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/turbo-dismounting',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
window.crazySDKObjectName = 'CrazySDK';
