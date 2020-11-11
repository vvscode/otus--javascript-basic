const data = {
  name: "Bob",
  age: 18,
};

function alertName() {
  alert(data.name);
}
window.alertName = alertName; // это нужно для `onclick="alertName()"`

function alertAge() {
  alert(data.age);
}

function drawDataViaInnerHTML(el, data) {
  el.innerHTML = `<div>
    <h1 onclick="alertName()">${data.name}</h1>
    <hr />
    <h2>${data.age}</h2>
  </div>`;

  el.querySelector("h2").addEventListener("click", alertAge);
}

function drawDataViaCreateElement(el, data) {
  const div = document.createElement("div");

  const h1 = document.createElement("h1");
  h1.innerText = data.name;
  h1.addEventListener("click", alertName);

  const h2 = document.createElement("h2");
  h2.innerText = data.age;
  h2.onclick = alertAge;

  const hr = document.createElement("hr");

  div.appendChild(h1);
  div.appendChild(hr);
  div.appendChild(h2);
  el.appendChild(div);
}

drawDataViaInnerHTML(document.querySelector("#container1"), data);
drawDataViaCreateElement(document.getElementById("container2"), data);
