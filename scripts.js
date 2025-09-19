const runButton = document.getElementById("runButton");
const setStart = document.getElementById("setStart");
const setGoal = document.getElementById("setGoal");
const setWall = document.getElementById("setWall");
const gridSize = document.getElementById("gridSize");
const applySize = document.getElementById("apply");
const container = document.querySelector(".container");

let mode = "wall";

setWall.addEventListener("click", () => mode = "wall");
setStart.addEventListener("click", () => mode = "start");
setGoal.addEventListener("click", () => mode = "goal");

function getGridSize() {
    let size = parseInt(gridSize.value);
    if (size < 3) {
        size = 3;
    }
    if (size > 16) {
        size = 16;
    }
    return size;
}

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

            if (row === 0 && col === 0) {
                box.classList.add("start");
            }
            else if (row === size - 1 && col === size - 1) {
                box.classList.add("goal");
            }

            box.addEventListener("click", () => {
                switch(mode) {
                    case "wall":
                        if (!box.classList.contains("start") && !box.classList.contains("goal")) {
                            box.classList.toggle("wall");
                        }
                        break;
                    case "start":
                        const prevStart = document.querySelector(".start");
                        if (prevStart) {
                            prevStart.classList.remove("start");
                        }
                        box.classList.add("start");
                        box.classList.remove("wall", "goal");
                        break;
                    case "goal":
                        const prevGoal = document.querySelector(".goal");
                        if (prevGoal) {
                            prevGoal.classList.remove("goal");
                        }
                        box.classList.add("goal");
                        box.classList.remove("wall", "start");
                        break;
                }
            });

            container.appendChild(box);
        }
    }
}

function getGridArray() {
    const size = getGridSize();
    const grid = [];

    for (let row = 0; row < size; row++) {
        const r = [];
        for (let col = 0; col < size; col++) {
            const box = document.querySelector(`.box[data-row='${row}'][data-col='${col}']`);
            if (box.classList.contains("start")) {
                r.push("S");
            }
            else if (box.classList.contains("goal")) {
                r.push("G");
            }
            else if (box.classList.contains("wall")) {
                r.push("W");
            }
            else {
                r.push(0);
            }
        }
        grid.push(r);
    }

    return grid;
}

