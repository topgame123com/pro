addReplaceList('/api/Game/Get/BaseInfo','BaseInfo.json',true);
addBlockedList('fullhp.work');
openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'nitro-burnout.loader.js',
        unityConfigOptions: {
            codeUrl: 'nitro-burnout.wasm.gz',
            dataUrl: 'nitro-burnout.data.js.gz',
            frameworkUrl: 'nitro-burnout.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'nitro-burnout.wasm.gz',
        dataUrl: 'nitro-burnout.data.js.gz',
        frameworkUrl: 'nitro-burnout.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'nitro-burnout',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/nitro-burnout',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
