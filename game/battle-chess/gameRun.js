openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'battle-chess.loader.js',
        unityConfigOptions: {
            codeUrl: 'battle-chess.wasm.gz',
            dataUrl: 'battle-chess.data.js.gz',
            frameworkUrl: 'battle-chess.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'battle-chess.wasm.gz',
        dataUrl: 'battle-chess.data.js.gz',
        frameworkUrl: 'battle-chess.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'battle-chess',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/battle-chess',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
