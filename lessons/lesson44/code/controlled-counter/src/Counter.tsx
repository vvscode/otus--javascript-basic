import React from "react";

import { CounterButton } from "./CounterButton";

export class Counter extends React.Component<{}, { value: number }> {
  state = {
    value: 5,
  };

  inc = () =>
    this.setState((state) => ({
      value: state.value + 1,
    }));

  dec = () =>
    this.setState((state) => ({
      value: state.value - 1,
    }));

  render() {
    return (
      <CounterButton value={this.state.value} inc={this.inc} dec={this.dec} />
    );
  }
}
