// Clock Functionality
function updateClock() {
    const clockTime = document.getElementById("clockTime");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    clockTime.innerText = `${hours}:${minutes}:${seconds}`;
  }
  setInterval(updateClock, 1000);
  
  // Game 1: Solve Arithmetic Problems
  let mathProblems = [
    { question: "5 + 7", answer: 12 },
    { question: "10 * 2", answer: 20 },
    { question: "15 - 6", answer: 9 },
    { question: "18 / 3", answer: 6 },
  ];
  let mathIndex = 0;
  
  function displayMathProblem() {
    document.getElementById("mathProblem").innerText =
      mathProblems[mathIndex].question;
  }
  
  document.getElementById("mathSubmit").addEventListener("click", () => {
    const userAnswer = parseInt(document.getElementById("mathAnswer").value, 10);
    if (userAnswer === mathProblems[mathIndex].answer) {
      mathIndex++;
      if (mathIndex < mathProblems.length) {
        displayMathProblem();
      } else {
        alert("Game 1 Complete! Change the clock's text color.");
        document.getElementById("clockTime").style.color = prompt(
          "Enter a color for the clock text:"
        );
        document.getElementById("game1").classList.add("hidden");
        document.getElementById("game2").classList.remove("hidden");
      }
    } else {
      document.getElementById("mathStatus").innerText = "Incorrect. Try again!";
    }
  });
  
  displayMathProblem();
  
  // Game 2: Rearrange Letters
  const words = ["apple", "orange", "banana", "grape"];
  let selectedWord = words[Math.floor(Math.random() * words.length)];
  let shuffledWord = selectedWord
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
  
  document.getElementById("shuffledWord").innerText = shuffledWord;
  
  document.getElementById("rearrangeSubmit").addEventListener("click", () => {
    const userInput = document.getElementById("rearrangedInput").value;
    if (userInput === selectedWord) {
      alert("Game 2 Complete! Choose a background image for the clock.");
      const imageChoice = prompt(
        "Choose an option (1, 2, or 3):\n1. Abstract\n2. Nature\n3. Space"
      );
      const clock = document.getElementById("clock");
      switch (imageChoice) {
        case "1":
          clock.style.backgroundImage = "https://wallpaperaccess.com/full/178834.jpg";
          break;
        case "2":
          clock.style.backgroundImage = "url('nature.jpg')";
          break;
        case "3":
          clock.style.backgroundImage = "url('space.jpg')";
          break;
        default:
          alert("Invalid choice. No changes applied.");
      }
      document.getElementById("game2").classList.add("hidden");
      document.getElementById("game3").classList.remove("hidden");
      generateSudoku();
    } else {
      document.getElementById("rearrangeStatus").innerText = "Incorrect. Try again!";
    }
  });
  
  // Game 3: Sudoku
  const sudokuPuzzle = [
    [1, 0, 0, 4],
    [0, 3, 0, 0],
    [0, 0, 4, 0],
    [2, 0, 0, 3],
  ];
  
  function generateSudoku() {
    const grid = document.getElementById("sudokuGrid");
    sudokuPuzzle.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 4;
        input.value = cell || "";
        input.disabled = !!cell;
        input.dataset.row = rowIndex;
        input.dataset.col = colIndex;
        grid.appendChild(input);
      });
    });
  }
  
  document.getElementById("sudokuSubmit").addEventListener("click", () => {
    const inputs = Array.from(document.querySelectorAll("#sudokuGrid input"));
    const userSolution = inputs.map((input) => parseInt(input.value || "0", 10));
    const isCorrect =
      JSON.stringify(userSolution) ===
      JSON.stringify([1, 2, 3, 4, 3, 4, 1, 2, 4, 1, 2, 3, 2, 3, 4, 1]);
  
    if (isCorrect) {
      alert("Game 3 Complete! Toggle clock mode.");
      document.getElementById("toggleClock").classList.remove("hidden");
    } else {
      document.getElementById("sudokuStatus").innerText =
        "Incorrect solution. Try again!";
    }
  });
  