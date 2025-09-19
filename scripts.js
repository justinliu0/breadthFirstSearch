let mode = "wall";

const runButton = document.getElementById("runButton");
const setStart = document.getElementById("setStart");
const setGoal = document.getElementById("setGoal");
const setWall = document.getElementById("setWall");
const gridSize = document.getElementById("gridSize");
const applySize = document.getElementById("apply");
const container = document.querySelector(".container");

setWall.addEventListener("click", () => mode = "wall");
setStart.addEventListener("click", () => mode = "start");
setGoal.addEventListener("click", () => mode = "goal");

function createGrid(size) {
    container.innerHTML = "";
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    container.style.gridTemplateRows = `repeat(${size}, 50px)`;
    container.style.gap = "4px";

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const box = document.createElement("div");
            box.classList.add("box");
            box.dataset.row = row;
            box.dataset.col = col;
            box.style.width = "50px";
            box.style.height = "50px";
            box.style.border = "1px solid #000";
            box.style.backgroundColor = "#eee";

            if (row === 0 && col === 0) {
                box.classList.add("start");
                box.style.backgroundColor = "green";
            } else if (row === size - 1 && col === size - 1) {
                box.classList.add("goal");
                box.style.backgroundColor = "red";
            }

            box.addEventListener("click", () => {
                switch(mode) {
                    case "wall":
                        box.style.backgroundColor = box.style.backgroundColor === "black" ? "#eee" : "black";
                        break;
                    case "start":
                        const prevStart = document.querySelector(".start");
                        if (prevStart) {
                            prevStart.classList.remove("start");
                            prevStart.style.backgroundColor = "#eee";
                        }
                        box.classList.add("start");
                        box.style.backgroundColor = "green";
                        break;
                    case "goal":
                        const prevGoal = document.querySelector(".goal");
                        if (prevGoal) {
                            prevGoal.classList.remove("goal");
                            prevGoal.style.backgroundColor = "#eee";
                        }
                        box.classList.add("goal");
                        box.style.backgroundColor = "red";
                        break;
                }
            });

            container.appendChild(box);
        }
    }
}

createGrid(parseInt(gridSize.value));

applySize.addEventListener("click", () => {
    let size = parseInt(gridSize.value);
    if (size < 3) size = 3;
    if (size > 16) size = 16;
    createGrid(size);
});
