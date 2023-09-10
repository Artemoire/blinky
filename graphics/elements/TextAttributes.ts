import { Element, ElementRenderer } from "./Element";

const CSI_START = '\u001b[';
const CSI_END = 'm';

const RESET_ATTRIBUTES = `${CSI_START}0${CSI_END}`;

export enum SetForeground {
  Black = `${CSI_START}30${CSI_END}`,
  Red = `${CSI_START}31${CSI_END}`,
  Green = `${CSI_START}32${CSI_END}`,
  Yellow = `${CSI_START}33${CSI_END}`,
  Blue = `${CSI_START}34${CSI_END}`,
  Magenta = `${CSI_START}35${CSI_END}`,
  Cyan = `${CSI_START}36${CSI_END}`,
  White = `${CSI_START}37${CSI_END}`,
}

class SetForegroundAttribute implements Element {
  constructor(
    private fgr: SetForeground,
    private child: Element) { }

  renderStrings(): string[] {
    return [this.fgr, ...this.child.renderStrings(), RESET_ATTRIBUTES];
  }

  render(renderer: ElementRenderer): string[] {
    return this.renderStrings();
  }

}

class PadAttributeMaybe implements Element {
  constructor(
    private padding: number,
    private child: Element
  ) { }

  renderStrings(): string[] {
    const padding = ' '.repeat(this.padding);
    return [padding, ...this.child.renderStrings(), padding];
  }

  render(renderer: ElementRenderer): string[] {
    return this.renderStrings();
  }

}

export const Fgr = {
  Black: (child: Element) => new SetForegroundAttribute(SetForeground.Black, child),
  Red: (child: Element) => new SetForegroundAttribute(SetForeground.Red, child),
  Green: (child: Element) => new SetForegroundAttribute(SetForeground.Green, child),
  Yellow: (child: Element) => new SetForegroundAttribute(SetForeground.Yellow, child),
  Blue: (child: Element) => new SetForegroundAttribute(SetForeground.Blue, child),
  Magenta: (child: Element) => new SetForegroundAttribute(SetForeground.Magenta, child),
  Cyan: (child: Element) => new SetForegroundAttribute(SetForeground.Cyan, child),
  White: (child: Element) => new SetForegroundAttribute(SetForeground.White, child),
}

export const Spacing = (padding: number, child: Element) => new PadAttributeMaybe(padding, child);