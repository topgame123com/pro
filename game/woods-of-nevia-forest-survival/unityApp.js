const unityApp = {
    applyCommonFixes: function () {
        // Disable unwanted page scroll.
        window.addEventListener('wheel', (event) => event.preventDefault(), {
            passive: false,
        });

        // Disable unwanted key events.
        window.addEventListener('keydown', (event) => {
            if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
                event.preventDefault();
            }
        });

        // Disable context menu appearing after right click outside of the unity canvas.
        window.addEventListener('contextmenu', (event) => event.preventDefault());
        document.addEventListener('contextmenu', (event) => event.preventDefault());
    },

    tryLockAspectRatio() {
        const mobileAspectRatioInput = '';
        const isMobileLocked = !this.isEmpty(mobileAspectRatioInput);
        const mobileAspectRatio = isMobileLocked ? this.toNumber(mobileAspectRatioInput) : 1.0;
        console.log('mobileAspectRatio', mobileAspectRatioInput, isMobileLocked, mobileAspectRatio);

        const desktopAspectRatioInput = '';
        const isDesktopLocked = !this.isEmpty(desktopAspectRatioInput);
        const desktopAspectRatio = isDesktopLocked ? this.toNumber(desktopAspectRatioInput) : 1.0;
        console.log('desktopAspectRatio', desktopAspectRatioInput, isDesktopLocked, desktopAspectRatio);

        const container = document.querySelector('#unity-container');
        const canvas = document.querySelector('#unity-canvas');

        function centerCanvas() {
            canvas.style.margin = 'auto';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.bottom = '0';
            canvas.style.right = '0';
        }

        function resetAspectRatio() {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            centerCanvas();
        }

        function recalculateAspectRatio(aspectRatio) {
            let containerWidth = container.clientWidth;
            let containerHeight = container.clientHeight;

            // Apply aspect ratio lock with pixel-perfect size.
            if (containerWidth / containerHeight > aspectRatio) {
                canvas.style.width = Math.floor(containerHeight * aspectRatio) + 'px';
                canvas.style.height = '100%';
            } else {
                canvas.style.width = '100%';
                canvas.style.height = Math.floor(containerWidth / aspectRatio) + 'px';
            }
        }

        function updateAspectRatio() {
            resetAspectRatio();
            if (unityApp.isMobile()) {
                // Mobile
                if (isMobileLocked) {
                    recalculateAspectRatio(mobileAspectRatio);
                }
            } else {
                // Desktop
                if (isDesktopLocked) {
                    recalculateAspectRatio(desktopAspectRatio);
                }
            }
            centerCanvas();
        }

        // Subscribe to window and document events.
        window.addEventListener('load', updateAspectRatio);
        window.addEventListener('resize', updateAspectRatio);
        document.addEventListener('readystatechange', updateAspectRatio);
        document.addEventListener('DOMContentLoaded', updateAspectRatio);

        // Update aspect ratio on start.
        updateAspectRatio();
    },

    startLoading: function () {
        const canvas = document.querySelector('#unity-canvas');
        const progressBarFull = document.querySelector('#unity-progress-bar-full');

        const loaderUrl = 'woods-of-nevia-forest-survival.loader.js';
        const config = {
            arguments: [],
            dataUrl: 'woods-of-nevia-forest-survival.data.js.gz',
            frameworkUrl: 'woods-of-nevia-forest-survival.framework.js.gz',
            codeUrl: 'woods-of-nevia-forest-survival.wasm.gz',
            streamingAssetsUrl: 'assets',
            companyName: 'ElandGames',
            productName: 'Woods of Nevia',
            productVersion: '0.1.1.5',
            showBanner: (msg, type) => {
                switch (type) {
                    case 'error': {
                        console.error(msg);
                        break;
                    }
                    default: {
                        console.warn(msg);
                        break;
                    }
                }
            },
        };

        // By default Unity keeps WebGL canvas render target size matched with
        // the DOM size of the canvas element (scaled by window.devicePixelRatio)
        // Set this to false if you want to decouple this synchronization from
        // happening inside the engine, and you would instead like to size up
        // the canvas DOM size and WebGL render target sizes yourself.
        const matchWebGLToCanvasSize = '';
        console.log('matchWebGLToCanvasSize', matchWebGLToCanvasSize);
        if (!this.isEmpty(matchWebGLToCanvasSize)) {
            config.matchWebGLToCanvasSize = this.toBoolean(matchWebGLToCanvasSize);
        }

        // If you would like all file writes inside Unity Application.persistentDataPath
        // directory to automatically persist so that the contents are remembered when
        // the user revisits the site the next time, uncomment the following line:
        const autoSyncPersistentDataPath = '';
        console.log('autoSyncPersistentDataPath', autoSyncPersistentDataPath);
        if (!this.isEmpty(autoSyncPersistentDataPath)) {
            config.autoSyncPersistentDataPath = this.toBoolean(autoSyncPersistentDataPath);
        }
        // This autosyncing is currently not the default behavior to avoid regressing
        // existing user projects that might rely on the earlier manual
        // JS_FileSystem_Sync() behavior, but in future Unity version, this will be
        // expected to change.

        // To lower canvas resolution on mobile devices to gain some
        // performance, uncomment the following line:
        const devicePixelRatio = this.toNumber('');
        console.log('devicePixelRatio', devicePixelRatio);
        if (this.isNumber(devicePixelRatio)) {
            config.devicePixelRatio = this.toNumber(devicePixelRatio);
        }

        const script = document.createElement('script');
        script.src = loaderUrl;
        script.onload = () => {
            createUnityInstance(canvas, config, (progress) => {
                sendLoadProgress(Math.min(0.9,progress));
            })
                .then((unityInstance) => {
                    sendLoadProgress(1);
                })
                .catch((message) => {
                    alert(message);
                });
        };
        document.body.appendChild(script);
    },

    isMobile: function () {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },

    isEmpty: function (value) {
        return value === undefined || value === null || value === '';
    },

    toBoolean: function (value) {
        return value === true || value === 'true' || value === 1 || value === '1' || value === 'True';
    },

    isNumber: function (value) {
        return typeof value === 'number' && !isNaN(value);
    },

    toNumber: function (value) {
        function handleMathExpression(str) {
            const mathMatch = str.match(/^(\d*\.?\d+)\s*([+\-*/])\s*(\d*\.?\d+)$/);
            if (!mathMatch) return null;

            const a = parseFloat(mathMatch[1]);
            const operator = mathMatch[2];
            const b = parseFloat(mathMatch[3]);

            const operators = {
                '+': function (a, b) {
                    return a + b;
                },
                '-': function (a, b) {
                    return a - b;
                },
                '*': function (a, b) {
                    return a * b;
                },
                '/': function (a, b) {
                    return b !== 0 ? a / b : 0;
                },
            };
            return operators[operator](a, b);
        }

        function convertToNumber(str) {
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
        }

        // Handle basic type checks first.
        if (this.isNumber(value)) return value;
        if (this.isEmpty(value)) return 0;

        // Convert to string and handle empty case.
        var str = String(value).trim();
        if (str === '') return 0;

        // Try math expression or simple number conversion.
        return handleMathExpression(str) || convertToNumber(str);
    },
};

// Apply common fixes.
unityApp.applyCommonFixes();
unityApp.tryLockAspectRatio();

unityApp.startLoading();
