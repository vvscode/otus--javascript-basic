/* eslint-disable */

// IMPLEMENTATION
function Router() {
  let listeners = [];
  let currentPath = location.pathname;
  let previousPath = null;

  const isMatch = (match, path) =>
    (match instanceof RegExp && match.test(path)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  const handleListener = ({ match, onEnter, onLeave }) => {
    const args = { currentPath, previousPath, state: history.state };

    isMatch(match, currentPath) && onEnter(args);
    onLeave && isMatch(match, previousPath) && onLeave(args);
  };

  const handleAllListeners = () => listeners.forEach(handleListener);

  const generateId = () => {
    const getRandomNumber = () =>
      Math.floor(Math.random() * listeners.length * 1000);
    const doesExist = (id) => listeners.find((listener) => listener.id === id);

    let id = getRandomNumber();
    while (doesExist(id)) {
      id = getRandomNumber();
    }
    return id;
  };

  const on = (match, onEnter, onLeave) => {
    const id = generateId();

    const listener = { id, match, onEnter, onLeave };
    listeners.push(listener);
    handleListener(listener);

    return () => {
      listeners = listeners.filter((listeners) => listeners.id !== id);
    };
  };

  const go = (url, state) => {
    previousPath = currentPath;
    history.pushState(state, url, url);
    currentPath = location.pathname;

    handleAllListeners();
  };

  window.addEventListener("popstate", handleAllListeners);

  return { on, go };
}

// USAGE
const render = (content) =>
  (document.getElementById("root").innerHTML = `<h2>${content}</h2>`);

const createLogger =
  (content, shouldRender = true) =>
  (...args) => {
    console.log(`LOGGER: ${content} args=${JSON.stringify(args)}`);
    if (shouldRender) {
      render(content);
    }
  };

const router = Router();

const unsubscribe = router.on(/.*/, createLogger("/.*"));
router.on(
  (path) => path === "/contacts",
  createLogger("/contacts"), // onEnter
  createLogger("[leaving] /contacts", false) // onLeave
);
router.on("/about", createLogger("/about"));
router.on("/about/us", createLogger("/about/us"));

document.body.addEventListener("click", (event) => {
  if (!event.target.matches("a")) {
    return;
  }
  event.preventDefault();
  let url = event.target.getAttribute("href");
  router.go(url);
  unsubscribe();
});
