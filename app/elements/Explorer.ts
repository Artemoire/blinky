import { Element, ElementRenderer } from "../../graphics/elements/Element";
import { Group } from "../../graphics/elements/Group";
import { Text } from "../../graphics/elements/Text";
import { Panel } from "./Panel";

class ExplorerElement implements Element {

  private left: Element;
  private right: Element;

  constructor(
    private width: number,
    private height: number,
  ) {
    this.left = Panel({ rows: height, cols: Math.floor(width / 2) });
    this.right = Panel({ rows: height, cols: Math.floor(width / 2) });
  }

  renderStrings(): string[] {
    throw new Error("Method not implemented.");
  }

  render(renderer: ElementRenderer): string[] {
    const leftRender = this.left.render(renderer);
    const rightRender = this.right.render(renderer);
    const renderStrings = [];
    const shouldSpace = (this.width % 2) === 0 ? false : true;
    for (let i = 0; i < this.height; i++) {
      renderStrings.push(leftRender[i]);
      if (shouldSpace) renderStrings.push(' ');
      renderStrings.push(rightRender[i]);
    }

    return renderStrings;
  }

}

type ExplorerProps = { rows: number; cols: number; };
export const Explorer = ({ rows, cols }: ExplorerProps) => new ExplorerElement(cols, rows);