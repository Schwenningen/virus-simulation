import { Agent } from "./agent";
import { Virus } from "./virus";
import { Canvas } from "../ui/canvas";
import { AnimationState } from "./animationState";
import { Statistics } from "./statistics";

export class Simulation {
    agents: Agent[];
    virus: Virus;
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
    running: boolean = false;
    end: boolean = false;
    lastUpdateTime: number = 0;
    lastUpdateFrameTime: number = 0;
    updateInterval: number = 1000;
    fps: number = 30;
    agentStates: Map<Agent, AnimationState>;
    statistics: Statistics;
    static icon_susceptible: string = "😁";
    static icon_infected: string = "🤢";
    static icon_recovered: string = "😎";
    static icon_dead: string = "💀";
    static icon_incubating: string = "😷";

    constructor(agents: Agent[], virus: Virus, canvas: Canvas, updateInterval: number = 1000, fps: number = 30) {
        this.agents = agents;
        this.virus = virus;
        this.canvas = canvas;
        this.updateInterval = updateInterval;
        this.ctx = this.canvas.getCanvas().getContext("2d")!;
        this.fps = fps;

        this.agentStates = new Map();
        this.agents.forEach(agent => {
            const { x, y } = agent.getPosition();
            this.agentStates.set(agent, { prevX: x, prevY: y, targetX: x, targetY: y, lerpProgress: 1, moveStep: 1 / fps });
        });
        this.statistics = new Statistics(this.agents);
    }

    public update() {
        this.agents.forEach(agent => {
            const state = this.agentStates.get(agent);
            if (!state) return;
            state.prevX = state.targetX;
            state.prevY = state.targetY;

            const agentState = agent.getState();
            agent.updateState();
            this.statistics.updateStatistics([agentState, agent.getState()]);

            const { x, y } = agent.getPosition();
            state.targetX = x;
            state.targetY = y;
            state.lerpProgress = 0;
        });
    }

    public clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.getCanvas().width, this.canvas.getCanvas().height);
    }

    public draw() {
        this.clearCanvas();
        this.canvas.drawGrid();
        const size = this.canvas.getCellSize();
        const padding = this.canvas.getPadding();

        this.agents.forEach(agent => {
            const state = this.agentStates.get(agent);
            if (!state) return;
            state.lerpProgress = Math.min(state.lerpProgress + 0.1, 1);

            const x = state.prevX + (state.targetX - state.prevX) * state.lerpProgress;
            const y = state.prevY + (state.targetY - state.prevY) * state.lerpProgress;
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
        }
        if (timestamp - this.lastUpdateFrameTime >= (this.updateInterval / this.fps)) {
            this.lastUpdateFrameTime = timestamp;
            this.draw();
        }
        if (!this.agents.some(agent => agent.getState() === 'Infected' || agent.getState() === 'Incubating')) {
            this.end = true;
            this.draw();
            this.stop();
        }
        requestAnimationFrame(this.loop);
    };

    public start() {
        if (this.end) return;
        this.running = true;
        requestAnimationFrame(this.loop);
    }

    public stop() {
        this.running = false;
    }

    getRunning() {
        return this.running;
    }

    getStatistics() {
        return this.statistics;
    }
}
