import { ExampleRoot } from "./components/example-root";
import { ExampleCanvas } from "./components/example-canvas";
import { ExampleInfo } from "./components/example-info";
import { ExampleFade } from "./components/example-fade";

export class ExampleApp {
  
  constructor() {
    customElements.define('example-root', ExampleRoot);
    customElements.define('example-canvas', ExampleCanvas);
    customElements.define('example-info', ExampleInfo);
    customElements.define('example-fade', ExampleFade);
  }
  
  public run() {
    const root = new ExampleRoot();
  }

}
