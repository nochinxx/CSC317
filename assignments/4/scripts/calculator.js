document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll('input[type="button"]');
  const resultElement = document.getElementById("result");
  console.log("Result Element:", resultElement);

  let display = (value) => {
    console.log(value);
    if (resultElement) {
    console.log("Current Result:", resultElement.value);
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
      resultElement.value == "0" ? resultElement.value=value : (resultElement.value += value);
      console.log("Updated Result:", resultElement.value);
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
      ["+", "-", "*", "/", ".", "Enter", "Backspace"].includes(key)
    ) {
      if (key === "Enter") {
        display("="); // Map Enter key to "="
      } else if (key === "Backspace") {
        display("⌫"); // Map Backspace key to "⌫"
      } else if (key==="/"){
        display("÷")
      }  
      else {
        display(key); // Pass the key directly
      }
    }
  });
});
