import { isPalindrom } from "./isPalindrom";

describe("isPalindrom", () => {
  //  palindroms
  ["", "a", "aa", "aba", "aabaa", "abcba"].forEach((palindrom) =>
    it(`detects "${palindrom}" as palindrom`, () => {
      expect(isPalindrom(palindrom)).toBe(true);
    })
  );

  // not palindroms
  ["ab", "aab", "aaba", "aaabaa", "abc", "aaaa "].forEach((notPalindrom) =>
    it(`does not detect "${notPalindrom}" as palindrom`, () => {
      expect(isPalindrom(notPalindrom)).toBe(false);
    })
  );
});
