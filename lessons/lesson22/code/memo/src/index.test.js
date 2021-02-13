import { memo } from "./index.js";

describe("memo", () => {
  const mock = jest.fn().mockReturnValue(true);
  it("is a function", () => expect(typeof memo).toBe("function"));
  const cb = memo(mock);
  it("should return function", () => expect(typeof cb).toBe("function"));
  it("call cb with same arguments only once", () => {
    cb(5, 6); //once
    cb(5, 6); //still once
    expect(mock).toHaveBeenCalledTimes(1);
    cb(5, 7); //twice
    cb(5, 8); //thrice
    expect(mock).toHaveBeenCalledTimes(3);
  });
});
