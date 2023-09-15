import { AbstractContainer, Element } from "./Element";

type LineElementProps = {
  parts: Element[];
}

class LineElement extends AbstractContainer {

  readonly kind: Symbol = Symbol.for('element.Group');

  constructor(private props: LineElementProps) {
    super(props.parts);
  }

  renderStrings() {
    return [...this.children.reduce<string[]>((renderList, segment) => [...renderList, ...segment.renderStrings()], []), '\n'];
  }

}

export const Line = (...args: ConstructorParameters<typeof LineElement>) => new LineElement(...args);