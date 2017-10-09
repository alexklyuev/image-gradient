import { ExampleCanvas } from './example-canvas';
import { ExampleInfo } from './example-info';
import { ExampleFade } from './example-fade';

export class ExampleRoot extends HTMLElement {
  private exampleCanvas: ExampleCanvas;
  private exampleInfo: ExampleInfo;
  private exampleFade: ExampleFade;

  private disconnectCallbacks: Array<() => void> = [];

  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    this.exampleCanvas = new ExampleCanvas();
    this.exampleInfo = new ExampleInfo();
    this.exampleFade = new ExampleFade();

    shadow.appendChild(this.exampleCanvas);
    shadow.appendChild(this.exampleInfo);
    shadow.appendChild(this.exampleFade);

    document.body.appendChild(this);

    Object.assign(this.style, {display: 'flex'});
  }
  
  connectedCallback() {
    const onPickColor = (event: CustomEvent) => {
      this.exampleInfo.setAttribute('color', event.detail.colorData);
    };
    const onPickFade = (event: CustomEvent) => {
      this.exampleCanvas.setAttribute('fade', event.detail.colorData);
    };
    this.exampleCanvas.addEventListener('pick', onPickColor);
    this.exampleFade.addEventListener('pick', onPickFade);
    this.disconnectCallbacks.push(
      () => {this.exampleCanvas.removeEventListener('pick', onPickColor)},
      () => {this.exampleFade.removeEventListener('pick', onPickFade)},
    );
  }
  
  disconnectedCallback() {
    this.disconnectCallbacks.forEach(fn => fn());
  }

}
