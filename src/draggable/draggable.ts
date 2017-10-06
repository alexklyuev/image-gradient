export class Draggable {
  private initCoords: [number, number] = [0, 0];

  private onStop: () => void;

  constructor(
    private el: HTMLElement,
    private container: HTMLElement = document.body,
  ) {}

  start() {
    Object.assign(this.el.style, {
      position: 'absolute',
    });
    this.container.appendChild(this.el);
    const elOnMove = (event: MouseEvent): void => {
      const {clientX, clientY} = event;
      const [initX, initY] = this.initCoords;
      const {top, left} = this.el.getBoundingClientRect();
      Object.assign(this.el.style, {
        left: left + clientX - initX + 'px',
        top: top + clientY - initY + 'px',
      });
      this.initCoords = [event.clientX, event.clientY];
    };
    const elOnDown = (event: MouseEvent): void => {
      this.initCoords = [event.clientX, event.clientY];
      this.container.addEventListener('mousemove', elOnMove);
      this.container.addEventListener('mouseup', elOnUp);
    };
    const elOnUp = (event: MouseEvent): void => {
      this.container.removeEventListener('mousemove', elOnMove);
      this.container.removeEventListener('mouseup', elOnUp);
    };
    this.el.addEventListener('mousedown', elOnDown);
    this.onStop = () => {this.el.removeEventListener('mousedown', elOnDown)};
  }

  stop() {
    this.onStop();
  }

  detach(): HTMLElement {
    this.stop();
    this.container.removeChild(this.el);
    return this.el;
  }

}
