import { Element, VisitElement } from "./Element";

type StateUpdateFunc<TState extends Record<string, any>> = { (state: TState): void }
type ElementFromStateFunc<TState extends Record<string, any>> = { (state: TState, updateState: StateUpdateFunc<TState>): Element };

class StatefulElement<TState extends Record<string, any>> implements Element {

  public readonly kind = StatefulKind;
  lifecycleState: "mounted" | "detached" = "detached";

  private listeners: StateUpdateFunc<StatefulElement<any>>[] = [];
  private renderStringsCache: string[] | null = null;
  private element: Element | null = null;

  constructor(
    private elementFromState: ElementFromStateFunc<TState>,
    private state: TState
  ) { }

  subscribe(listener: StateUpdateFunc<StatefulElement<any>>): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: StateUpdateFunc<StatefulElement<any>>): void {
    const index = this.listeners.indexOf(listener);
    if (index !== -1) {
      this.listeners.splice(index, 1);
    }
  }

  private _notifyStateChange(): void {
    this.listeners.forEach((listener) => listener(this));
  }

  updateState(newState: TState): void {
    if (newState === this.state) return;
    this.state = newState;
    this.renderStringsCache = null;
    this._notifyStateChange();
  }

  mount(): void {
    this.element = this.elementFromState(this.state, (newState) => this.updateState(newState));
    this.element.mount();
    this.lifecycleState = "mounted";
  }

  renderStrings(): string[] {
    if (this.renderStringsCache !== null) return this.renderStringsCache;
    if (this.element === null) throw new Error("Mount?"); // TODO: consider
    return this.renderStringsCache = this.element.renderStrings();
  }

  unmount(): void {
    if (this.element === null) throw new Error("Mount?");
    this.element.unmount();
    this.element = null;
    this.listeners = [];
    this.lifecycleState = "detached";
  }

  visit(visitor: VisitElement): void {
    visitor(this);
    if (this.element) visitor(this.element);
  }

}

export const Stateful = <TState extends Record<string, any>>(elementFromState: ElementFromStateFunc<TState>, initalState: TState) => new StatefulElement(elementFromState, initalState);
export const StatefulKind = Symbol.for('element.Stateful');