(async function () {
  // Должна возвращать список пользователя
  // Если пользователь ничего не вводил - пустой список
  async function readList() {
    // put your code here
  }

  // Сохраняет список
  function saveList(items) {
    // put your code here
  }

  function drawList(el, items) {
    el.innerHTML = `<ol>${items.map((el) => `<li>${el}</li>`).join("")}</ol>`;
  }

  // Получаем указатели на нужные элементы
  const form = document.querySelector("form");
  const listEl = document.querySelector("#list");

  // Читаем список при старте
  const items = await readList();

  // и отрисовываем список
  drawList(listEl, items);

  form.addEventListener("submit", (ev) => {
    // чтобы не перезагружать страницу
    ev.preventDefault();

    // читаем значение из формы
    const formElement = ev.target;
    const input = formElement.querySelector("input");
    const value = input.value;
    input.value = "";

    // добавляем элемент в список
    items.push(value);

    // обновляем список
    drawList(listEl, items);

    // сохраняем список
    saveList(items);
  });
})();
