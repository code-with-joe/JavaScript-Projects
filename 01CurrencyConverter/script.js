const container = document.querySelector(".container");
const h1 = document.querySelector("h1");
const label = document.querySelectorAll("label");
const input = document.querySelectorAll("input");
const selectField = document.querySelectorAll("select");
const midHeader = document.querySelector(".mid");
const midFooter = document.querySelector(".mid1");
const button = document.querySelector("button");
const darkMode = document.querySelector(".dark-mode");
const li = document.querySelector("li");
const select = document.getElementById("Currency");
const toSelect = document.getElementById("toCurrency");
const write = document.getElementById("write");
const read = document.getElementById("read");
let flag = 0;
const currency = "algo";
document.addEventListener("DOMContentLoaded", () => {
  fetch(
    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
  )
    .then((res) => res.json())
    .then((result) => {
      function addOption() {
        const currencies = Object.keys(result[currency]);

        currencies.forEach((currencyCode) => {
          const newOption = document.createElement("option");
          const newToOption = document.createElement("option");
          newOption.value = currencyCode;
          newToOption.value = currencyCode;
          newOption.text = `${currencyCode.toUpperCase()}`;
          newToOption.text = `${currencyCode.toUpperCase()}`;
          toSelect.appendChild(newToOption);
          select.appendChild(newOption);
        });
      }

      addOption();

      button.addEventListener("click", () => {
        fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${select.value.toLowerCase()}.json`
        )
          .then((res) => res.json())
          .then((output) => {
            const userInput = select.value.toLowerCase();
            const userOutput = toSelect.value.toLowerCase();
            const a = output[userInput][userOutput];
            const b = write.value * a;
            read.value = b.toFixed(2);
          });
      });
    });
});

setInterval(() => {
  button.textContent = `Convert ${select.value.toUpperCase()} to ${toSelect.value.toUpperCase()}`;
});

darkMode.addEventListener("click", () => {
  if (flag == 0) {
    li.style.transform = "translateX(35.3px)";
    li.style.backgroundColor = "rgb(218, 93, 218)";
    darkMode.style.border = "2px solid rgb(0, 221, 255)";
    darkMode.style.backgroundImage = `url("https://img.freepik.com/premium-photo/background-cute-clouds-starlit-skies_950053-4429.jpg")`;
    container.style.backgroundColor = "#0A1828";
    h1.style.color = "#fff";
    midHeader.style.backgroundColor = "#F0C420";
    midFooter.style.backgroundColor = "#F0C420";
    label.forEach((e) => {
      e.style.color = "#fff";
    });
    input.forEach((e) => {
      e.style.color = "#fff";
    });
    selectField.forEach((e) => {
      e.style.color = "#fff";
    });
    write.style.setProperty("--placeholder-color", "#fff");
    const css = `#write::placeholder { color: var(--placeholder-color); }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    button.style.color = "#fff";
    flag = 1;
  } else {
    li.style.transform = "translateX(0px)";
    li.style.backgroundColor = "#fff";
    darkMode.style.border = "2px solid #ffb302";
    darkMode.style.backgroundImage = `url("https://img.freepik.com/premium-vector/blue-sky-with-sun-paper-art-style_71374-1249.jpg?w=740")`;
    container.style.backgroundColor = "#fff";
    h1.style.color = "#000";
    midHeader.style.backgroundColor = "rgb(0, 255, 247)";
    midFooter.style.backgroundColor = "rgb(0, 255, 247)";
    label.forEach((e) => {
      e.style.color = "#000";
    });
    input.forEach((e) => {
      e.style.color = "#000";
    });
    selectField.forEach((e) => {
      e.style.color = "#000";
    });
    write.style.setProperty("--placeholder-color", "#000");
    const css = `#write::placeholder { color: var(--placeholder-color); }`;
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    button.style.color = "#000";
    flag = 0;
  }
});
