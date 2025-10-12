openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'loaders-inc-mrb.loader.js',
        unityConfigOptions: {
            codeUrl: 'loaders-inc-mrb.wasm.gz',
            dataUrl: 'loaders-inc-mrb.data.js.gz',
            frameworkUrl: 'loaders-inc-mrb.framework.js.gz',
        },
    },
    unityConfig: {
        codeUrl: 'loaders-inc-mrb.wasm.gz',
        dataUrl: 'loaders-inc-mrb.data.js.gz',
        frameworkUrl: 'loaders-inc-mrb.framework.js.gz',
        companyName: 'CrazyGames',
        productName: 'loaders-inc-mrb',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/loaders-inc-mrb',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
