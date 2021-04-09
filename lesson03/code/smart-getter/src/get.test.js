import { get } from "./get";

const getObj = () => ({
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
    f: [
      0,
      1,
      2,
      3,
      {
        a: 10,
        b: 20,
        c: {
          d: {
            e: 30,
          },
        },
      },
    ],
  },
});

describe("get", () => {
  const invalidKeys = ["d", "c.z", "x.d", "c.f.100", "c.f.4.x", "z.f.4.b"];
  let obj;
  beforeEach(() => (obj = getObj()));

  it("is a function", () => expect(get).toBeInstanceOf(Function));

  it("returns valid properties", () => {
    expect(get(obj, "a")).toBe(1);
    expect(get(obj, "b")).toBe(2);
    expect(get(obj, "c.d")).toBe(3);
    expect(get(obj, "c.e")).toBe(4);
    expect(get(obj, "c.f.0")).toBe(0);
    expect(get(obj, "c.f.1")).toBe(1);
    expect(get(obj, "c.f.2")).toBe(2);
    expect(get(obj, "c.f.3")).toBe(3);
    expect(get(obj, "c.f.4.a")).toBe(10);
    expect(get(obj, "c.f.4.b")).toBe(20);
    expect(get(obj, "c.f.4.c.d.e")).toBe(30);
  });

  it("returns undefined for invalid properties", () => {
    invalidKeys.forEach((invalidKey) =>
      expect(get(obj, invalidKey)).toBe(undefined)
    );
  });

  it("returns fallback value if provided", () => {
    invalidKeys.forEach((invalidKey) => {
      const fallbackValue = Math.random();
      expect(get(obj, invalidKey, fallbackValue)).toBe(fallbackValue);
    });
  });

  it("works not only with objects", () => {
    expect(get([1, 2, 3], "1")).toBe(2);
    expect(get("hello", "1")).toBe("e");
    expect(get(23, "1")).toBe(undefined);
    expect(get(null, "1")).toBe(undefined);
    expect(get(undefined, "1")).toBe(undefined);
  });
});
