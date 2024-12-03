const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

const updateDisplay = () => {
  display.value = output;
};

const clearOutput = () => {
  output = "";
  updateDisplay();
};

const deleteLastCharacter = () => {
  output = output.slice(0, -1);
  updateDisplay();
};

const appendToOutput = (btnValue) => {
  if (output === "" && specialChars.includes(btnValue)) return;
  output += btnValue;
  updateDisplay();
};

const calculateResult = () => {
  try {
    // Replace percentage with division by 100
    const sanitizedOutput = output.replace(/%/g, "/100");
    // Use Function constructor for safer evaluation
    const result = new Function(`return ${sanitizedOutput}`)();
    output = result.toString();
  } catch (error) {
    output = "Error";
  }
  updateDisplay();
};

const calculate = (btnValue) => {
  display.focus();
  switch (btnValue) {
    case "=":
      if (output) calculateResult();
      break;
    case "AC":
      clearOutput();
      break;
    case "DEL":
      deleteLastCharacter();
      break;
    default:
      appendToOutput(btnValue);
      break;
  }
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});