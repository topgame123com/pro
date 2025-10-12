openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'diver-hero.loader.js',
        unityConfigOptions: {
            codeUrl: 'diver-hero.wasm.gz',
            dataUrl: 'diver-hero.data.js.gz',
            frameworkUrl: 'diver-hero.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'diver-hero.wasm.gz',
        dataUrl: 'diver-hero.data.js.gz',
        frameworkUrl: 'diver-hero.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'diver-hero',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/diver-hero',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
