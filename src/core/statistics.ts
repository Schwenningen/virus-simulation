import { Agent } from "./agent";

export class Statistics {
    private population: number = 0;
    private susceptibleCount: number = 0;
    private infectedCount: number = 0;
    private recoveredCount: number = 0;
    private incubatingCount: number = 0;
    private deadCount: number = 0;

    constructor(agents: Agent[]) {
        this.population = agents.length;
        this.susceptibleCount = agents.filter(agent => agent.getState() === 'Susceptible').length;
        this.infectedCount = agents.filter(agent => agent.getState() === 'Infected').length;
        this.recoveredCount = agents.filter(agent => agent.getState() === 'Recovered').length;
        this.incubatingCount = agents.filter(agent => agent.getState() === 'Incubating').length;
        this.deadCount = agents.filter(agent => agent.getState() === 'Dead').length;
    }

    public updateStatistics(states: string[]): void {
        switch (states[0]) {
            case 'Susceptible':
                this.susceptibleCount--;
                break;
            case 'Infected':
                this.infectedCount--;
                break;
            case 'Recovered':
                this.recoveredCount--;
                break;
            case 'Incubating':
                this.incubatingCount--;
                break;
            case 'Dead':
                this.deadCount--;
                break;
        }
        
        switch (states[1]) {
            case 'Susceptible':
                this.susceptibleCount++;
                break;
            case 'Infected':
                this.infectedCount++;
                break;
            case 'Recovered':
                this.recoveredCount++;
                break;
            case 'Incubating':
                this.incubatingCount++;
                break;
            case 'Dead':
                this.deadCount++;
                break;
        }
    }

    public getPopulation(): number {
        return this.population;
    }

    public getSusceptibleCount(): number {
        return this.susceptibleCount;
    }

    public getInfectedCount(): number {
        return this.infectedCount;
    }

    public getRecoveredCount(): number {
        return this.recoveredCount;
    }

    public getIncubatingCount(): number {
        return this.incubatingCount;
    }

    public getDeadCount(): number {
        return this.deadCount;
    }
}
