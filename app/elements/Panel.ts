import { Element, VisitElement } from "../../lib/elements/Element";
import { Group } from "../../lib/elements/Group";
import { Text } from "../../lib/elements/Text";

class PanelElement implements Element {
  readonly kind: Symbol = Symbol.for('element.Panel');
  lifecycleState: "mounted" | "detached" = "detached";

  private _renderStrings: string[] | null = null;

  constructor(
    private width: number,
    private height: number,
  ) { }

  mount(): void {
    if (this._renderStrings !== null) throw new Error("Unmount?");
    this._renderStrings = [];
    const bodySegment = '│' + ' '.repeat(this.width - 2) + '│';
    this._renderStrings = ['┌' + '─'.repeat(this.width - 2) + '┐'];
    for (let row = 0; row < this.height - 2; row++) this._renderStrings.push(bodySegment);
    this._renderStrings.push('└' + '─'.repeat(this.width - 2) + '┘');
    this.lifecycleState = "mounted";
  }

  unmount(): void {
    if (this._renderStrings === null) throw new Error("Mount?");
    this.lifecycleState = "detached";
  }

  renderStrings(): string[] {
    if (this._renderStrings === null) throw new Error("MOunt?");
    return this._renderStrings;
  }

  visit(visitor: VisitElement): void {
    visitor(this);
  }

}

type PanelProps = { rows: number; cols: number; };
export const Panel = ({ rows, cols }: PanelProps) => new PanelElement(cols, rows);