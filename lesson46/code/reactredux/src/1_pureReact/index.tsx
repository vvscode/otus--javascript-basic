import React from "react";
import { store } from "../store";
import { counterSlice } from "../store/counter";

export class App extends React.Component {
  private unsubscribe = () => {};

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getComponentData() {
    const state = store.getState();
    return {
      count: state.counter,
      totalCount: state.actionsCounter.count,
    };
  }

  render() {
    const componentData = this.getComponentData();
    return (
      <>
        <h1>Total clicks: {componentData.totalCount}</h1>
        <button
          onClick={() =>
            store.dispatch(counterSlice.actions.incrementByAmount(-2))
          }
        >
          -2
        </button>
        <button
          onClick={() => store.dispatch(counterSlice.actions.decrement())}
        >
          -1
        </button>
        <span style={{ margin: 10 }}>{componentData.count}</span>
        <button
          onClick={() => store.dispatch(counterSlice.actions.increment())}
        >
          +1
        </button>
        <button
          onClick={() =>
            store.dispatch(counterSlice.actions.incrementByAmount(2))
          }
        >
          +2
        </button>
      </>
    );
  }
}
