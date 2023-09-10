import { Element, ElementRenderer } from "./Element";

type LineElementProps = {
  parts: Element[];
}

class LineElement implements Element {

  constructor(private props: LineElementProps) {
  }

  renderStrings() {
    return [...this.props.parts.reduce<string[]>((renderList, segment) => [...renderList, ...segment.renderStrings()], []), '\n'];
  }

  render(renderer: ElementRenderer) {
    return this.renderStrings();
  }
}

export const Line = (...args: ConstructorParameters<typeof LineElement>) => new LineElement(...args);