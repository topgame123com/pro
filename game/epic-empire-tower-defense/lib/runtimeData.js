const runtimeData = (function () {
    return {
        // Basic information.
        companyName: 'Amaterasu',
        productName: 'Epic Empire',
        productVersion: '1.3',
        sdkVersion: '3.19.10+merge4',
        productDescription: '',

        // File references.
        buildURL: 'bin',
        loaderURL: 'bin/epic-empire_Web_CrazyGames.loader.js',
        dataURL: 'bin/epic-empire_Web_CrazyGames.data.js.gz',
        frameworkURL: 'bin/epic-empire_Web_CrazyGames.framework.js.gz',
        workerURL: '',
        codeURL: 'bin/epic-empire_Web_CrazyGames-opt.wasm.gz',
        symbolsURL: '',
        streamingURL: 'streaming',

        // Visual information.
        logoType: 'LOGO_TYPE',
        iconTextureName: 'ed40804e_4cc1_48e5_b91f_0b2d1fbe0e61_800_800x800.png',
        backgroundTextureName: 'background_1280x720.png',

        // Aspect ratio.
        desktopAspectRatio: -1,
        mobileAspectRatio: -1,

        // Debug mode.
        debugMode: false,
        rotationLockType: 'None',

        // Prefs.
        prefsContainerTags: ['json-data'],

        // Platform specific scripts.
        wrapperScript: 'crazyGamesWrapper.js',

        // YandexGames.
        yandexGamesSDK: '/sdk.js',

        // Yandex Ads Network.
        yandexGameId: '',
        yandexBannerId: '',
        yandexInterstitialDesktopId: '',
        yandexInterstitialMobileId: '',
        yandexRewardedDesktopId: '',
        yandexRewardedMobileId: '',

        // GameDistribution.
        gameDistributionId: '',
        gameDistributionPrefix: 'mirragames_',

        // CrazyGames.
        crazyGamesXSollaProjectId: '',

        // GamePush.
        gamepushProjectId: '',
        gamepushToken: '',
    };
})();
