addReplaceList('items/virtual_items', 'virtual_items.json', true);
addReplaceList('projects/282700/user_plans', 'user_plans.json', true);
openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'diamant-match-3-sky-story.loader.js',
        unityConfigOptions: {
            codeUrl: 'diamant-match-3-sky-story-opt.wasm.gz',
            dataUrl: 'diamant-match-3-sky-story.data.js.gz',
            frameworkUrl: 'diamant-match-3-sky-story.framework.js.gz',
            streamingAssetsUrl: 'assets',
        },
    },
    unityConfig: {
        codeUrl: 'diamant-match-3-sky-story-opt.wasm.gz',
        dataUrl: 'diamant-match-3-sky-story.data.js.gz',
        frameworkUrl: 'diamant-match-3-sky-story.framework.js.gz',
        streamingAssetsUrl: 'assets',
        companyName: 'CrazyGames',
        productName: 'diamant-match-3-sky-story',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/diamant-match-3-sky-story',
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
});
