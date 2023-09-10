import { Element, ElementRenderer } from "./Element";

class TextElement implements Element {

  constructor(private content: string) {
  }

  renderStrings(): string[] {
    return [this.content];
  }

  render(renderer: ElementRenderer): string[] {
    return this.renderStrings();
  }

}

export const Text = (content: string) => new TextElement(content);