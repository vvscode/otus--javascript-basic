import { template } from "./template";

describe("template", () => {
  const data = {
    NAME: "Bob",
    AGE: "18",
    TEAM: "Core",
    items: [
      { A: 1, B: 2 },
      { A: 11, B: 22 },
      { A: 111, B: 222 },
    ],
  };

  describe("basic data placing", () => {
    it("puts data into placeholders", () => {
      expect(template("Hi, {{NAME}}", data)).toBe("Hi, Bob");
    });

    it("puts empty string into placeholders in no data provided", () => {
      expect(template("Hi, {{NAME}} {{SURNAME}}", data)).toBe("Hi, Bob ");
    });

    it("replaces all placeholders", () => {
      expect(template("Hi, {{NAME}}. My name is {{NAME}} too", data)).toBe(
        "Hi, Bob. My name is Bob too"
      );
    });
  });

  describe.skip("loops", () => {
    it("puts values from list elements inside loop", () => {
      expect(
        template("{{NAME}}{{for items}}{{NAME}},{{endfor}}", {
          NAME: "0 ",
          items: [{ NAME: "1" }, { NAME: "2" }],
        })
      ).toBe("0 1,2,");
    });

    it("handles basic loops", () => {
      expect(template("{{for items}}{{A}},{{endfor}}", data)).toBe("1,11,111,");
    });
  });
});
