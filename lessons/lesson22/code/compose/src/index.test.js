import { compose } from "./index.js";

describe("compose", () => {
  const upperCase = jest.fn((val) => val.toUpperCase());
  const exclaim = jest.fn((val) => `${val}!`);
  const repeat = jest.fn((val) => val.repeat(3));
  it("is a function", () => expect(typeof compose).toBe("function"));
  const cb1 = compose(upperCase);
  it("should return function", () => expect(typeof cb1).toBe("function"));

  it("compose callbacks", () => {
    expect(cb1("hello")).toBe("HELLO");
    const cb2 = compose(cb1, exclaim, repeat);
    expect(cb2("hello")).toBe("HELLO!HELLO!HELLO!");
  });
});
