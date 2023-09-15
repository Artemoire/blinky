import { Element, AbstractElement } from "./Element";

class TextElement extends AbstractElement {

  readonly kind: Symbol = Symbol.for('element.Text');

  constructor(private content: string) {
    super();
  }

  renderStrings(): string[] {
    return [this.content];
  }

}

export const Text = (content: string) => new TextElement(content);