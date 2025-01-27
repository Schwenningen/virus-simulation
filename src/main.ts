import { SimulationManager } from "./core/simulationManager";

let simulationManager: SimulationManager = new SimulationManager();

export function createSimulation() {
    if (simulationManager.getSimulation() !== null) {
        simulationManager.stopSimulation();
        simulationManager.getSimulation()!.getUiRendering()!.clearCanvas();
        const canvasElement = document.querySelector('canvas');
        if (canvasElement) {
            canvasElement.remove();
        }
    }
    simulationManager.createSimulation();
    document.getElementById('start-simulation-button')!.textContent = 'Start Simulation';
}

export function toggleSimulation() {
    if (simulationManager.getSimulation()!.getRunning()) {
        simulationManager.stopSimulation();
        document.getElementById('start-simulation-button')!.textContent = 'Start Simulation';
    } else {
        simulationManager.startSimulation();
        document.getElementById('start-simulation-button')!.textContent = 'Stop Simulation';
    }
}