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
    static icon_susceptible: string = "😁";
    static icon_infected: string = "🤢";
    static icon_recovered: string = "😎";
    static icon_dead: string = "💀";
    static icon_incubating: string = "😷";

    constructor(agents: Agent[], virus: Virus, canvas: Canvas, updateInterval: number = 1000) {
        this.agents = agents;
        this.virus = virus;
        this.canvas = canvas;
        this.updateInterval = updateInterval;
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
        const size = this.canvas.getCellSize();
        const padding = this.canvas.getPadding();

        this.agents.forEach(agent => {
            const { x, y } = agent.getPosition();
            this.ctx.font = `${size / 1.2}px Arial`;
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(
                this.getIcon(agent.getState()), 
                Math.round(x * size) + padding + size / 2, 
                Math.round(y * size) + padding + size / 2 + size / 16
            );
        });
    }

    getIcon(state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' | 'Incubating'): string {
        return state === "Susceptible" ? Simulation.icon_susceptible : state === "Infected" ? Simulation.icon_infected : state === "Recovered" ? Simulation.icon_recovered : state === "Incubating" ? Simulation.icon_incubating : Simulation.icon_dead;
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
