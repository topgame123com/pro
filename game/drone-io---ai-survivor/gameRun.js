openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'drone-io---ai-survivor.loader.js',
        unityConfigOptions: {
            codeUrl: 'drone-io---ai-survivor.wasm.gz',
            dataUrl: 'drone-io---ai-survivor.data.js.gz',
            frameworkUrl: 'drone-io---ai-survivor.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'drone-io---ai-survivor.wasm.gz',
        dataUrl: 'drone-io---ai-survivor.data.js.gz',
        frameworkUrl: 'drone-io---ai-survivor.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'drone-io---ai-survivor',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/drone-io---ai-survivor',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
