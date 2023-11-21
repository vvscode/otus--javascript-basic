import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { CounterButton } from "./CounterButton";

describe("CounterButton", () => {
  it("is a Component", () => {
    expect(CounterButton).toBeInstanceOf(Function);
  });

  describe("functionality", () => {
    beforeEach(() => {
      render(<CounterButton />);
    });

    it("renders button with 0", () => {
      expect(screen.getByTestId("counter-button")).toBeInTheDocument();
      expect(screen.getByTestId("counter-button").innerHTML).toBe("0");
    });

    it("increments counter on every click", () => {
      expect(screen.getByTestId("counter-button").innerHTML).toBe("0");

      userEvent.click(screen.getByTestId("counter-button"));
      expect(screen.getByTestId("counter-button").innerHTML).toBe("1");

      userEvent.click(screen.getByTestId("counter-button"));
      expect(screen.getByTestId("counter-button").innerHTML).toBe("2");

      userEvent.click(screen.getByTestId("counter-button"));
      expect(screen.getByTestId("counter-button").innerHTML).toBe("3");
    });
  });
});
