const btn = document.querySelectorAll(".button");
const input = document.querySelector("#user-input");
const result = document.querySelector("#result");
const oddItems = ["%", "+", "-", ".", "*", "/"];

function isOperator(char) {
  return oddItems.includes(char);
}

function addTransition() {
  input.style.color = "rgb(124, 124, 124)";
  input.style.fontSize = "20px";
  result.style.color = "black";
  result.style.fontSize = "28px";
}

function removeTransition() {
  input.style.color = "black";
  input.style.fontSize = "28px";
  result.style.color = "rgb(124, 124, 124)";
  result.style.fontSize = "20px";
}
btn.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.innerHTML === "AC") {
      input.value = "";
      result.value = "";
      removeTransition();
    } else if (e.innerHTML === "C") {
      input.value = input.value.slice(0, -1);
      removeTransition();
    } else if (e.innerHTML === "=") {
      try {
        result.value = eval(input.value);
        addTransition();
      } catch (error) {
        result.value = "Error";
      }
    } else {
      removeTransition();
      const lastChar = input.value.slice(-1);
      const newChar = e.innerHTML;

      if (isOperator(lastChar) && isOperator(newChar)) {
        input.value = input.value.slice(0, -1) + newChar;
      } else if (
        newChar === "." &&
        input.value.includes(".") &&
        input.value
          .split(/[\+\-\*\/]/)
          .pop()
          .includes(".")
      ) {
        return;
      } else {
        input.value += newChar;
        input.scrollLeft = input.scrollWidth;
      }
    }
  });
});







