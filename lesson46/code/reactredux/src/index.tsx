import { render } from "react-dom";

let App = () => <h1>React-Redux</h1>;
// import { App } from "./1_pureReact";
// import { App } from "./2_withHOC";
// import { App } from "./3_react-redux";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
