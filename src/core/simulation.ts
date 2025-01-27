import { Agent } from "./agent";
import { Virus } from "./virus";
import { Canvas } from "../ui/canvas";

export class Simulation {
    agents: Agent[];
    virus: Virus;
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
    running: boolean = false;
    lastUpdateTime: number = 0;
    updateInterval: number = 500;

    constructor(agents: Agent[], virus: Virus, canvas: Canvas) {
        this.agents = agents;
        this.virus = virus;
        this.canvas = canvas;
        this.ctx = this.canvas.getCanvas().getContext("2d")!;
    }

    public update() {
        this.agents.forEach(agent => {
            agent.updateState();
        });
    }

    public draw() {
        this.ctx.clearRect(0, 0, this.canvas.getCanvas().width, this.canvas.getCanvas().height);
        this.canvas.drawGrid();

        this.agents.forEach(agent => {
            const { x, y } = agent.getPosition();
            this.ctx.fillStyle = this.getColor(agent.getState());
            this.ctx.fillRect(
                Math.round(x * this.canvas.getCellSize()) + this.canvas.getPadding(),
                Math.round(y * this.canvas.getCellSize()) + this.canvas.getPadding(),
                this.canvas.getCellSize(), this.canvas.getCellSize()
            );
        });
    }

    public getColor(state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' | 'Incubating'): string {
        return state === "Susceptible" ? "blue" : state === "Infected" ? "red" : state === "Recovered" ? "green" : state === "Incubating" ? "yellow" : "gray";
    }

    public loop = (timestamp: number) => {
        if (!this.running) return;
        if (timestamp - this.lastUpdateTime >= this.updateInterval) {
            this.lastUpdateTime = timestamp;
            this.update();
            this.draw();
        }
        if (!this.agents.some(agent => agent.getState() === 'Infected' || agent.getState() === 'Incubating')) {
            this.stop();
        }
        requestAnimationFrame(this.loop);
    };

    public start() {
        this.running = true;
        requestAnimationFrame(this.loop);
    }

    public stop() {
        this.running = false;
    }
}
