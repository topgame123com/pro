openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'spider-solitaire-fuw.loader.js',
        unityConfigOptions: {
            codeUrl: 'spider-solitaire-fuw.wasm.gz',
            dataUrl: 'spider-solitaire-fuw.data.js.gz',
            frameworkUrl: 'spider-solitaire-fuw.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'spider-solitaire-fuw.wasm.gz',
        dataUrl: 'spider-solitaire-fuw.data.js.gz',
        frameworkUrl: 'spider-solitaire-fuw.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'spider-solitaire-fuw',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/spider-solitaire-fuw',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
