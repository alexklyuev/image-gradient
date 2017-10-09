System.register("draggable/draggable", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Draggable;
    return {
        setters: [],
        execute: function () {
            Draggable = class Draggable {
                constructor(el, container = document.body) {
                    this.el = el;
                    this.container = container;
                    this.initCoords = [0, 0];
                    this.on = false;
                    this.attached = false;
                }
                start(eventInterceptors = {}) {
                    Object.assign(this.el.style, {
                        position: 'absolute',
                    });
                    this.container.appendChild(this.el);
                    this.attached = true;
                    const elOnMove = (event) => {
                        if (eventInterceptors.mousemove instanceof Function) {
                            eventInterceptors.mousemove(event);
                        }
                        const { clientX, clientY } = event;
                        const [initX, initY] = this.initCoords;
                        const { top, left } = this.el.getBoundingClientRect();
                        Object.assign(this.el.style, {
                            left: left + clientX - initX + 'px',
                            top: top + clientY - initY + 'px',
                        });
                        this.initCoords = [event.clientX, event.clientY];
                    };
                    const elOnDown = (event) => {
                        if (eventInterceptors.mousedown instanceof Function) {
                            eventInterceptors.mousedown(event);
                        }
                        this.initCoords = [event.clientX, event.clientY];
                        this.container.addEventListener('mousemove', elOnMove);
                        this.container.addEventListener('mouseup', elOnUp);
                    };
                    const elOnUp = (event) => {
                        if (eventInterceptors.mouseup instanceof Function) {
                            eventInterceptors.mouseup(event);
                        }
                        this.container.removeEventListener('mousemove', elOnMove);
                        this.container.removeEventListener('mouseup', elOnUp);
                    };
                    this.el.addEventListener('mousedown', elOnDown);
                    this.onStop = () => { this.el.removeEventListener('mousedown', elOnDown); };
                    this.on = true;
                }
                stop() {
                    this.onStop();
                    this.on = false;
                }
                detach() {
                    this.stop();
                    this.container.removeChild(this.el);
                    this.attached = false;
                    return this.el;
                }
                isOn() {
                    return this.on;
                }
                isAttached() {
                    return this.attached;
                }
            };
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
            RgbColor = class RgbColor {
                /**
                 * [255, 255, 255] -> 'ffffff'
                 */
                static rgbToHex(rgb) {
                    return rgb
                        .map(i => i.toString(16))
                        .map(s => '0' + s)
                        .map(s => s.slice(-2))
                        .join('');
                }
                /**
                 * 'ffffff' -> [255, 255, 255]
                 */
                static hexToRgb(hex) {
                    return hex
                        .match(/\w{2}/g)
                        .map(s => parseInt(s, 16));
                }
                constructor(color) {
                    if (typeof color === 'string') {
                        this.color = color;
                    }
                    else if (Array.isArray(color)) {
                        this.color = RgbColor.rgbToHex(color);
                    }
                }
                /**
                 * get color as primitive value
                 */
                toHexString() {
                    return this.color;
                }
                /**
                 * compares color to another color
                 */
                equalsTo(color) {
                    return this.toHexString() === color.toHexString();
                }
            };
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
            RgbaColor = class RgbaColor {
                constructor(color) {
                    this.color = color;
                }
                toString() {
                    return this.color.join(', ');
                }
                toUintArray() {
                    return this.color
                        .map(i => Math.abs(i))
                        .map(i => i | 0);
                }
            };
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
            CssRgb = class CssRgb {
                constructor(rgbColor) {
                    this.rgbColor = rgbColor;
                }
                toString() {
                    return `rgb(${rgb_color_1.RgbColor.hexToRgb(this.rgbColor.toHexString()).join(', ')})`;
                }
            };
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
            CssRgba = class CssRgba {
                constructor(color) {
                    if (color instanceof rgba_color_1.RgbaColor) {
                        this.color = color;
                    }
                    else {
                        this.color = new rgba_color_1.RgbaColor(color);
                    }
                }
                toString() {
                    const [r, g, b, a] = this.color.toUintArray();
                    return `rgba(${r}, ${g}, ${b}, ${Math.round(a / 25.5) / 10})`;
                }
                toUintArray() {
                    return this.color.toUintArray();
                }
            };
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
            CssHex = class CssHex {
                constructor(rgbColor) {
                    this.rgbColor = rgbColor;
                }
                toString() {
                    return `#${this.rgbColor.toHexString()}`;
                }
            };
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
            BaseGradientImage = class BaseGradientImage {
                constructor(ctx) {
                    this.ctx = ctx;
                    const [width, height] = this.getWidthHeight();
                    this.imageData = this.ctx.createImageData(width, height);
                }
                draw(colorsX, colorsY) {
                    this.colorsX = colorsX;
                    this.colorsY = colorsY;
                    const [width, height] = this.getWidthHeight();
                    for (let i = 0; i < width * height * 4; i++) {
                        this.imageData.data[i] = this.drawPixelSlotFn(this.colorsX, this.colorsY)(i);
                    }
                    this.ctx.putImageData(this.imageData, 0, 0);
                }
                getColorByCoords(x, y) {
                    const [width, height] = this.getWidthHeight();
                    const firstIndex = (y * width + x) * 4;
                    const color = [];
                    for (let i = firstIndex; i < firstIndex + 4; i++) {
                        const slotValue = this.drawPixelSlotFn(this.colorsX, this.colorsY)(i);
                        const slotValueRounded = Math.round(slotValue);
                        color.push(slotValueRounded);
                    }
                    return color;
                }
                getWidthHeight() {
                    const { width, height } = this.ctx.canvas;
                    return [width, height];
                }
            };
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
            MultiVerticalGradientImage = class MultiVerticalGradientImage extends base_gradient_image_1.BaseGradientImage {
                drawPixelSlotFn(colorsX, colorsY) {
                    const [width, height] = this.getWidthHeight();
                    return (index) => {
                        const slotIndex = index % 4;
                        const xPosition = (index % (width * 4)) / 4;
                        const yPosition = Math.round(index / width / 4);
                        const verticalRange = height / (colorsY.length - 1);
                        const verticalSlot = Math.floor(yPosition / verticalRange);
                        const relHeight = height / (colorsY.length - 1);
                        const relYPosition = yPosition % relHeight;
                        const valA = colorsY[verticalSlot][slotIndex];
                        const valB = (colorsY[verticalSlot + 1] || colorsY[verticalSlot])[slotIndex];
                        const valT = valA * (relHeight - relYPosition) / relHeight;
                        const valM = valB * relYPosition / relHeight;
                        const valV = valT + valM;
                        if (Array.isArray(colorsX) && colorsX.length > 0) {
                            const valC = colorsX[0][slotIndex];
                            const val = ((valV * (width - xPosition)) / width) + ((valC * (xPosition) / width));
                            return val;
                        }
                        else {
                            return valV;
                        }
                    };
                }
            };
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
            MultiHorizontalGradientImage = class MultiHorizontalGradientImage extends base_gradient_image_2.BaseGradientImage {
                drawPixelSlotFn(colorsX, colorsY) {
                    const [width, height] = this.getWidthHeight();
                    return (index) => {
                        const slotIndex = index % 4;
                        const xPosition = (index % (width * 4)) / 4;
                        const yPosition = Math.round(index / width / 4);
                        const horizontalRange = width / (colorsX.length - 1);
                        const horizontalSlot = Math.floor(xPosition / horizontalRange);
                        const relWidth = width / (colorsX.length - 1);
                        const relXPosition = (index % (relWidth * 4)) / 4;
                        const valA = colorsX[horizontalSlot][slotIndex];
                        const valB = colorsX[horizontalSlot + 1][slotIndex];
                        const valL = valA * (relWidth - relXPosition) / relWidth;
                        const valR = valB * relXPosition / relWidth;
                        const valH = valL + valR;
                        if (Array.isArray(colorsY) && colorsY.length > 0) {
                            const valC = colorsY[0][slotIndex];
                            const val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
                            return val;
                        }
                        else {
                            return valH;
                        }
                    };
                }
            };
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
System.register("example-app/components/example-canvas", ["color-picker"], function (exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var color_picker_1, ExampleCanvas;
    return {
        setters: [
            function (color_picker_1_1) {
                color_picker_1 = color_picker_1_1;
            }
        ],
        execute: function () {
            ExampleCanvas = class ExampleCanvas extends HTMLElement {
                constructor() {
                    super();
                    this.rainbow = [
                        [255, 0, 0, 255],
                        [255, 127, 0, 255],
                        [255, 255, 0, 255],
                        [0, 255, 0, 255],
                        [0, 255, 255, 255],
                        [0, 0, 255, 255],
                        [255, 0, 255, 255],
                    ];
                    const shadow = this.attachShadow({ mode: 'open' });
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    shadow.appendChild(canvas);
                    let removePickListener = this.drawOnDocument(ctx);
                    window.addEventListener('resize', (event) => {
                        removePickListener();
                        removePickListener = this.drawOnDocument(ctx);
                    });
                }
                static get observedAttributes() {
                    return ['fade'];
                }
                attributeChangedCallback(attr, oldVal, newVal) {
                    switch (attr) {
                        case 'fade':
                            this.onChangeFade(newVal);
                            return;
                    }
                }
                drawOnDocument(ctx) {
                    ctx.canvas.setAttribute('width', window.innerWidth.toString());
                    ctx.canvas.setAttribute('height', window.innerHeight.toString());
                    this.gradientImage = new color_picker_1.MultiHorizontalGradientImage(ctx);
                    this.gradientImage.draw(this.rainbow, [[255, 255, 255, 255]]);
                    const onPick = (event) => {
                        const { clientX, clientY } = event;
                        const colorData = this.gradientImage.getColorByCoords(clientX, clientY);
                        const color = new color_picker_1.CssRgba(colorData);
                        this.dispatchEvent(new CustomEvent('pick', {
                            detail: { colorData },
                            bubbles: true,
                        }));
                    };
                    ctx.canvas.addEventListener('click', onPick);
                    return () => { ctx.canvas.removeEventListener('click', onPick); };
                }
                onChangeFade(colorStr) {
                    const colorData = colorStr.split(',').map(slot => parseInt(slot));
                    this.gradientImage.draw(this.rainbow, [colorData]);
                }
            };
            exports_12("ExampleCanvas", ExampleCanvas);
        }
    };
});
System.register("example-app/components/example-info", ["color-picker"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var color_picker_2, ExampleInfo;
    return {
        setters: [
            function (color_picker_2_1) {
                color_picker_2 = color_picker_2_1;
            }
        ],
        execute: function () {
            ExampleInfo = class ExampleInfo extends HTMLElement {
                static get observedAttributes() {
                    return ['color'];
                }
                constructor() {
                    super();
                    const shadow = this.attachShadow({ mode: 'open' });
                    const el = document.createElement('div');
                    Object.assign(el.style, {
                        width: '150px',
                        height: '55px',
                        position: 'absolute',
                        left: '20px',
                        top: '20px',
                        backgroundColor: 'white',
                        cursor: 'move',
                        boxShadow: 'rgb(100, 100, 100) 1px 1px 4px',
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        textAlign: 'center',
                        color: 'black',
                    });
                    el.innerHTML = `
      ${new color_picker_2.CssRgba([255, 255, 255, 255])}<br />
      this thing is draggable<br />
      and<br />
      shows picked color
    `;
                    const dragEl = new color_picker_2.Draggable(el, document.body);
                    dragEl.start();
                    this.el = el;
                    Object.assign(this.style, { display: 'flex' });
                }
                attributeChangedCallback(attr, oldValue, newValue) {
                    switch (attr) {
                        case 'color':
                            this.onChangeColor(newValue);
                            return;
                    }
                }
                onChangeColor(color) {
                    const colorData = color.split(',').map(slot => parseInt(slot));
                    const cssRgba = new color_picker_2.CssRgba(colorData);
                    this.el.style.backgroundColor = cssRgba.toString();
                    this.el.innerText = cssRgba.toString();
                    this.el.style.color = colorData.slice(0, -1).reduce((acc, slot) => acc + slot, 0) > 255 * 3 / 2 ? 'black' : 'white';
                }
            };
            exports_13("ExampleInfo", ExampleInfo);
        }
    };
});
System.register("example-app/components/example-fade", ["color-picker"], function (exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var color_picker_3, ExampleFade;
    return {
        setters: [
            function (color_picker_3_1) {
                color_picker_3 = color_picker_3_1;
            }
        ],
        execute: function () {
            ExampleFade = class ExampleFade extends HTMLElement {
                constructor() {
                    super();
                    this.disconectFns = [];
                    const shadow = this.attachShadow({ mode: 'open' });
                    this.list = document.createElement('ul');
                    this.white = document.createElement('li');
                    this.black = document.createElement('li');
                    this.list.appendChild(this.white);
                    this.list.appendChild(this.black);
                    const listStyle = {
                        listStyleType: 'none',
                        margin: '0',
                        padding: '20px 5px 5px 5px',
                        backgroundColor: 'rgb(255, 240, 210)',
                        cursor: 'move',
                        display: 'flex',
                        position: 'absolute',
                        left: '100px',
                        top: '100px',
                        boxShadow: 'rgb(100, 100, 100) 1px 1px 4px',
                    };
                    const commonItemStyle = {
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                        border: '1px solid #777',
                    };
                    Object.assign(this.list.style, listStyle);
                    Object.assign(this.white.style, commonItemStyle, {
                        backgroundColor: 'white',
                        borderRight: 'none',
                    });
                    Object.assign(this.black.style, commonItemStyle, {
                        backgroundColor: 'black',
                        borderLeft: 'none',
                    });
                    const dragEl = new color_picker_3.Draggable(this.list, document.body);
                    dragEl.start();
                }
                connectedCallback() {
                    const onPickWhite = (event) => {
                        this.dispatchEvent(new CustomEvent('pick', { detail: { colorData: [255, 255, 255, 255] } }));
                    };
                    const onPickBlack = (event) => {
                        this.dispatchEvent(new CustomEvent('pick', { detail: { colorData: [0, 0, 0, 255] } }));
                    };
                    this.white.addEventListener('click', onPickWhite);
                    this.black.addEventListener('click', onPickBlack);
                    this.disconectFns.push(() => { this.white.removeEventListener('click', onPickWhite); }, () => { this.black.removeEventListener('click', onPickBlack); });
                }
                disconnectedCallback() {
                    this.disconectFns.forEach(fn => fn());
                }
            };
            exports_14("ExampleFade", ExampleFade);
        }
    };
});
System.register("example-app/components/example-root", ["example-app/components/example-canvas", "example-app/components/example-info", "example-app/components/example-fade"], function (exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var example_canvas_1, example_info_1, example_fade_1, ExampleRoot;
    return {
        setters: [
            function (example_canvas_1_1) {
                example_canvas_1 = example_canvas_1_1;
            },
            function (example_info_1_1) {
                example_info_1 = example_info_1_1;
            },
            function (example_fade_1_1) {
                example_fade_1 = example_fade_1_1;
            }
        ],
        execute: function () {
            ExampleRoot = class ExampleRoot extends HTMLElement {
                constructor() {
                    super();
                    this.disconnectCallbacks = [];
                    const shadow = this.attachShadow({ mode: 'open' });
                    this.exampleCanvas = new example_canvas_1.ExampleCanvas();
                    this.exampleInfo = new example_info_1.ExampleInfo();
                    this.exampleFade = new example_fade_1.ExampleFade();
                    shadow.appendChild(this.exampleCanvas);
                    shadow.appendChild(this.exampleInfo);
                    shadow.appendChild(this.exampleFade);
                    document.body.appendChild(this);
                    Object.assign(this.style, { display: 'flex' });
                }
                connectedCallback() {
                    const onPickColor = (event) => {
                        this.exampleInfo.setAttribute('color', event.detail.colorData);
                    };
                    const onPickFade = (event) => {
                        this.exampleCanvas.setAttribute('fade', event.detail.colorData);
                    };
                    this.exampleCanvas.addEventListener('pick', onPickColor);
                    this.exampleFade.addEventListener('pick', onPickFade);
                    this.disconnectCallbacks.push(() => { this.exampleCanvas.removeEventListener('pick', onPickColor); }, () => { this.exampleFade.removeEventListener('pick', onPickFade); });
                }
                disconnectedCallback() {
                    this.disconnectCallbacks.forEach(fn => fn());
                }
            };
            exports_15("ExampleRoot", ExampleRoot);
        }
    };
});
System.register("example-app/index", ["example-app/components/example-root", "example-app/components/example-canvas", "example-app/components/example-info", "example-app/components/example-fade"], function (exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var example_root_1, example_canvas_2, example_info_2, example_fade_2, ExampleApp;
    return {
        setters: [
            function (example_root_1_1) {
                example_root_1 = example_root_1_1;
            },
            function (example_canvas_2_1) {
                example_canvas_2 = example_canvas_2_1;
            },
            function (example_info_2_1) {
                example_info_2 = example_info_2_1;
            },
            function (example_fade_2_1) {
                example_fade_2 = example_fade_2_1;
            }
        ],
        execute: function () {
            ExampleApp = class ExampleApp {
                constructor() {
                    customElements.define('example-root', example_root_1.ExampleRoot);
                    customElements.define('example-canvas', example_canvas_2.ExampleCanvas);
                    customElements.define('example-info', example_info_2.ExampleInfo);
                    customElements.define('example-fade', example_fade_2.ExampleFade);
                }
                run() {
                    const root = new example_root_1.ExampleRoot();
                }
            };
            exports_16("ExampleApp", ExampleApp);
        }
    };
});
System.register("image/gradient-image", [], function (exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var GradientImage;
    return {
        setters: [],
        execute: function () {
            /**
             * @deprecated use BaseGradientImage descendants
             */
            GradientImage = class GradientImage {
                constructor(ctx) {
                    this.ctx = ctx;
                }
                draw(fn) {
                    this.drawFn = fn;
                    const { width, height } = this.ctx.canvas;
                    const imageData = this.ctx.createImageData(width, height);
                    for (let i = 0; i < width * height * 4; i++) {
                        imageData.data[i] = this.drawFn(i, width, height);
                    }
                    this.ctx.putImageData(imageData, 0, 0);
                }
            };
            GradientImage.solidColorFn = (color) => {
                return (index, width, height) => {
                    const mod = index % 4;
                    return color[mod];
                };
            };
            GradientImage.horizontalGradientFn = (colorA, colorB, round = 1) => {
                return (index, width, height) => {
                    const slotIndex = index % 4;
                    const valA = colorA[slotIndex];
                    const valB = colorB[slotIndex];
                    const xPosition = (index % (width * 4)) / 4;
                    const val = ((valA * (width - xPosition)) / width) + ((valB * (xPosition) / width));
                    return Math.ceil(val / round) * round;
                };
            };
            GradientImage.verticalGradientFn = (colorA, colorB, round = 1) => {
                return (index, width, height) => {
                    const slotIndex = index % 4;
                    const valA = colorA[slotIndex];
                    const valB = colorB[slotIndex];
                    const yPosition = Math.ceil(index / width / 4);
                    const val = (valA * (height - yPosition)) / height + (valB * (yPosition) / height);
                    return Math.ceil(val / round) * round;
                };
            };
            GradientImage.gradientTwoDimsFn = (colorA, colorB, colorC, round = 1) => {
                return (index, width, height) => {
                    const slotIndex = index % 4;
                    const valA = colorA[slotIndex];
                    const valB = colorB[slotIndex];
                    const valC = colorC[slotIndex];
                    const yPosition = Math.ceil(index / width / 4);
                    const xPosition = (index % (width * 4)) / 4;
                    const valHExact = ((valA * (width - xPosition)) / width) + ((valB * (xPosition) / width));
                    const valH = Math.round(valHExact / round) * round;
                    const val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
                    return Math.round(val / round) * round;
                };
            };
            GradientImage.multiHorizontalFn = (colorsX, colorY) => {
                return (index, width, height) => {
                    const slotIndex = index % 4;
                    const xPosition = (index % (width * 4)) / 4;
                    const yPosition = Math.round(index / width / 4);
                    const horizontalRange = width / (colorsX.length - 1);
                    const horizontalSlot = Math.floor(xPosition / horizontalRange);
                    const relWidth = width / (colorsX.length - 1);
                    const relXPosition = (index % (relWidth * 4)) / 4;
                    const valA = colorsX[horizontalSlot][slotIndex];
                    const valB = colorsX[horizontalSlot + 1][slotIndex];
                    const valL = valA * (relWidth - relXPosition) / relWidth;
                    const valR = valB * relXPosition / relWidth;
                    const valH = valL + valR;
                    if (colorY) {
                        const valC = colorY[slotIndex];
                        const val = ((valH * (height - yPosition)) / height) + ((valC * (yPosition) / height));
                        return val;
                    }
                    else {
                        return valH;
                    }
                };
            };
            GradientImage.multiVerticalFn = (colorsY, colorX) => {
                return (index, width, height) => {
                    const slotIndex = index % 4;
                    const xPosition = (index % (width * 4)) / 4;
                    const yPosition = Math.round(index / width / 4);
                    const verticalRange = height / (colorsY.length - 1);
                    const verticalSlot = Math.floor(yPosition / verticalRange);
                    const relHeight = height / (colorsY.length - 1);
                    const relYPosition = yPosition % relHeight;
                    const valA = colorsY[verticalSlot][slotIndex];
                    const valB = (colorsY[verticalSlot + 1] || colorsY[verticalSlot])[slotIndex];
                    const valT = valA * (relHeight - relYPosition) / relHeight;
                    const valM = valB * relYPosition / relHeight;
                    const valV = valT + valM;
                    if (colorX) {
                        const valC = colorX[slotIndex];
                        const val = ((valV * (width - xPosition)) / width) + ((valC * (xPosition) / width));
                        return val;
                    }
                    else {
                        return valV;
                    }
                };
            };
            exports_17("GradientImage", GradientImage);
        }
    };
});
