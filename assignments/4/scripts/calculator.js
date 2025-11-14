document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('input[type="button"]');
  const resultElement = document.getElementById("result");
  let evaluated = false; // global variable to make sure that after an expression is evaluated we clear the calculator
  console.log("Result Element:", resultElement);
  // Function to update the display
  let display = (value) => {
    if (resultElement) {
      console.log("Current Result:", value);
      console.log("Evaluated: ", evaluated);
      if (evaluated) {
        resultElement.value = "0";
        evaluated = false;
      }
      // Clear all
      if (value == "AC") {
        resultElement.value = "0";
        return;
      }
      // Delete last char
      if (value == "⌫") {
        console.log("Delete Last Character");
        if (resultElement.value.length > 1) {
          // Pop the last char
          resultElement.value = resultElement.value.slice(0, -1);
          return;
        }
        // If only one char left, reset to 0
        else if (resultElement.value.length <= 1) {
          resultElement.value = "0";
          return;
        }
      }
      // Evaluate expression
      if (value == "=") {
        console.log("Evaluate Expression");
        let result = evaluateExpression(resultElement.value);
        console.log("Evaluation Result:", result);
        resultElement.value = result;
        return;
      }
      resultElement.value == "0"
        ? (resultElement.value = value)
        : (resultElement.value += value);
      //   console.log("Updated Result:", resultElement.value);
    }
  };

  // Function to evaluate the expression
  let evaluateExpression = (expression) => {
    try {
      if (!expression) return "0";
      // division
      let sanitizedExpression = expression.replace(/÷/g, "/");
      // percentage
      sanitizedExpression = expression.replace(/%/g, "*.01");
      console.log("Sanitized Expression:", sanitizedExpression);
      const result = eval(sanitizedExpression);
      evaluated = true;
      return result;
    } catch (error) {
      console.error("Error evaluating expression:", error);
      return "Error";
    }
  };
  // Add event listeners to all buttons and pass their value to display function
  buttons.forEach((button) => {
    button.addEventListener("click", () => display(button.value));
  });

  // Add keydown event listener for keyboard input
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    // Allow only valid keys (numbers, operators, etc.)
    if (
      (key >= "0" && key <= "9") || // Numbers
      ["+", "-", "*", "/", ".", "=", "%", "Enter", "Backspace"].includes(key)
    ) {
      if (key === "Enter" || key === "=") {
        result = evaluateExpression(resultElement.value);
        resultElement.value = result;
        console.log("Evaluation Result:", result);
      } else if (key === "Backspace") {
        display("⌫"); // Map Backspace key to "⌫"
      } else if (key === "/") {
        display("÷");
      } else {
        display(key); // Pass the key directly
      }
    }
  });
});
