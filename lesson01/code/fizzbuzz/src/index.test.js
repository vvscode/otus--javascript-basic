import { fizzBuzz } from "./index.js";
import { getCorrectCallsArgs, getNormalizedSource } from "./..js";

// Решить задачу без использования конструкций if/else
const SHOULD_NOT_USE_IF = false;
// Решить задачу без использования тернарного оператора
const SHOULD_NOT_USE_THERNARY = false;
// Решить задачу без использования логических && и ||
const SHOULD_NOT_USE_AND_OR = false;

describe("fizzBuzz", () => {
  jest.spyOn(console, "log");

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("is a function", () => expect(typeof fizzBuzz).toBe("function"));

  it("prints values using console.log", () => {
    fizzBuzz();
    expect(console.log).toHaveBeenCalled();
  });

  it("prints exactly 100 items", () => {
    fizzBuzz();
    expect(console.log).toHaveBeenCalledTimes(100);
  });

  describe("proper results", () => {
    getCorrectCallsArgs().forEach((args, index) =>
      it(`is expected to see ${args} at position #${index + 1}`, () => {
        fizzBuzz();
        expect(console.log.mock.calls[index]).toEqual(args);
      })
    );
  });

  SHOULD_NOT_USE_IF &&
    describe("Should not use if/else constructions", () => {
      ["if", "else"].forEach((stopWord) =>
        it(`should not use ${stopWord}`, () => {
          expect(getNormalizedSource(fizzBuzz).includes(stopWord)).toBe(false);
        })
      );
    });

  SHOULD_NOT_USE_THERNARY &&
    describe("Should not use thernary operator (? :)", () => {
      ["?", ":"].forEach((stopWord) =>
        it(`should not use ${stopWord}`, () => {
          expect(getNormalizedSource(fizzBuzz).includes(stopWord)).toBe(false);
        })
      );
    });

  SHOULD_NOT_USE_AND_OR &&
    describe("Should not use logical operators &&/||", () => {
      ["&&", "||"].forEach((stopWord) =>
        it(`should not use ${stopWord}`, () => {
          expect(getNormalizedSource(fizzBuzz).includes(stopWord)).toBe(false);
        })
      );
    });
});
