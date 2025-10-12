openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'mr-racer-stunt-mania.loader.js',
        unityConfigOptions: {
            codeUrl: 'mr-racer-stunt-mania.wasm.gz',
            dataUrl: 'mr-racer-stunt-mania.data.js.gz',
            frameworkUrl: 'mr-racer-stunt-mania.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'mr-racer-stunt-mania.wasm.gz',
        dataUrl: 'mr-racer-stunt-mania.data.js.gz',
        frameworkUrl: 'mr-racer-stunt-mania.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'mr-racer-stunt-mania',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/mr-racer-stunt-mania',
        userInfo: fakeUserInfo(),
    },
});
