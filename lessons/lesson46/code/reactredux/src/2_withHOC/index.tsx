import React from "react";
import { store } from "../store";
import { counterSlice } from "../store/counter";
import { withRedux } from "./withRedux";

const getAppProps = (state) => {
  return {
    count: state.counter,
    totalCount: state.actionsCounter.count,
  };
};

class RawApp extends React.Component<
  ReturnType<typeof getAppProps> & {
    dispatch: (action: any) => void;
  }
> {
  render() {
    return (
      <>
        <h1>Total clicks: {this.props.totalCount}</h1>
        <button
          onClick={() =>
            this.props.dispatch(counterSlice.actions.incrementByAmount(-2))
          }
        >
          -2
        </button>
        <button
          onClick={() => this.props.dispatch(counterSlice.actions.decrement())}
        >
          -1
        </button>
        <span style={{ margin: 10 }}>{this.props.count}</span>
        <button
          onClick={() => this.props.dispatch(counterSlice.actions.increment())}
        >
          +1
        </button>
        <button
          onClick={() =>
            this.props.dispatch(counterSlice.actions.incrementByAmount(2))
          }
        >
          +2
        </button>
      </>
    );
  }
}

export const App = withRedux<ReturnType<typeof getAppProps>>(
  RawApp,
  getAppProps
);
