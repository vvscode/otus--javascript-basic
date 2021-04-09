import { bind } from "./bind";

describe("bind", () => {
  it("is a funciton", () => {
    expect(bind).toBeInstanceOf(Function);
  });

  it("returns new function", () => {
    expect(bind(jest.fn())).toBeInstanceOf(Function);
  });

  it("returns function which calls with fixed context", () => {
    const bob = { name: "Bob" };
    const spy = jest.fn();

    const bindedFunction = bind(function () {
      spy(this);
    }, bob);
    expect(spy).not.toHaveBeenCalled();
    bindedFunction();
    expect(spy).toHaveBeenCalledWith(bob);
  });

  it("passes params to the function", () => {
    const bob = { name: "Bob" };
    const spy = jest.fn();
    const [a, b] = [Math.random(), Math.random()];

    const bindedFunction = bind(spy, bob);
    expect(spy).not.toHaveBeenCalled();
    bindedFunction(a, b);
    expect(spy).toHaveBeenCalledWith(a, b);
  });

  it("returns function results", () => {
    const x = Math.random();
    const spy = jest.fn(() => x);
    expect(bind(spy, null)()).toBe(x);
  });

  it("does not use .bind method from Function", () => {
    const x = Math.random();
    jest.spyOn(Function.prototype, "bind");
    const spy = jest.fn(() => x);
    expect(bind(spy, null)()).toBe(x);
    expect(Function.prototype.bind).not.toHaveBeenCalled();
  });
});
