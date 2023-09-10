import { Element, ElementRenderer } from "../../graphics/elements/Element";
import { Group } from "../../graphics/elements/Group";
import { Text } from "../../graphics/elements/Text";

class PanelElement implements Element {

  private _renderStrings: string[] | null = null;

  constructor(
    private width: number,
    private height: number,
  ) { }

  renderStrings(): string[] {
    throw new Error("Method not implemented.");
  }

  render(renderer: ElementRenderer): string[] {
    if (this._renderStrings !== null) return this._renderStrings;
    const bodySegment = '│' + ' '.repeat(this.width - 2) + '│';
    this._renderStrings = ['┌' + '─'.repeat(this.width - 2) + '┐'];
    for (let row = 0; row < this.height - 2; row++) this._renderStrings.push(bodySegment);
    this._renderStrings.push('└' + '─'.repeat(this.width - 2) + '┘');
    return this._renderStrings;
  }

}

type PanelProps = { rows: number; cols: number; };
export const Panel = ({ rows, cols }: PanelProps) => new PanelElement(cols, rows);