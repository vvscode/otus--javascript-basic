import { Singleton } from "./singleton";

describe.skip("Singleton", () => {
  it("is a funciton", () => expect(Singleton).toBeInstanceOf(Function));

  it("is a constructor", () =>
    expect(new Singleton()).toBeInstanceOf(Singleton));

  it("is a singleton", () => {
    expect(new Singleton()).toBe(new Singleton());
  });

  it("does not keep props in creator", () => {
    const singleton1 = new Singleton();

    Object.keys(Singleton).forEach((extraKey) => {
      delete Singleton[extraKey];
    });
    const singleton2 = new Singleton();
    expect(singleton1).toBe(singleton2);
  });
});
