// import { EventEmitter } from "./EventEmitter";

// (document.querySelector("#app") as HTMLElement).innerHTML = `
// <input name="input1" placeholder="Enter some text..." />
// <h1></h1>
// <input name="input2" placeholder="Enter some text..." />
// `;
// const input1 = document.querySelector("input[name=input1") as HTMLInputElement;
// const input2 = document.querySelector("input[name=input2") as HTMLInputElement;
// const header = document.querySelector("h1") as HTMLHeadingElement;

// const eventEmitter = new EventEmitter();

// eventEmitter.on("changeText", (text) => (header.innerHTML = text));

// input1.addEventListener("keypress", (ev) =>
//   eventEmitter.trigger("changeText", (ev.target as HTMLInputElement).value)
// );
// input2.addEventListener("keypress", (ev) =>
//   eventEmitter.trigger("changeText", (ev.target as HTMLInputElement).value)
// );
