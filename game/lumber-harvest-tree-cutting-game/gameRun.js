openBlockURL();
initCrazyUnityGame({
    type: 'unity2020config',
    loaderOptions: {
        showProgress: true,
        unityLoaderUrl: 'lumber-harvest-tree-cutting-game.loader.js',
        unityConfigOptions: {
            codeUrl: 'lumber-harvest-tree-cutting-game.wasm.gz',
            dataUrl: 'lumber-harvest-tree-cutting-game.data.js.gz',
            frameworkUrl: 'lumber-harvest-tree-cutting-game.framework.js.gz',
            devicePixelRatio: 2,
        },
    },
    unityConfig: {
        codeUrl: 'lumber-harvest-tree-cutting-game.wasm.gz',
        dataUrl: 'lumber-harvest-tree-cutting-game.data.js.gz',
        frameworkUrl: 'lumber-harvest-tree-cutting-game.framework.js.gz',
        companyName: 'CrazyGames',
        productName: 'lumber-harvest-tree-cutting-game',
        productVersion: '1.0',
    },
    oldSdkInitObject: {
        gameLink: 'https://www.crazygames.com/game/lumber-harvest-tree-cutting-game',
        userInfo: fakeUserInfo(),
    },
    isIos: isIOS(),
});
