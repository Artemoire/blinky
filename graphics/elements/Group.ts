import { Element, ElementRenderer } from "./Element";

class GroupElement implements Element {

  constructor(
    private elements: Element[]
  ) { }

  renderStrings(): string[] {
    throw new Error("Method not implemented.");
  }

  render(renderer: ElementRenderer): string[] {
    return [...this.elements.reduce<string[]>((renderList, segment) => [...renderList, ...segment.render(renderer)], [])];
  }

}

export const Group = (...elements: Element[]) => new GroupElement(elements);