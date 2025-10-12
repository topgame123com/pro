openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'hungry-frog-zot.loader.js',
        unityConfigOptions: {
            codeUrl: 'hungry-frog-zot.wasm.gz',
            dataUrl: 'hungry-frog-zot.data.js.gz',
            frameworkUrl: 'hungry-frog-zot.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'hungry-frog-zot.wasm.gz',
        dataUrl: 'hungry-frog-zot.data.js.gz',
        frameworkUrl: 'hungry-frog-zot.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'hungry-frog-zot',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/hungry-frog-zot',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
