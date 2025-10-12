openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'money-ping-pong-stj.loader.js',
        unityConfigOptions: {
            codeUrl: 'money-ping-pong-stj.wasm.gz',
            dataUrl: 'money-ping-pong-stj.data.js.gz',
            frameworkUrl: 'money-ping-pong-stj.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'money-ping-pong-stj.wasm.gz',
        dataUrl: 'money-ping-pong-stj.data.js.gz',
        frameworkUrl: 'money-ping-pong-stj.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'money-ping-pong-stj',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/money-ping-pong-stj',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
