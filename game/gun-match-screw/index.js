System.register(['./application.js'], function (_export, _context) {
    'use strict';

    var Application, canvas, $p, bcr, application;
    function topLevelImport(url) {
        return System['import'](url);
    }
    return {
        setters: [
            function (_applicationJs) {
                Application = _applicationJs.Application;
            },
        ],
        execute: function () {
            (() => {
                const MAX_SKIPS = 3;
                const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour

                let skipsLeft = MAX_SKIPS;
                let cooldownStart = null; // timestamp

                function getStatus() {
                    const now = Date.now();

                    if (skipsLeft > 0) {
                        return [true, `You can skip the ad. Remaining: ${skipsLeft - 1} / ${MAX_SKIPS}`];
                    } else {
                        const remaining = cooldownStart + COOLDOWN_MS - now;
                        if (remaining > 0) {
                            const mins = Math.floor(remaining / 60000);
                            const secs = Math.floor((remaining % 60000) / 1000);
                            return [false, `Please wait ${mins}m ${secs}s to skip ads again.`];
                        } else {
                            skipsLeft = MAX_SKIPS;
                            cooldownStart = null;
                            return [true, `You can skip the ad. Remaining: ${skipsLeft - 1} / ${MAX_SKIPS}`];
                        }
                    }
                }

                window.hideLoading = () => {
                    if (cc.find('Canvas').getChildByName('diyloading')) {
                        cc.find('Canvas').getChildByName('diyloading').active = false;
                    }
                };
                window.showLoading = () => {
                    if (cc.find('Canvas').getChildByName('diyloading')) {
                        cc.find('Canvas').getChildByName('diyloading').active = true;
                        return;
                    }
                    var node = new cc.Node();
                    var sprite = node.addComponent(cc.Sprite);
                    var imageObj = new Image();
                    imageObj.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAAA1BMVEX///+nxBvIAAAACklEQVQI12MAAgAABAABINItbwAAAABJRU5ErkJggg==';
                    var textureObj = new cc.Texture2D();
                    textureObj.image = new cc.ImageAsset(imageObj);
                    var sf = new cc.SpriteFrame();
                    sf.texture = textureObj;
                    node._layer = 33554432;

                    sprite.spriteFrame = sf;
                    sprite.color = cc.Color.GRAY;
                    node.name = 'diyloading';
                    cc.find('Canvas').addChild(node);

                    // 获取底框的 UITransform 组件，设置节点的宽高
                    let uiTransform = node._components[0];
                    uiTransform.contentSize.width = 200; // 可自定义底框的宽度
                    uiTransform.contentSize.height = 100; // 可自定义底框的高度

                    // 创建 Label（用于显示 "loading" 文案）
                    var labNode = new cc.Node();
                    var label = labNode.addComponent(cc.Label);

                    // 设置 Label 的文本为 "loading"
                    label.string = 'loading...';

                    // 设置 Label 样式（可自定义样式）
                    label.fontSize = 30;
                    label.lineHeight = 40;
                    label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
                    label.verticalAlign = cc.Label.VerticalAlign.CENTER;

                    // 获取 Label 节点的 UITransform 组件，调整位置
                    let labUITransform = labNode._components[0];
                    labUITransform.contentSize.width = 300; // 宽度与底框一致
                    labUITransform.contentSize.height = 100; // 高度与底框一致

                    // 将 Label 节点添加到底框节点中
                    node.addChild(labNode);
                    labNode._layer = 33554432;

                    // 设置 Label 节点的位置，使其居中
                    labNode.setPosition(0, 0);

                    // 调整底框节点的位置（可选）
                    node.setPosition(0, 0);
                };

                window.jumpadfunc = () => {
                    const status = getStatus();
                    return status;
                };

                // ⚠️ 调用此函数表示用户实际跳过一次广告（由你控制什么时候调用）
                window.consumeJumpAd = () => {
                    if (skipsLeft > 0) {
                        skipsLeft--;
                        if (skipsLeft === 0) {
                            cooldownStart = Date.now();
                        }
                    }
                };
            })();

            canvas = document.getElementById('GameCanvas');
            $p = canvas.parentElement;
            bcr = $p.getBoundingClientRect();
            canvas.width = bcr.width;
            canvas.height = bcr.height;
            application = new Application();
            topLevelImport('cc')
                .then(function (engine) {
                    sendLoadProgress(0.2);
                    return application.init(engine);
                })
                .then(function () {
                    sendLoadProgress(1);
                    return application.start();
                })
                ['catch'](function (err) {
                    console.error(err);
                });
        },
    };
});
