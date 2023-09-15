import { AbstractContainer, Element } from "./Element";

class GroupElement extends AbstractContainer {
  
  readonly kind: Symbol = Symbol.for('element.Group');

  constructor(
    children: Element[]
  ) { super(children)}

  renderStrings(): string[] {
    return [...this.children.reduce<string[]>((renderList, segment) => [...renderList, ...segment.renderStrings()], [])];
  }

}

export const Group = (...elements: Element[]) => new GroupElement(elements);