import { AnimationState } from "./animationState";
import { Agent } from "../core/agent";
import { Canvas } from "./canvas";
import { Statistics } from "../core/statistics";

export class UIRendering {
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
    lastUpdateTime: number = 0;
    lastUpdateFrameTime: number = 0;
    updateInterval: number = 1000;
    fps: number = 30;
    agentAnimationStates: Map<Agent, AnimationState>;
    static icon_susceptible: string = "😁";
    static icon_infected: string = "🤢";
    static icon_recovered: string = "😎";
    static icon_dead: string = "💀";
    static icon_incubating: string = "😷";

    constructor(canvas: Canvas, updateInterval: number = 1000, agents: Agent[]) {
        this.canvas = canvas;
        this.ctx = canvas.getCanvas().getContext("2d")!;
        this.updateInterval = updateInterval;
        this.agentAnimationStates = new Map();
        agents.forEach(agent => {
            const { x, y } = agent.getPosition();
            this.agentAnimationStates.set(agent, { prevX: x, prevY: y, targetX: x, targetY: y, lerpProgress: 1, moveStep: 1 / this.fps });
        });
    }

    updateAgentAnimationStates(agent: Agent) {
        const state = this.agentAnimationStates.get(agent);
        if (!state) return;
        state.prevX = state.targetX;
        state.prevY = state.targetY;
        
        const { x, y } = agent.getPosition();
        state.targetX = x;
        state.targetY = y;
        state.lerpProgress = 0;
    }

    public clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.getCanvas().width, this.canvas.getCanvas().height);
    }

    public draw(agents: Agent[]) {
        this.clearCanvas();
        this.canvas.drawGrid();
        const size = this.canvas.getCellSize();
        const padding = this.canvas.getPadding();

        agents.forEach(agent => {
            const state = this.agentAnimationStates.get(agent);
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
        return state === "Susceptible" ? UIRendering.icon_susceptible : state === "Infected" ? UIRendering.icon_infected : state === "Recovered" ? UIRendering.icon_recovered : state === "Incubating" ? UIRendering.icon_incubating : UIRendering.icon_dead;
    }

    updateStatistics(statistics: Statistics) {
        document.getElementById('susceptible-count')!.textContent = statistics.getSusceptibleCount().toString();
        document.getElementById('population-count')!.textContent = statistics.getPopulation().toString();
        document.getElementById('infected-count')!.textContent = statistics.getInfectedCount().toString();
        document.getElementById('recovered-count')!.textContent = statistics.getRecoveredCount().toString();
        document.getElementById('dead-count')!.textContent = statistics.getDeadCount().toString();
        document.getElementById('incubating-count')!.textContent = statistics.getIncubatingCount().toString();
    }

    getLastUpdateTime() {
        return this.lastUpdateTime;
    }

    setLastUpdateTime(time: number) {
        this.lastUpdateTime = time;
    }

    getLastUpdateFrameTime() {
        return this.lastUpdateFrameTime;
    }

    setLastUpdateFrameTime(time: number) {
        this.lastUpdateFrameTime = time;
    }

    getFps() {
        return this.fps;
    }   

    getUpdateInterval() {
        return this.updateInterval;
    }
}