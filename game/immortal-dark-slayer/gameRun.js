addReplaceList('config.uca.cloud.unity3d.com', 'unity3d.config.json',true);
addReplaceList('virtual_items', 'virtual_items.json',true);
openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'immortal-dark-slayer.loader.js',
        unityConfigOptions: {
            codeUrl: 'immortal-dark-slayer.wasm.gz',
            dataUrl: 'immortal-dark-slayer.data.gz',
            frameworkUrl: 'immortal-dark-slayer.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'immortal-dark-slayer.wasm.gz',
        dataUrl: 'immortal-dark-slayer.data.gz',
        frameworkUrl: 'immortal-dark-slayer.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'immortal-dark-slayer',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/immortal-dark-slayer',
        userInfo: {
            countryCode: 'US',
            device: {
                type: 'mobile',
            },
            os: {
                name: 'Android',
                version: '15',
            },
            browser: {
                name: 'MIUI Browser',
                version: '18.3.391120',
            },
        },
    },
    isIos: false,
});
