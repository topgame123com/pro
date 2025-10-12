openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'last-archer.loader.js',
        unityConfigOptions: {
            codeUrl: 'last-archer.wasm.gz',
            dataUrl: 'last-archer.data.js.gz',
            frameworkUrl: 'last-archer.framework.js.gz',
            devicePixelRatio: 2,
        },
    },
    unityConfig: {
        codeUrl: 'last-archer.wasm.gz',
        dataUrl: 'last-archer.data.js.gz',
        frameworkUrl: 'last-archer.framework.js.gz',
        companyName: 'CrazyGames',
        productName: 'last-archer',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/last-archer',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
