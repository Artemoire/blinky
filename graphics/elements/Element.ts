export interface Element {
  renderStrings(): string[];
  render(renderer: ElementRenderer): string[];
}

export interface ElementRenderer {
  rerender(): void;
}