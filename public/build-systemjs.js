var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
System.register("draggable/draggable", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Draggable;
    return {
        setters: [],
        execute: function () {
            Draggable = /** @class */ (function () {
                function Draggable(el, container) {
                    if (container === void 0) { container = document.body; }
                    this.el = el;
                    this.container = container;
                    this.initCoords = [0, 0];
                    this.on = false;
                    this.attached = false;
                }
                Draggable.prototype.start = function (eventInterceptors) {
                    var _this = this;
                    if (eventInterceptors === void 0) { eventInterceptors = {}; }
                    Object.assign(this.el.style, {
                        position: 'absolute',
                    });
                    this.container.appendChild(this.el);
                    this.attached = true;
                    var elOnMove = function (event) {
                        if (eventInterceptors.mousemove instanceof Function) {
                            eventInterceptors.mousemove(event);
                        }
                        var clientX = event.clientX, clientY = event.clientY;
                        var _a = _this.initCoords, initX = _a[0], initY = _a[1];
                        var _b = _this.el.getBoundingClientRect(), top = _b.top, left = _b.left;
                        Object.assign(_this.el.style, {
                            left: left + clientX - initX + 'px',
                            top: top + clientY - initY + 'px',
                        });
                        _this.initCoords = [event.clientX, event.clientY];
                    };
                    var elOnDown = function (event) {
                        if (eventInterceptors.mousedown instanceof Function) {
                            eventInterceptors.mousedown(event);
                        }
                        _this.initCoords = [event.clientX, event.clientY];
                        _this.container.addEventListener('mousemove', elOnMove);
                        _this.container.addEventListener('mouseup', elOnUp);
                    };
                    var elOnUp = function (event) {
                        if (eventInterceptors.mouseup instanceof Function) {
                            eventInterceptors.mouseup(event);
                        }
                        _this.container.removeEventListener('mousemove', elOnMove);
                        _this.container.removeEventListener('mouseup', elOnUp);
                    };
                    this.el.addEventListener('mousedown', elOnDown);
                    this.onStop = function () { _this.el.removeEventListener('mousedown', elOnDown); };
                    this.on = true;
                };
                Draggable.prototype.stop = function () {
                    this.onStop();
                    this.on = false;
                };
                Draggable.prototype.detach = function () {
                    this.stop();
                    this.container.removeChild(this.el);
                    this.attached = false;
                    return this.el;
                };
                Draggable.prototype.isOn = function () {
                    return this.on;
                };
                Draggable.prototype.isAttached = function () {
                    return this.attached;
                };
                return Draggable;
            }());
            exports_1("Draggable", Draggable);
        }
    };
});
System.register("rgb/rgb-color", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var RgbColor;
    return {
        setters: [],
        execute: function () {
            RgbColor = /** @class */ (function () {
                function RgbColor(color) {
                    if (typeof color === 'string') {
                        this.color = color;
                    }
                    else if (Array.isArray(color)) {
                        this.color = RgbColor.rgbToHex(color);
                    }
                }
                /**
                 * [255, 255, 255] -> 'ffffff'
                 */
                RgbColor.rgbToHex = function (rgb) {
                    return rgb
                        .map(function (i) { return i.toString(16); })
                        .map(function (s) { return '0' + s; })
                        .map(function (s) { return s.slice(-2); })
                        .join('');
                };
                /**
                 * 'ffffff' -> [255, 255, 255]
                 */
                RgbColor.hexToRgb = function (hex) {
                    return hex
                        .match(/\w{2}/g)
                        .map(function (s) { return parseInt(s, 16); });
                };
                /**
                 * get color as primitive value
                 */
                RgbColor.prototype.toHexString = function () {
                    return this.color;
                };
                /**
                 * compares color to another color
                 */
                RgbColor.prototype.equalsTo = function (color) {
                    return this.toHexString() === color.toHexString();
                };
                return RgbColor;
            }());
            exports_2("RgbColor", RgbColor);
        }
    };
});
System.register("rgba/rgba-color", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var RgbaColor;
    return {
        setters: [],
        execute: function () {
            RgbaColor = /** @class */ (function () {
                function RgbaColor(color) {
                    this.color = color;
                }
                RgbaColor.prototype.toString = function () {
                    return this.color.join(', ');
                };
                RgbaColor.prototype.toUintArray = function () {
                    return this.color
                        .map(function (i) { return Math.abs(i); })
                        .map(function (i) { return i | 0; });
                };
                return RgbaColor;
            }());
            exports_3("RgbaColor", RgbaColor);
        }
    };
});
System.register("rgb/css-rgb", ["rgb/rgb-color"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var rgb_color_1, CssRgb;
    return {
        setters: [
            function (rgb_color_1_1) {
                rgb_color_1 = rgb_color_1_1;
            }
        ],
        execute: function () {
            CssRgb = /** @class */ (function () {
                function CssRgb(rgbColor) {
                    this.rgbColor = rgbColor;
                }
                CssRgb.prototype.toString = function () {
                    return "rgb(" + rgb_color_1.RgbColor.hexToRgb(this.rgbColor.toHexString()).join(', ') + ")";
                };
                return CssRgb;
            }());
            exports_4("CssRgb", CssRgb);
        }
    };
});
System.register("rgba/css-rgba", ["rgba/rgba-color"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var rgba_color_1, CssRgba;
    return {
        setters: [
            function (rgba_color_1_1) {
                rgba_color_1 = rgba_color_1_1;
            }
        ],
        execute: function () {
            CssRgba = /** @class */ (function () {
                function CssRgba(color) {
                    if (color instanceof rgba_color_1.RgbaColor) {
                        this.color = color;
                    }
                    else {
                        this.color = new rgba_color_1.RgbaColor(color);
                    }
                }
                CssRgba.prototype.toString = function () {
                    var _a = this.color.toUintArray(), r = _a[0], g = _a[1], b = _a[2], a = _a[3];
                    return "rgba(" + r + ", " + g + ", " + b + ", " + Math.round(a / 25.5) / 10 + ")";
                };
                CssRgba.prototype.toUintArray = function () {
                    return this.color.toUintArray();
                };
                return CssRgba;
            }());
            exports_5("CssRgba", CssRgba);
        }
    };
});
System.register("hex/css-hex", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var CssHex;
    return {
        setters: [],
        execute: function () {
            CssHex = /** @class */ (function () {
                function CssHex(rgbColor) {
                    this.rgbColor = rgbColor;
                }
                CssHex.prototype.toString = function () {
                    return "#" + this.rgbColor.toHexString();
                };
                return CssHex;
            }());
            exports_6("CssHex", CssHex);
        }
    };
});
System.register("gradient-image/base-gradient-image", [], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var BaseGradientImage;
    return {
        setters: [],
        execute: function () {
            BaseGradientImage = /** @class */ (function () {
                function BaseGradientImage(ctx) {
                    this.ctx = ctx;
                }
                BaseGradientImage.prototype.draw = function (colorsX, colorsY) {
                    this.colorsX = colorsX;
                    this.colorsY = colorsY;
                    var _a = this.getWidthHeight(), width = _a[0], height = _a[1];
                    var imageData = this.ctx.createImageData(width, height);
                    for (var i = 0; i < width * height * 4; i++) {
                        imageData.data[i] = this.drawPixelSlotFn(this.colorsX, this.colorsY)(i);
                    }
                    this.ctx.putImageData(imageData, 0, 0);
                };
                BaseGradientImage.prototype.getColorByCoords = function (x, y) {
                    var _a = this.getWidthHeight(), width = _a[0], height = _a[1];
                    var firstIndex = (y * width + x) * 4;
                    var color = [];
                    for (var i = firstIndex; i < firstIndex + 4; i++) {
                        var slotValue = this.drawPixelSlotFn(this.colorsX, this.colorsY)(i);
                        var slotValueRounded = Math.round(slotValue);
                        color.push(slotValueRounded);
                    }
                    return color;
                };
                BaseGradientImage.prototype.getWidthHeight = function () {
                    var _a = this.ctx.canvas, width = _a.width, height = _a.height;
                    return [width, height];
                };
                return BaseGradientImage;
            }());
            exports_7("BaseGradientImage", BaseGradientImage);
        }
    };
});
System.register("gradient-image/multi-vertical-gradient-image", ["gradient-image/base-gradient-image"], function (exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var base_gradient_image_1, MultiVerticalGradientImage;
    return {
        setters: [
            function (base_gradient_image_1_1) {
                base_gradient_image_1 = base_gradient_image_1_1;
            }
        ],
        execute: function () {
            MultiVerticalGradientImage = /** @class */ (function (_super) {
                __extends(MultiVerticalGradientImage, _super);
                function MultiVerticalGradientImage() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MultiVerticalGradientImage.prototype.drawPixelSlotFn = function (colorsX, colorsY) {
                    var _a = this.getWidthHeight(), width = _a[0], height = _a[1];
                    return function (index) {
                        var slotIndex = index % 4;
                        var xPosition = (index % (width * 4)) / 4;
                        var yPosition = Math.round(index / width / 4);
                        var verticalRange = height / (colorsY.length - 1);
                        var verticalSlot = Math.floor(yPosition / verticalRange);
                        var relHeight = height / (colorsY.length - 1);
                        var relYPosition = yPosition % relHeight;
                        var valA = colorsY[verticalSlot][slotIndex];
                        var valB = (colorsY[verticalSlot + 1] || colorsY[verticalSlot])[slotIndex];
                        var valT = valA * (relHeight - relYPosition) / relHeight;
                        var valM = valB * relYPosition / relHeight;
                        var valV = valT + valM;
                        if (Array.isArray(colorsX) && colorsX.length > 0) {
                            var valC = colorsX[0][slotIndex];
                            var val = ((valV * (width - xPosition)) / width) + ((valC * (xPosition) / width));
                            return val;
                        }
                        else {
                            return valV;
                        }
                    };
                };
                return MultiVerticalGradientImage;
            }(base_gradient_image_1.BaseGradientImage));
            exports_8("MultiVerticalGradientImage", MultiVerticalGradientImage);
        }
    };
});
System.register("gradient-image/multi-horizontal-gradient-image", ["gradient-image/base-gradient-image"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var base_gradient_image_2, MultiHorizontalGradientImage;
    return {
        setters: [
            function (base_gradient_image_2_1) {
                base_gradient_image_2 = base_gradient_image_2_1;
            }
        ],
        execute: function () {
            MultiHorizontalGradientImage = /** @class */ (function (_super) {
                __extends(MultiHorizontalGradientImage, _super);
                function MultiHorizontalGradientImage() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                MultiHorizontalGradientImage.prototype.drawPixelSlotFn = function (colorsX, colorsY) {
                    var _a = this.getWidthHeight(), width = _a[0], height = _a[1];
                    return function (index) {
                        var slotIndex = index % 4;
                        var xPosition = (index % (width * 4)) / 4;
                        var yPosition = Math.round(index / width / 4);
                        var horizontalRange = width / (colorsX.length - 1);
                        var horizontalSlot = Math.floor(xPosition / horizontalRange);
                        var relWidth = width / (colorsX.length - 1);
                        var relXPosition = (index % (relWidth * 4)) / 4;
                        var valA = colorsX[horizontalSlot][slotIndex];
                        var valB = colorsX[horizontalSlot + 1][slotIndex];
                        var valL = valA * (relWidth - relXPosition) / relWidth;
                        var valR = valB * relXPosition / relWidth;
                        var valH = valL + valR;
                        if (Array.isArray(colorsY) && colorsY.length > 0) {
                            var valC = colorsY[0][slotIndex];
                            var val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
                            return val;
                        }
                        else {
                            return valH;
                        }
                    };
                };
                return MultiHorizontalGradientImage;
            }(base_gradient_image_2.BaseGradientImage));
            exports_9("MultiHorizontalGradientImage", MultiHorizontalGradientImage);
        }
    };
});
System.register("gradient-image/index", ["gradient-image/multi-vertical-gradient-image", "gradient-image/multi-horizontal-gradient-image"], function (exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (multi_vertical_gradient_image_1_1) {
                exports_10({
                    "MultiVerticalGradientImage": multi_vertical_gradient_image_1_1["MultiVerticalGradientImage"]
                });
            },
            function (multi_horizontal_gradient_image_1_1) {
                exports_10({
                    "MultiHorizontalGradientImage": multi_horizontal_gradient_image_1_1["MultiHorizontalGradientImage"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("color-picker", ["draggable/draggable", "rgb/rgb-color", "rgba/rgba-color", "rgb/css-rgb", "rgba/css-rgba", "hex/css-hex", "gradient-image/index"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    return {
        setters: [
            function (draggable_1_1) {
                exports_11({
                    "Draggable": draggable_1_1["Draggable"]
                });
            },
            function (rgb_color_2_1) {
                exports_11({
                    "RgbColor": rgb_color_2_1["RgbColor"]
                });
            },
            function (rgba_color_2_1) {
                exports_11({
                    "RgbaColor": rgba_color_2_1["RgbaColor"]
                });
            },
            function (css_rgb_1_1) {
                exports_11({
                    "CssRgb": css_rgb_1_1["CssRgb"]
                });
            },
            function (css_rgba_1_1) {
                exports_11({
                    "CssRgba": css_rgba_1_1["CssRgba"]
                });
            },
            function (css_hex_1_1) {
                exports_11({
                    "CssHex": css_hex_1_1["CssHex"]
                });
            },
            function (index_1_1) {
                exports_11({
                    "MultiHorizontalGradientImage": index_1_1["MultiHorizontalGradientImage"],
                    "MultiVerticalGradientImage": index_1_1["MultiVerticalGradientImage"]
                });
            }
        ],
        execute: function () {
        }
    };
});
System.register("image/gradient-image", [], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var GradientImage;
    return {
        setters: [],
        execute: function () {
            GradientImage = /** @class */ (function () {
                function GradientImage(ctx) {
                    this.ctx = ctx;
                }
                GradientImage.prototype.draw = function (fn) {
                    this.drawFn = fn;
                    var _a = this.ctx.canvas, width = _a.width, height = _a.height;
                    var imageData = this.ctx.createImageData(width, height);
                    for (var i = 0; i < width * height * 4; i++) {
                        imageData.data[i] = this.drawFn(i, width, height);
                    }
                    this.ctx.putImageData(imageData, 0, 0);
                };
                GradientImage.solidColorFn = function (color) {
                    return function (index, width, height) {
                        var mod = index % 4;
                        return color[mod];
                    };
                };
                GradientImage.horizontalGradientFn = function (colorA, colorB, round) {
                    if (round === void 0) { round = 1; }
                    return function (index, width, height) {
                        var slotIndex = index % 4;
                        var valA = colorA[slotIndex];
                        var valB = colorB[slotIndex];
                        var xPosition = (index % (width * 4)) / 4;
                        var val = ((valA * (width - xPosition)) / width) + ((valB * (xPosition) / width));
                        return Math.ceil(val / round) * round;
                    };
                };
                GradientImage.verticalGradientFn = function (colorA, colorB, round) {
                    if (round === void 0) { round = 1; }
                    return function (index, width, height) {
                        var slotIndex = index % 4;
                        var valA = colorA[slotIndex];
                        var valB = colorB[slotIndex];
                        var yPosition = Math.ceil(index / width / 4);
                        var val = (valA * (height - yPosition)) / height + (valB * (yPosition) / height);
                        return Math.ceil(val / round) * round;
                    };
                };
                GradientImage.gradientTwoDimsFn = function (colorA, colorB, colorC, round) {
                    if (round === void 0) { round = 1; }
                    return function (index, width, height) {
                        var slotIndex = index % 4;
                        var valA = colorA[slotIndex];
                        var valB = colorB[slotIndex];
                        var valC = colorC[slotIndex];
                        var yPosition = Math.ceil(index / width / 4);
                        var xPosition = (index % (width * 4)) / 4;
                        var valHExact = ((valA * (width - xPosition)) / width) + ((valB * (xPosition) / width));
                        var valH = Math.round(valHExact / round) * round;
                        var val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
                        return Math.round(val / round) * round;
                    };
                };
                GradientImage.multiHorizontalFn = function (colorsX, colorY) {
                    return function (index, width, height) {
                        var slotIndex = index % 4;
                        var xPosition = (index % (width * 4)) / 4;
                        var yPosition = Math.round(index / width / 4);
                        var horizontalRange = width / (colorsX.length - 1);
                        var horizontalSlot = Math.floor(xPosition / horizontalRange);
                        var relWidth = width / (colorsX.length - 1);
                        var relXPosition = (index % (relWidth * 4)) / 4;
                        var valA = colorsX[horizontalSlot][slotIndex];
                        var valB = colorsX[horizontalSlot + 1][slotIndex];
                        var valL = valA * (relWidth - relXPosition) / relWidth;
                        var valR = valB * relXPosition / relWidth;
                        var valH = valL + valR;
                        if (colorY) {
                            var valC = colorY[slotIndex];
                            var val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
                            return val;
                        }
                        else {
                            return valH;
                        }
                    };
                };
                GradientImage.multiVerticalFn = function (colorsY, colorX) {
                    return function (index, width, height) {
                        var slotIndex = index % 4;
                        var xPosition = (index % (width * 4)) / 4;
                        var yPosition = Math.round(index / width / 4);
                        var verticalRange = height / (colorsY.length - 1);
                        var verticalSlot = Math.floor(yPosition / verticalRange);
                        var relHeight = height / (colorsY.length - 1);
                        var relYPosition = yPosition % relHeight;
                        var valA = colorsY[verticalSlot][slotIndex];
                        var valB = (colorsY[verticalSlot + 1] || colorsY[verticalSlot])[slotIndex];
                        var valT = valA * (relHeight - relYPosition) / relHeight;
                        var valM = valB * relYPosition / relHeight;
                        var valV = valT + valM;
                        if (colorX) {
                            var valC = colorX[slotIndex];
                            var val = ((valV * (width - xPosition)) / width) + ((valC * (xPosition) / width));
                            return val;
                        }
                        else {
                            return valV;
                        }
                    };
                };
                return GradientImage;
            }());
            exports_12("GradientImage", GradientImage);
        }
    };
});
