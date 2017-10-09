import { CssRgba, Draggable } from '../../index';

export class ExampleInfo extends HTMLElement {

  static get observedAttributes() {
    return ['color'];
  }

  private el: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
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
      ${new CssRgba([255, 255, 255, 255])}<br />
      this thing is draggable<br />
      and<br />
      shows picked color
    `;
    const dragEl = new Draggable(el, document.body);
    dragEl.start();
    this.el = el;
    Object.assign(this.style, {display: 'flex'});
  }

  attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
    switch (attr) {
      case 'color': this.onChangeColor(newValue); return;
    }
  }

  private onChangeColor(color: string) {
    const colorData = color.split(',').map(slot => parseInt(slot));
    const cssRgba = new CssRgba(colorData);
    this.el.style.backgroundColor = cssRgba.toString();
    this.el.innerText = cssRgba.toString();
    this.el.style.color = colorData.slice(0, -1).reduce((acc, slot) => acc + slot, 0) > 255*3/2 ? 'black' : 'white';
  }

}
