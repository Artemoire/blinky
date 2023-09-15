import { nextTick } from "process";
import { Element, VisitElement } from "../elements/Element";
import { Stateful, StatefulKind } from "../elements/Stateful";

const GOTO_LINE_ABOVE = '\x1b[A';
const GOTO_LINE_START = '\r';
const CLEAR_SCREEN = '\x1b[2J';

type LineHistory = {
  positions: [number, number][]
}
class AppRenderer {

  private history = {
    lineCount: 0,
    caret: 0,
    // lines: [] as LineHistory[],
    // stdout: {
    //   cols: process.stdout.columns,
    //   rows: process.stdout.rows,
    // },
  }

  constructor(private element: Element) {
  }

  private _mount(element: Element = this.element) {
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

  private _unmount(element: Element = this.element) {
    if (element.lifecycleState !== "mounted") return;
    element.unmount();
  }

  render() {
    this._mount();
    process.stdout.write(GOTO_LINE_START);
    process.stdout.write(GOTO_LINE_ABOVE.repeat(this.history.lineCount));
    const maxCaret = process.stdout.columns;
    this.history.lineCount = 0;
    this.history.caret = 0;

    const renderStrings = this.element.renderStrings();

    for (let i = 0; i < renderStrings.length; i++) {
      if (this.history.caret === maxCaret) {
        this.history.caret = 0;
        this.history.lineCount++;
      }

      const renderString = renderStrings[i];

      const isEscapeSequence = renderString['0'] === '\x1b';

      process.stdout.write(renderString);
      if (!isEscapeSequence) this.history.caret += renderString.length;
      if (renderString === '\n') {
        this.history.caret = 0;
        this.history.lineCount++;
      }

    }
  }

  scheduleRender() {
    nextTick(() => {
      this.render();
    });
  }
}

export const RenderApp = (element: Element) => new AppRenderer(element).render();