import { Agent } from "./agent";

export class Cell {
    private readonly x: number;
    private readonly y: number;
    private agent: Agent | null = null;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getAgent(): Agent | null {
        return this.agent;
    }

    public setAgent(agent: Agent): void {
        this.agent = agent;
    }

    public removeAgent(): void {
        this.agent = null;
    }

    public isOccupied(): boolean {
        return this.agent !== null;
    }
}