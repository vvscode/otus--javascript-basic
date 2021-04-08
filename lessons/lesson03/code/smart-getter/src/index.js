// import { get } from "./get";

window.data = {
  person: {
    name: "Bob",
    details: {
      age: 18,
      catName: "Bars",
    },
  },
};

document.getElementById("app").innerHTML = `<h1>Getter</h1>`;

// window._get = get;
