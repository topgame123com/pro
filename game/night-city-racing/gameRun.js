openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'night-city-racing.loader.js',
        unityConfigOptions: {
            codeUrl: 'night-city-racing.wasm.gz',
            dataUrl: 'night-city-racing.data.js.gz',
            frameworkUrl: 'night-city-racing.framework.js.gz',
        },
    },
    unityConfig: {
        codeUrl: 'night-city-racing.wasm.gz',
        dataUrl: 'night-city-racing.data.js.gz',
        frameworkUrl: 'night-city-racing.framework.js.gz',
        companyName: 'CrazyGames',
        productName: 'night-city-racing',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/night-city-racing',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
