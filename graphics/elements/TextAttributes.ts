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

export enum SetBackground {
  Black = `${CSI_START}40${CSI_END}`,
  Red = `${CSI_START}41${CSI_END}`,
  Green = `${CSI_START}42${CSI_END}`,
  Yellow = `${CSI_START}43${CSI_END}`,
  Blue = `${CSI_START}44${CSI_END}`,
  Magenta = `${CSI_START}45${CSI_END}`,
  Cyan = `${CSI_START}46${CSI_END}`,
  White = `${CSI_START}47${CSI_END}`,
}

class SetAttributeElement implements Element {
  constructor(
    private attr: SetForeground | SetBackground,
    private child: Element) { }

  renderStrings(): string[] {
    return [this.attr, ...this.child.renderStrings(), RESET_ATTRIBUTES];
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
  Black: (child: Element) => new SetAttributeElement(SetForeground.Black, child),
  Red: (child: Element) => new SetAttributeElement(SetForeground.Red, child),
  Green: (child: Element) => new SetAttributeElement(SetForeground.Green, child),
  Yellow: (child: Element) => new SetAttributeElement(SetForeground.Yellow, child),
  Blue: (child: Element) => new SetAttributeElement(SetForeground.Blue, child),
  Magenta: (child: Element) => new SetAttributeElement(SetForeground.Magenta, child),
  Cyan: (child: Element) => new SetAttributeElement(SetForeground.Cyan, child),
  White: (child: Element) => new SetAttributeElement(SetForeground.White, child),
}

export const Bgr = {
  Black: (child: Element) => new SetAttributeElement(SetBackground.Black, child),
  Red: (child: Element) => new SetAttributeElement(SetBackground.Red, child),
  Green: (child: Element) => new SetAttributeElement(SetBackground.Green, child),
  Yellow: (child: Element) => new SetAttributeElement(SetBackground.Yellow, child),
  Blue: (child: Element) => new SetAttributeElement(SetBackground.Blue, child),
  Magenta: (child: Element) => new SetAttributeElement(SetBackground.Magenta, child),
  Cyan: (child: Element) => new SetAttributeElement(SetBackground.Cyan, child),
  White: (child: Element) => new SetAttributeElement(SetBackground.White, child),
}

export const Spacing = (padding: number, child: Element) => new PadAttributeMaybe(padding, child);