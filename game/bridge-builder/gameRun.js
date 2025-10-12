addBlockedList('xsolla.com');
openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'bridge-builder-eoi.loader.js',
        unityConfigOptions: {
            codeUrl: 'bridge-builder-eoi.wasm.gz',
            dataUrl: 'bridge-builder-eoi.data.js.gz',
            frameworkUrl: 'bridge-builder-eoi.framework.js.gz',
            devicePixelRatio: 2,
        },
    },
    unityConfig: {
        codeUrl: 'bridge-builder-eoi.wasm.gz',
        dataUrl: 'bridge-builder-eoi.data.js.gz',
        frameworkUrl: 'bridge-builder-eoi.framework.js.gz',
        companyName: 'CrazyGames',
        productName: 'bridge-builder-eoi',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/bridge-builder-eoi',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
