import { AnyAction, bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect } from "react-redux";
import { store } from "../store";
import { counterSlice } from "../store/counter";

const mapStateToProps = (state: ReturnType<typeof store.getState>) => ({
  count: state.counter,
  totalCount: state.actionsCounter.count,
});

// https://react-redux.js.org/api/connect#mapdispatchtoprops-object--dispatch-ownprops--object
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {
      incrementByAmount: counterSlice.actions.incrementByAmount,
      decrement: counterSlice.actions.decrement,
      increment: counterSlice.actions.increment,
    },
    dispatch
  );
};
// const mapDispatchToProps = {
//   incrementByAmount: counterSlice.actions.incrementByAmount,
//   decrement: counterSlice.actions.decrement,
//   increment: counterSlice.actions.increment
// };

type ConnectedProps<
  MapData extends (...args: any) => any,
  MapActions extends (...args: any) => any | Record<any, any>
> = ReturnType<MapData> &
  (MapActions extends Function ? ReturnType<MapActions> : MapActions);

class RawCounter extends React.Component<
  ConnectedProps<typeof mapStateToProps, typeof mapDispatchToProps>
> {
  render() {
    return (
      <>
        <h1>Total clicks: {this.props.totalCount}</h1>
        <button onClick={() => this.props.incrementByAmount(-2)}>-2</button>
        <button onClick={() => this.props.decrement()}>-1</button>
        <span style={{ margin: 10 }}>{this.props.count}</span>
        <button onClick={() => this.props.increment()}>+1</button>
        <button onClick={() => this.props.incrementByAmount(2)}>+2</button>
      </>
    );
  }
}

export const Counter = connect(mapStateToProps, mapDispatchToProps)(RawCounter);
