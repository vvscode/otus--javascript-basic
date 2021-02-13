import { memo } from "./index.js";

const mockCb = (a, b) => {
  console.log(a, b);
  return a * b;
};

describe("memo", () => {
  jest.spyOn(console, "log");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("is a function", () => expect(typeof memo).toBe("function"));
  const cb = memo(mockCb);
  it("should return function", () => expect(typeof cb).toBe("function"));
  it("call cb with same arguments only once", () => {
    cb(5, 6); //once
    cb(5, 6); //still once
    expect(console.log).toHaveBeenCalledTimes(1);
    cb(5, 7); //twice
    cb(5, 8); //thrice
    expect(console.log).toHaveBeenCalledTimes(3);
  });
});
