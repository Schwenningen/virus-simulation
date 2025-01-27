import { Cell } from "./cell";
import { Grid } from "./grid";

export class Agent {
    id: number;
    position: { x: number; y: number };
    state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead';
    readonly infectionChance: number;
    readonly recoveryChance: number;
    readonly deathChance: number;
    readonly incubationTime: number;
    readonly infectionDuration: number;
    immune: boolean;
    timeInfected: number = 0;
    grid: Grid;
    cell: Cell;

    constructor(
        id: number,
        x: number,
        y: number,
        infectionChance: number,
        recoveryChance: number,
        deathChance: number,
        incubationTime: number,
        infectionDuration: number,
        grid: Grid,
        cell: Cell,
        state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' = 'Susceptible',
        immune: boolean = false
    ) {
        this.id = id;
        this.position = {x, y};
        this.state = state;
        this.infectionChance = infectionChance;
        this.recoveryChance = recoveryChance;
        this.deathChance = deathChance;
        this.incubationTime = incubationTime;
        this.infectionDuration = infectionDuration;
        this.immune = immune;
        this.grid = grid;
        this.cell = cell;
    }

    public move() {
        const availableCells = this.grid.getAvailableCells(this.position.x, this.position.y);
        if (availableCells.length > 0) {
            const newCell = availableCells[Math.floor(Math.random() * availableCells.length)];
            this.cell.removeAgent();
            this.position = { x: newCell.getX(), y: newCell.getY() };
            this.cell = newCell;
            this.cell.setAgent(this);
        }
    }

    public toGetInfected() {
        if (this.state === 'Susceptible' && !this.immune && Math.random() < this.infectionChance) {
            this.state = 'Infected';
            this.timeInfected = 0;
        }
    }

    public toRecover() {
        if (this.state === 'Infected') {
            this.state = 'Recovered';
            this.immune = true;
        }
    }

    public infect() {
        const agentsToInfect = this.grid.getSurroundingAgents(this.position.x, this.position.y);
        agentsToInfect.forEach(agent => {
            if (agent.state === 'Susceptible' && !agent.immune) {
                agent.toGetInfected();
            }
        });
    }

    public getState(): 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' {
        return this.state;
    }

    public setState(state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead'): void {
        this.state = state;
    }

    public getPosition(): { x: number; y: number } {
        return this.position;
    }

    public setPosition(position: { x: number; y: number }): void {
        this.position = position;
    }

    public getInfectionChance(): number {
        return this.infectionChance;
    }

    public getRecoveryChance(): number {
        return this.recoveryChance;
    }

    public getDeathChance(): number {
        return this.deathChance;
    }

    public getIncubationTime(): number {
        return this.incubationTime;
    }

    public getInfectionDuration(): number {
        return this.infectionDuration;
    }

    public getTimeInfected(): number {
        return this.timeInfected;
    }

    public getGrid(): Grid {
        return this.grid;
    }

    public isImmune(): boolean {
        return this.immune;
    }   

    public setImmune(immune: boolean): void {
        this.immune = immune;
    }

    public isInfected(): boolean {
        return this.state === 'Infected';
    }

    public isRecovered(): boolean {
        return this.state === 'Recovered';
    }

    public isDead(): boolean {
        return this.state === 'Dead';
    }
}
