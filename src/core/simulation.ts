import { Agent } from "./agent";
import { Virus } from "./virus";
import { Canvas } from "../ui/canvas";
import { UIRendering } from "../ui/uiRendering";
import { Statistics } from "./statistics";

export class Simulation {
    agents: Agent[];
    virus: Virus;
    uiRendering: UIRendering;
    running: boolean = false;
    end: boolean = false;
    updateInterval: number = 1000;
    statistics: Statistics;

    constructor(agents: Agent[], virus: Virus, canvas: Canvas, updateInterval: number = 1000) {
        this.agents = agents;
        this.virus = virus;
        this.uiRendering = new UIRendering(canvas, updateInterval, this.agents);
        this.statistics = new Statistics(this.agents);
    }

    public update() {
        this.agents.forEach(agent => {
            agent.updateState();
            this.statistics.updateStatistics(this.agents);
            this.uiRendering.updateStatistics(this.statistics);
            this.uiRendering.updateAgentAnimationStates(agent);
        });
    }

    public loop = (timestamp: number) => {
        if (!this.running) return;
        if (timestamp - this.uiRendering.getLastUpdateTime() >= this.uiRendering.getUpdateInterval()) {
            this.uiRendering.setLastUpdateTime(timestamp);
            this.update();
        }
        if (timestamp - this.uiRendering.getLastUpdateFrameTime() >= (this.uiRendering.getUpdateInterval() / this.uiRendering.getFps())) {
            this.uiRendering.setLastUpdateFrameTime(timestamp);
            this.uiRendering.draw(this.agents);
        }
        if (!this.agents.some(agent => agent.getState() === 'Infected' || agent.getState() === 'Incubating')) {
            this.end = true;
            this.uiRendering.draw(this.agents);
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

    getUiRendering() {
        return this.uiRendering;
    }
}
