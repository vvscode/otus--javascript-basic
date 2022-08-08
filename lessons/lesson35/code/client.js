const socket = new WebSocket("ws://localhost:3000");

const span = document.querySelector("span");
const button = document.querySelector("button");
const input = document.querySelector("input");

socket.onopen = function () {
  span.textContent = "ONLINE";

  socket.onmessage = async function (msg) {
    console.log(msg.data);
    const data = await msg.data.text();
    createMessageEl(data, ["message"]);
  };
};

socket.onclose = function () {
  span.textContent = "OFFLINE";
};

button.addEventListener("click", () => {
  if (socket.readyState === socket.OPEN) {
    socket.send(input.value);

    createMessageEl(input.value, ["message", "my-message"]);

    input.value = "";
  }
});

function createMessageEl(content, className) {
  const message = document.createElement("div");

  message.classList.add(...className);

  message.textContent = content;
  document.body.append(message);
}
