import { Draggable } from '../../color-picker';

export class ExampleFade extends HTMLElement {
  private list: HTMLUListElement;
  private white: HTMLLIElement;
  private black: HTMLLIElement;

  private disconectFns: Array<() => void> = [];

  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
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
    }
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
    const dragEl = new Draggable(this.list, document.body);
    dragEl.start();
  }

  connectedCallback() {
    const onPickWhite = (event: MouseEvent) => {
      this.dispatchEvent(new CustomEvent('pick', {detail: {colorData: [255, 255, 255, 255]}}));
    };
    const onPickBlack = (event: MouseEvent) => {
      this.dispatchEvent(new CustomEvent('pick', {detail: {colorData: [0, 0, 0, 255]}}));
    };
    this.white.addEventListener('click', onPickWhite);
    this.black.addEventListener('click', onPickBlack);
    this.disconectFns.push(
      () => {this.white.removeEventListener('click', onPickWhite)},
      () => {this.black.removeEventListener('click', onPickBlack)},
    );
  }

  disconnectedCallback() {
    this.disconectFns.forEach(fn => fn());
  }

}
