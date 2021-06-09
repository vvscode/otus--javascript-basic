/* eslint-disable */

/**
 * TODO: modify router.js to support
 * 1. unsubscribe function.
 *    Hint: inside Router.go function return unsubscribe function,
 *          which will remove listener by id
 * 2. onLeave callback
 *    Hint: Add 3rd 'onLeave' parameter to Router.on + save in listener object
 *          Check in Router.handleListener if previousPath matches listener
 */

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
