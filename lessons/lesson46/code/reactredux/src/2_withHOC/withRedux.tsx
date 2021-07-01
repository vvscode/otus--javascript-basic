import React, { Dispatch } from "react";
import { AnyAction } from "redux";
import { store } from "../store";

interface DispatchProp {
  dispatch?: Dispatch<AnyAction>;
}

type State = Record<string, unknown>;

// if you want to get more info
// try to check https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e
export function withRedux<ComponentProps = any, Props = any>(
  TargetComponent: React.ComponentType<Props>,
  getPropsFromRedux: (state: State) => ComponentProps
): React.ComponentType<Omit<Props, keyof DispatchProp & ComponentProps>> {
  class WrappedComponent extends React.Component<
    Omit<Props, keyof ReturnType<typeof getPropsFromRedux>>,
    State
  > {
    storeSubscription = () => {};

    render() {
      return (
        <TargetComponent
          dispatch={store.dispatch}
          {...getPropsFromRedux(store.getState())}
          {...(this.props as any)}
        />
      );
    }

    componentDidMount() {
      this.storeSubscription = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
      this.storeSubscription();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (
    WrappedComponent as any
  ).displayName = `${TargetComponent.displayName}ConnectedToRedux`;

  return WrappedComponent;
}
