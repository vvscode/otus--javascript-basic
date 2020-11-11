// Указатель на элемент для отображения времени
const timeEl = document.querySelector("#time");

// Каждую секунду мы выполняем функцию
setInterval(() => {
  // Которая в элементе отрисует текущее время
  timeEl.innerHTML = new Date().toLocaleTimeString();
}, 1000);

// на кнопку <button id="slowBtn">
// мы добавляем обработчик события, который выполняет какую-то операцию долгое время
document.querySelector("#slowBtn").addEventListener("click", function () {
  // noprotect
  for (var i = 0; i < 500000; i++) {
    console.log(i);
  }
});
