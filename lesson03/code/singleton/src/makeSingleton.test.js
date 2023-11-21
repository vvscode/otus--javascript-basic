import { makeSingleton } from "./makeSingleton";

describe.skip("makeSingleton", () => {
  it("is a function", () => {
    expect(makeSingleton).toBeInstanceOf(Function);
  });

  it("returns a constructor for passed class", () => {
    class X {}
    let SingletonX = makeSingleton(X);
    expect(SingletonX).toBeInstanceOf(Function);
    expect(new SingletonX()).toBeInstanceOf(X);
  });

  it("returns singlton version of passed class", () => {
    class X {}
    let SingletonX = makeSingleton(X);
    expect(new X()).not.toBe(new X());
    expect(new SingletonX()).toBe(new SingletonX());
  });

  it("passes arguments to the constructor", () => {
    class Y {
      constructor(a, b) {
        this.a = a;
        this.b = b;
      }
    }
    let SingletonY = makeSingleton(Y);
    let a = Math.random();
    let b = Math.random();
    let y = new SingletonY(a, b);
    expect(y.a).toBe(a);
    expect(y.b).toBe(b);
  });

  it("passes arguments to the constructor only on first instance", () => {
    function Z(a, b) {
      this.a = a;
      this.b = b;
    }
    let SingletonZ = makeSingleton(Z);
    let a = Math.random();
    let b = Math.random();
    let z1 = new SingletonZ(a, b);
    let z2 = new SingletonZ(1, 2);
    let z3 = new SingletonZ(3, 4);
    expect(z1.a).toBe(a);
    expect(z2.b).toBe(b);
    expect(z1).toBe(z2);
    expect(z1).toBe(z3);
  });
});
