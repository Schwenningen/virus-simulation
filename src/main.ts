import { Simulation } from "./core/simulation";
import { Canvas } from "./ui/canvas";
import { Grid } from "./core/grid";
import { Virus } from "./core/virus";
import { Agent } from "./core/agent";

function generateAgents(
    count: number, 
    state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' | 'Incubating', 
    incubationPeriod: number,
    infectionPeriod: number,
    immune: boolean,
    grid: Grid, 
    virus: Virus
): Agent[] {
    const agents: Agent[] = [];
    const availableCells = grid.getAllAvailableCells();

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cell = availableCells[randomIndex];
        agents.push(new Agent(cell.getX(), cell.getY(), state, incubationPeriod, infectionPeriod, immune, grid, cell, virus));
    }

    return agents;
}

const canvas = new Canvas(40, 20, 50);
if (!canvas) {
    console.error("Canvas not created");
}

const gridContainer = document.getElementById("grid-container")
if (!gridContainer) {
    console.error("Grid container not found");
}
gridContainer?.appendChild(canvas.getCanvas())


const grid = new Grid(40, 20);
const virus = new Virus(1, 0.1, 30, 30);

const agents: Agent[] = generateAgents(80, 'Susceptible', 0, 0, false, grid, virus);
agents.push(...generateAgents(2, 'Infected', 0, 0, false, grid, virus));

const simulation = new Simulation(agents, virus, canvas);
simulation.start();