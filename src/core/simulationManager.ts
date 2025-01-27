import { Simulation } from "./simulation";
import { Canvas } from "../ui/canvas";
import { Grid } from "./grid";
import { Virus } from "./virus";
import { Agent } from "./agent";

export class SimulationManager {
    private simulation: Simulation | null = null;

    constructor() {}

    public createSimulation() {
        const inputValues = SimulationManager.getInputValues();
        const canvas = SimulationManager.initCanvas(inputValues.fieldWidth, inputValues.fieldHeight);
        const grid = new Grid(inputValues.fieldWidth, inputValues.fieldHeight);
        const virus = new Virus(inputValues.infectionChance / 100, inputValues.recoveryChance / 100, inputValues.incubationPeriod, inputValues.infectionPeriod);
    
        const agents: Agent[] = [];
        agents.push(...SimulationManager.generateAgents(inputValues.susceptiblePopulation, 'Susceptible', 0, 0, false, grid, virus));
        agents.push(...SimulationManager.generateAgents(inputValues.infectedPopulation, 'Infected', 0, 0, false, grid, virus));
    
        this.simulation = new Simulation(agents, virus, canvas, 1000);
    }

    public static initCanvas(fieldWidth: number, fieldHeight: number) {
        const canvas = new Canvas(fieldWidth, fieldHeight, 4);
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

    public static generateAgents(
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

    public static getInputValues() {
        const fieldWidth = (document.getElementById('field-width-input') as HTMLInputElement).value;
        const fieldHeight = (document.getElementById('field-height-input') as HTMLInputElement).value;
        const susceptiblePopulation = (document.getElementById('susceptible-population-value') as HTMLInputElement).textContent ?? '0';
        const infectedPopulation = (document.getElementById('infected-population-value') as HTMLInputElement).textContent ?? '0';
        const infectionChance = (document.getElementById('infection-chance-value') as HTMLInputElement).textContent?.replace('%', '') ?? '0';
        const recoveryChance = (document.getElementById('recovery-chance-value') as HTMLInputElement).textContent?.replace('%', '') ?? '0';
        const incubationPeriod = (document.getElementById('incubation-period-value') as HTMLInputElement).textContent ?? '0';
        const infectionPeriod = (document.getElementById('infection-period-value') as HTMLInputElement).textContent ?? '0';
    
        return {
            fieldWidth: parseInt(fieldWidth),
            fieldHeight: parseInt(fieldHeight),
            susceptiblePopulation: parseInt(susceptiblePopulation),
            infectedPopulation: parseInt(infectedPopulation),
            infectionChance: parseFloat(infectionChance),
            recoveryChance: parseFloat(recoveryChance),
            incubationPeriod: parseInt(incubationPeriod),
            infectionPeriod: parseInt(infectionPeriod)
        };
    }

    public startSimulation() {
        if (this.simulation) {
            this.simulation.start();
        }
    }

    public stopSimulation() {
        if (this.simulation) {
            this.simulation.stop();
        }
    }

    public getSimulation(): Simulation | null {
        return this.simulation;
    }
}

