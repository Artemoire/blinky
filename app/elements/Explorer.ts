import { Element, VisitElement } from "../../graphics/elements/Element";
import { Group } from "../../graphics/elements/Group";
import { Text } from "../../graphics/elements/Text";
import { Panel } from "./Panel";

class ExplorerElement implements Element {

  readonly kind: Symbol = Symbol.for('element.Explorer');
  lifecycleState: "mounted" | "detached" = "detached";

  private left: Element;
  private right: Element;

  constructor(
    private width: number,
    private height: number,
  ) {
    this.left = Panel({ rows: height, cols: Math.floor(width / 2) });
    this.right = Panel({ rows: height, cols: Math.floor(width / 2) });
  }

  mount(): void {
    this.left.mount();
    this.right.mount();
    this.lifecycleState = "mounted";
  }

  unmount(): void {
    this.left.unmount();
    this.right.unmount();
    this.lifecycleState = "detached";
  }

  renderStrings(): string[] {
    const leftRender = this.left.renderStrings();
    const rightRender = this.right.renderStrings();
    const renderStrings = [];
    const shouldSpace = (this.width % 2) === 0 ? false : true;
    for (let i = 0; i < this.height; i++) {
      renderStrings.push(leftRender[i]);
      if (shouldSpace) renderStrings.push(' ');
      renderStrings.push(rightRender[i]);
    }

    return renderStrings;
  }

  visit(visitor: VisitElement): void {
    visitor(this);
    this.left.visit(visitor)
    this.right.visit(visitor);
  }
}

type ExplorerProps = { rows: number; cols: number; };
export const Explorer = ({ rows, cols }: ExplorerProps) => new ExplorerElement(cols, rows);