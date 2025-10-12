openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'street-food-simulator.loader.js',
        unityConfigOptions: {
            codeUrl: 'street-food-simulator.wasm.gz',
            dataUrl: 'street-food-simulator.data.js.gz',
            frameworkUrl: 'street-food-simulator.framework.js.gz',
        },
    },
    unityConfig: {
        codeUrl: 'street-food-simulator.wasm.gz',
        dataUrl: 'street-food-simulator.data.js.gz',
        frameworkUrl: 'street-food-simulator.framework.js.gz',
        companyName: 'CrazyGames',
        productName: 'street-food-simulator',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/street-food-simulator',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
