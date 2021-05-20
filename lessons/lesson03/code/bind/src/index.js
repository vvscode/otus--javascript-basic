import { bind } from "./bind";

const bob = {
  name: "Bob",
};

function greet() {
  alert(`Hello from ${this.name}`);
}

const greetFromBob = bind(greet, bob);

document.getElementById("app").innerHTML = `
<button>Hello bind!</button>
`;

document.querySelector("button").addEventListener("click", greetFromBob);
