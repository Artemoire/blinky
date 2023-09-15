export type VisitElement = (element: Element) => void;

export interface Element {
  lifecycleState: "mounted" | "detached";
  readonly kind: Symbol;
  renderStrings(): string[];
  mount(): void;
  unmount(): void;
  visit(visitor: VisitElement): void;
}

export abstract class AbstractElement implements Element {

  lifecycleState: "mounted" | "detached" = "detached";
  abstract kind: Symbol;

  abstract renderStrings(): string[];

  mount(): void {
    this.lifecycleState = "mounted";
  }

  unmount(): void {
    this.lifecycleState = "detached";
  }

  visit(visitor: VisitElement) {
    visitor(this);
  }
}

export abstract class AbstractContainer implements Element {

  lifecycleState: "mounted" | "detached" = "detached";
  abstract kind: Symbol;

  constructor(
    public readonly children: Element[]
  ) { }

  abstract renderStrings(): string[];

  mount(): void {
    this.lifecycleState = "mounted";
    try {
      this.children.forEach(child => child.mount());
    } catch (error) {
      console.log(this.children.map(child=>child.kind));
    }
  }

  unmount(): void {
    this.lifecycleState = "detached";
    this.children.forEach(child => child.unmount());
  }

  visit(visitor: VisitElement) {
    visitor(this);
    this.children.forEach(child => child.visit(visitor));
  }

}