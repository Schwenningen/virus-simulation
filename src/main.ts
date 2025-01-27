import { Canvas } from "./ui/canvas";

const canvas = new Canvas(40, 20, 80);
if (!canvas) {
    console.error("Canvas not created");
}

const gridContainer = document.getElementById("grid-container")
if (!gridContainer) {
    console.error("Grid container not found");
}

gridContainer?.appendChild(canvas.getCanvas())
