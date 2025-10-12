addBlockedList('xsolla.com');
openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'sniper-team-3.loader.js',
        unityConfigOptions: {
            codeUrl: 'sniper-team-3.wasm.gz',
            dataUrl: 'sniper-team-3.data.js.gz',
            frameworkUrl: 'sniper-team-3.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'sniper-team-3.wasm.gz',
        dataUrl: 'sniper-team-3.data.js.gz',
        frameworkUrl: 'sniper-team-3.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'sniper-team-3',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/sniper-team-3',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
