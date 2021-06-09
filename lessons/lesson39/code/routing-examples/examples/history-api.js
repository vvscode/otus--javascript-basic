/* eslint-disable */

const render = () => {
  const route = location.pathname;
  document.getElementById("root").innerHTML = `<h2>"${route}" page</h2>`;
};

// 1. Handle initial page load
window.addEventListener("load", () => {
  render(); // 👈
});

// 2. Handle history navigations. alternative "window.onpopstate"
window.addEventListener("popstate", (event) => {
  render();
});

// 3. Catch <a> tag clicks + trigger change handler
document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  let url = event.target.getAttribute("href");
  history.pushState({ foo: "bar" }, document.title, url);
  // history.replaceState({ foo: "bar" }, url, url);
  render(); // 👈
});
