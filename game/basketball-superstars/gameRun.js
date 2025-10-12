openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'basketball-superstars.loader.js',
        unityConfigOptions: {
            codeUrl: 'basketball-superstars.wasm.gz',
            dataUrl: 'basketball-superstars.data.js.gz',
            frameworkUrl: 'basketball-superstars.framework.js.gz',
            devicePixelRatio: 2,
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'basketball-superstars.wasm.gz',
        dataUrl: 'basketball-superstars.data.js.gz',
        frameworkUrl: 'basketball-superstars.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'basketball-superstars',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/basketball-superstars',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
