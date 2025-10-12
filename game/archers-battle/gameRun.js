openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'archers-battle.loader.js',
        unityConfigOptions: {
            codeUrl: 'archers-battle.wasm.gz',
            dataUrl: 'archers-battle.data.js.gz',
            frameworkUrl: 'archers-battle.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'archers-battle.wasm.gz',
        dataUrl: 'archers-battle.data.js.gz',
        frameworkUrl: 'archers-battle.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'archers-battle',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/archers-battle',
        userInfo: fakeUserInfo()
    },
    isIos: isIOS(),
});
