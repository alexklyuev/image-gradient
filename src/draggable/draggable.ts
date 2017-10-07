interface EventInterceptors {
  mousedown?: (event: MouseEvent) => void;
  mousemove?: (event: MouseEvent) => void;
  mouseup?: (event: MouseEvent) => void;
}

export class Draggable {
  private initCoords: [number, number] = [0, 0];
  private onStop: () => void;
  private on = false;
  private attached = false;

  constructor(
    private el: HTMLElement,
    private container: HTMLElement = document.body,
  ) {}

  start(eventInterceptors: EventInterceptors = {}) {
    Object.assign(this.el.style, {
      position: 'absolute',
    });
    this.container.appendChild(this.el);
    this.attached = true;
    const elOnMove = (event: MouseEvent): void => {
      if (eventInterceptors.mousemove instanceof Function) {
        eventInterceptors.mousemove(event);
      }
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
      if (eventInterceptors.mousedown instanceof Function) {
        eventInterceptors.mousedown(event);
      }
      this.initCoords = [event.clientX, event.clientY];
      this.container.addEventListener('mousemove', elOnMove);
      this.container.addEventListener('mouseup', elOnUp);
    };
    const elOnUp = (event: MouseEvent): void => {
      if (eventInterceptors.mouseup instanceof Function) {
        eventInterceptors.mouseup(event);
      }
      this.container.removeEventListener('mousemove', elOnMove);
      this.container.removeEventListener('mouseup', elOnUp);
    };
    this.el.addEventListener('mousedown', elOnDown);
    this.onStop = () => {this.el.removeEventListener('mousedown', elOnDown)};
    this.on = true;
  }

  stop() {
    this.onStop();
    this.on = false;
  }

  detach(): HTMLElement {
    this.stop();
    this.container.removeChild(this.el);
    this.attached = false;
    return this.el;
  }

  isOn(): boolean {
    return this.on;
  }

  isAttached(): boolean {
    return this.attached;
  }

}
