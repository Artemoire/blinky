import { Element, ElementRenderer } from "./Element";

type StateUpdateFunc<TState extends Record<string, any>> = { (state: TState): void }
type ElementFromStateFunc<TState extends Record<string, any>> = { (state: TState, updateState: StateUpdateFunc<TState>): Element };
class StatefulElement<TState extends Record<string, any>> implements Element {
  private renderer: ElementRenderer | null = null;
  private renderStringsCache: string[] | null = null;

  constructor(
    private elementFromState: ElementFromStateFunc<TState>,
    private state: TState
  ) { }

  updateState(newState: TState): void {
    if (newState === this.state) return;
    this.state = newState;
    this.renderStringsCache = null;
    if (this.renderer) this.renderer.rerender();
  }

  renderStrings(): string[] {
    throw new Error("Method not implemented");
  }

  render(renderer: ElementRenderer): string[] {
    if (this.renderer === null) this.renderer = renderer;
    if (this.renderer === renderer && this.renderStringsCache !== null) return this.renderStringsCache;
    this.renderer = renderer;
    this.renderStringsCache = this.elementFromState(this.state, (newState) => this.updateState(newState)).render(renderer);
    return this.renderStringsCache;
  }

}

export const Stateful = <TState extends Record<string, any>>(elementFromState: ElementFromStateFunc<TState>, initalState: TState) => new StatefulElement(elementFromState, initalState);