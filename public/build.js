System.register("rgb/rgb-color", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
            exports_1("RgbColor", RgbColor);
        }
    };
});
System.register("rgba/rgba-color", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
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
            exports_2("RgbaColor", RgbaColor);
        }
    };
});
System.register("rgb/css-rgb", ["rgb/rgb-color"], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
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
            exports_3("CssRgb", CssRgb);
        }
    };
});
System.register("rgba/css-rgba", ["rgba/rgba-color"], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
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
            exports_4("CssRgba", CssRgba);
        }
    };
});
System.register("hex/css-hex", [], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
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
            exports_5("CssHex", CssHex);
        }
    };
});
System.register("image/gradient-image", [], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
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
                        imageData.data[i] = fn(i, width, height);
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
                        var relWidth = width / (colorsY.length - 1);
                        var relYPosition = Math.round(index / width / 4);
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
            exports_6("GradientImage", GradientImage);
        }
    };
});
System.register("index", ["rgb/rgb-color", "rgba/rgba-color", "rgb/css-rgb", "rgba/css-rgba", "hex/css-hex", "image/gradient-image"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (rgb_color_2_1) {
                exports_7({
                    "RgbColor": rgb_color_2_1["RgbColor"]
                });
            },
            function (rgba_color_2_1) {
                exports_7({
                    "RgbaColor": rgba_color_2_1["RgbaColor"]
                });
            },
            function (css_rgb_1_1) {
                exports_7({
                    "CssRgb": css_rgb_1_1["CssRgb"]
                });
            },
            function (css_rgba_1_1) {
                exports_7({
                    "CssRgba": css_rgba_1_1["CssRgba"]
                });
            },
            function (css_hex_1_1) {
                exports_7({
                    "CssHex": css_hex_1_1["CssHex"]
                });
            },
            function (gradient_image_1_1) {
                exports_7({
                    "GradientImage": gradient_image_1_1["GradientImage"]
                });
            }
        ],
        execute: function () {
        }
    };
});
