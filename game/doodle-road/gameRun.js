openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'doodle-road.loader.js',
        unityConfigOptions: {
            codeUrl: 'doodle-road.wasm.gz',
            dataUrl: 'doodle-road.data.js.gz',
            frameworkUrl: 'doodle-road.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'doodle-road.wasm.gz',
        dataUrl: 'doodle-road.data.js.gz',
        frameworkUrl: 'doodle-road.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'doodle-road',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/doodle-road',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
