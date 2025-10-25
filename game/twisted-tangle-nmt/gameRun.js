addBlockedList('rollic.gs');
openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'twisted-tangle-nmt.loader.js',
        unityConfigOptions: {
            codeUrl: 'twisted-tangle-nmt.wasm.gz',
            dataUrl: 'twisted-tangle-nmt.data.js.gz',
            frameworkUrl: 'twisted-tangle-nmt.framework.js.gz',
        },
    },
    unityConfig: {
        codeUrl: 'twisted-tangle-nmt.wasm.gz',
        dataUrl: 'twisted-tangle-nmt.data.js.gz',
        frameworkUrl: 'twisted-tangle-nmt.framework.js.gz',
        companyName: 'CrazyGames',
        productName: 'twisted-tangle-nmt',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/twisted-tangle-nmt',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
