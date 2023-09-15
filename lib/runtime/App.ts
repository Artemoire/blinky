import { nextTick } from "process";
import { Element, ElementFunc } from "../elements/Element";
import { Stateful, StatefulKind } from "../elements/Stateful";
import { printStrings } from "../render/printStrings";

class AppRuntime {

  private element: Element | null = null;

  constructor(private elementFunc: ElementFunc) {
  }

  start() {
    this.element = this.elementFunc();
    this._mount(this.element);
  }

  private _mount(element: Element) {
    if (element.lifecycleState !== "detached") return

    element.mount();
    element.visit((element) => {
      if (element.kind === StatefulKind) {
        (element as ReturnType<typeof Stateful>).subscribe(() => {
          this.scheduleRender();
          this._unmount(element);
          this._mount(element);
        });
      }
    })
  }

  private _unmount(element: Element) {
    if (element.lifecycleState !== "mounted") return;
    element.unmount();
  }

  private scheduleRender() {
    nextTick(() => {
      if (this.element === null) throw new Error("No element");
      printStrings(this.element.renderStrings());
    });
  }
}

export const App = (element: ElementFunc) => new AppRuntime(element);