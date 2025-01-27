import { Cell } from "./cell";
import { Grid } from "./grid";
import { Virus } from "./virus";

export class Agent {
    private static nextId: number = 0;
    id: number;
    position: { x: number; y: number };
    state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' | 'Incubating' = 'Susceptible';
    incubationPeriod: number = 0;
    infectionPeriod: number = 0;
    immune: boolean = false;
    readonly grid: Grid;
    cell: Cell;
    virus: Virus | null = null;

    constructor(
        x: number,
        y: number,
        state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' | 'Incubating' = 'Susceptible',
        incubationPeriod: number = 0,
        infectionPeriod: number = 0,
        immune: boolean = false,
        grid: Grid,
        cell: Cell,
        virus: Virus | null = null
    ) {
        this.id = Agent.nextId++;
        this.position = {x, y};
        this.state = state;
        this.incubationPeriod = incubationPeriod;
        this.infectionPeriod = infectionPeriod;
        this.immune = immune;
        this.grid = grid;
        this.cell = cell;
        this.virus = virus;
        cell.setAgent(this);
    }

    static create(x: number, y: number, grid: Grid, cell: Cell): Agent {
        const agent = new Agent(x, y, 'Susceptible', 0, 0, false, grid, cell, null);
        cell.setAgent(agent);
        return agent;
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

    public toGetInfected(virus: Virus) {
        if (this.virus) {
            if (this.state === 'Susceptible' && !this.immune && Math.random() < virus.getInfectionChance()) {
                this.state = 'Incubating';
                this.incubationPeriod = 0;
                this.infectionPeriod = 0;
                this.virus = virus;
            }
        }
    }

    public toRecover() {
        if (this.state === 'Infected') {
            this.state = 'Recovered';
            this.incubationPeriod = 0;
            this.infectionPeriod = 0;
            this.virus = null;
            this.immune = true;
        }
    }

    public toDie() {
        if (this.state === 'Infected') {
            this.state = 'Dead';
            this.incubationPeriod = 0;
            this.infectionPeriod = 0;
            this.virus = null;
        }
    }

    public infect(virus: Virus) {
        const agentsToInfect = this.grid.getSurroundingAgents(this.position.x, this.position.y);
        agentsToInfect.forEach(agent => {
            if (agent.state === 'Susceptible' && !agent.immune) {
                agent.toGetInfected(virus);
            }
        });
    }
    
    public updateState() {
        if (this.isDead()) return;
        this.move();

        if (this.isIncubating()) {
            this.incubationPeriod++;
            if (this.virus) {
                if (this.incubationPeriod >= this.virus.getIncubationPeriodDuration()) {
                    this.setState('Infected');
                    this.infectionPeriod = 0;
                    this.incubationPeriod = 0;
                }
            }
        }
        
        if (this.isInfected()) {
            if (this.virus) {
                this.infect(this.virus);
                this.infectionPeriod++;
                if (this.infectionPeriod >= this.virus.getInfectionPeriodDuration()) {
                    if (Math.random() < this.virus.getRecoveryChance()) {
                        this.toRecover();
                    } else {
                        this.toDie();
                    }
                }
            }
        }
    }

    public getState(): 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' | 'Incubating' {
        return this.state;
    }

    public setState(state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' | 'Incubating'): void {
        this.state = state;
    }

    public getPosition(): { x: number; y: number } {
        return this.position;
    }

    public setPosition(position: { x: number; y: number }): void {
        this.position = position;
    }

    public getInfectionPeriod(): number {
        return this.infectionPeriod;
    }

    public setInfectionPeriod(infectionPeriod: number): void {
        this.infectionPeriod = infectionPeriod;
    }

    public getIncubationPeriod(): number {
        return this.incubationPeriod;
    }

    public setIncubationPeriod(incubationPeriod: number): void {
        this.incubationPeriod = incubationPeriod;
    }

    public getGrid(): Grid {
        return this.grid;
    }

    public isImmune(): boolean {
        return this.immune;
    }   

    public getVirus(): Virus | null {
        return this.virus;
    }

    public setVirus(virus: Virus | null): void {
        this.virus = virus;
    }

    public getCell(): Cell {
        return this.cell;
    }

    public setCell(cell: Cell): void {
        this.cell = cell;
    }   

    public setImmune(immune: boolean): void {
        this.immune = immune;
    }

    public isSusceptible(): boolean {
        return this.state === 'Susceptible';
    }

    public isInfected(): boolean {
        return this.state === 'Infected';
    }

    public isRecovered(): boolean {
        return this.state === 'Recovered';
    }

    public isIncubating(): boolean {
        return this.state === 'Incubating';
    }

    public isDead(): boolean {
        return this.state === 'Dead';
    }
}
