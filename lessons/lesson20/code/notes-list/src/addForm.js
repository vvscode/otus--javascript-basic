/**
На странице должны быть три текстовых
 параграфа, поле ввода и кнопка. Напишите скрипт,
 который будет выполнять следующие условия:
 1.Кнопка скрыта, если в поле ввода нет значения.
 2.При клике на кнопку добавляется новый параграф,
 содержащий текст из поля ввода.
 3.*Если параграфов становится больше 4, первый из
 них удаляется.  */

/**
 * @param {HTMLElement} el
 */
export function addForm(el) {
  //el = document.createElement('div');
  let input = document.createElement("input");
  let button = document.createElement("button");
  button.innerHTML = "add";
  button.addEventListener("click", () => {
    let p = document.createElement("p");
    el.appendChild(p);
    p.innerHTML = input.value;
    input.value = "";
    el.removeChild(button);
    if (el.querySelectorAll("p").length > 4) {
      el.removeChild(el.querySelectorAll("p")[0]);
    }
  });

  el.appendChild(document.createElement("p"));
  el.appendChild(document.createElement("p"));
  el.appendChild(document.createElement("p"));
  el.appendChild(input);

  input.addEventListener("keyup", () => {
    if (input.value !== "") {
      el.appendChild(button);
    } else {
      el.removeChild(button);
    }
  });
}
