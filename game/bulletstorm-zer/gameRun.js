addBlockedList('xsolla.com');
addReplaceList('https://files.crazygames.com/bulletstorm-zer/18/Build_Web/StreamingAssets', 'assets');
openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'bulletstorm-zer.loader.js',
        unityConfigOptions: {
            codeUrl: 'bulletstorm-zer.wasm.gz',
            dataUrl: 'bulletstorm-zer.data.js.gz',
            frameworkUrl: 'bulletstorm-zer.framework.js.gz',
            streamingAssetsUrl: 'https://files.crazygames.com/bulletstorm-zer/18/Build_Web/StreamingAssets',
        },
    },
    unityConfig: {
        codeUrl: 'bulletstorm-zer.wasm.gz',
        dataUrl: 'bulletstorm-zer.data.js.gz',
        frameworkUrl: 'bulletstorm-zer.framework.js.gz',
        streamingAssetsUrl: 'https://files.crazygames.com/bulletstorm-zer/18/Build_Web/StreamingAssets',
        companyName: 'CrazyGames',
        productName: 'bulletstorm-zer',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/bulletstorm-zer',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
