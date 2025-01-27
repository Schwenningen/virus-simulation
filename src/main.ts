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

function getInputValues() {
    const fieldWidth = (document.getElementById('field-width-input') as HTMLInputElement).value;
    const fieldHeight = (document.getElementById('field-height-input') as HTMLInputElement).value;
    const populationSize = (document.getElementById('population-size-value') as HTMLInputElement).textContent ?? '0';
    const infectionChance = (document.getElementById('infection-chance-value') as HTMLInputElement).textContent?.replace('%', '') ?? '0';
    const recoveryChance = (document.getElementById('recovery-chance-value') as HTMLInputElement).textContent?.replace('%', '') ?? '0';
    const incubationPeriod = (document.getElementById('incubation-period-value') as HTMLInputElement).textContent ?? '0';
    const infectionPeriod = (document.getElementById('infection-period-value') as HTMLInputElement).textContent ?? '0';

    return {
        fieldWidth: parseInt(fieldWidth),
        fieldHeight: parseInt(fieldHeight),
        populationSize: parseInt(populationSize),
        infectionChance: parseFloat(infectionChance),
        recoveryChance: parseFloat(recoveryChance),
        incubationPeriod: parseInt(incubationPeriod),
        infectionPeriod: parseInt(infectionPeriod)
    };
}

function initCanvas() {
    const canvas = new Canvas(40, 20, 50);
    if (!canvas) {
        console.error("Canvas not created");
    }
    const gridContainer = document.getElementById("grid-container")
    if (!gridContainer) {
        console.error("Grid container not found");
    }
    gridContainer?.appendChild(canvas.getCanvas())
    return canvas;
}

//const inputValues = getInputValues();
const canvas = initCanvas();
const grid = new Grid(40, 20);
const virus = new Virus(1, 0.1, 30, 30);

const agents: Agent[] = generateAgents(40, 'Susceptible', 0, 0, false, grid, virus);
agents.push(...generateAgents(2, 'Infected', 0, 0, false, grid, virus));

let simulation = new Simulation(agents, virus, canvas, 500);
let simulationRunning = false;

export function toggleSimulation() {
    if (simulationRunning) {
        simulation.stop();
        simulationRunning = false;
        document.getElementById('start-simulation-button')!.textContent = 'Start Simulation';
    } else {
        simulation.start();
        simulationRunning = true;
        document.getElementById('start-simulation-button')!.textContent = 'Stop Simulation';
    }
}