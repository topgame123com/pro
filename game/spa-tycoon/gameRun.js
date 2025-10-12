openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'spa-tycoon.loader.js',
        unityConfigOptions: {
            codeUrl: 'spa-tycoon.wasm.gz',
            dataUrl: 'spa-tycoon.data.js.gz',
            frameworkUrl: 'spa-tycoon.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'spa-tycoon.wasm.gz',
        dataUrl: 'spa-tycoon.data.js.gz',
        frameworkUrl: 'spa-tycoon.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'spa-tycoon',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/spa-tycoon',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
