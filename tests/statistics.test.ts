import { Agent } from "../src/core/agent";
import { Statistics } from "../src/core/statistics";

describe('Statistics', () => {
    let agents: Agent[];

    beforeEach(() => {
        agents = [
            { getState: () => 'Susceptible' } as Agent,
            { getState: () => 'Infected' } as Agent,
            { getState: () => 'Recovered' } as Agent,
            { getState: () => 'Incubating' } as Agent,
            { getState: () => 'Dead' } as Agent,
            { getState: () => 'Susceptible' } as Agent,
        ];
    });

    it('should correctly count susceptible agents', () => {
        const stats = new Statistics(agents);
        expect(stats.getSusceptibleCount()).toBe(2);
    });

    it('should correctly count infected agents', () => {
        const stats = new Statistics(agents);
        expect(stats.getInfectedCount()).toBe(1);
    });

    it('should correctly count recovered agents', () => {
        const stats = new Statistics(agents);
        expect(stats.getRecoveredCount()).toBe(1);
    });

    it('should correctly count incubating agents', () => {
        const stats = new Statistics(agents);
        expect(stats.getIncubatingCount()).toBe(1);
    });

    it('should correctly count dead agents', () => {
        const stats = new Statistics(agents);
        expect(stats.getDeadCount()).toBe(1);
    });

    it('should update statistics when an agent changes state', () => {
        const stats = new Statistics(agents);
        stats.updateStatistics(['Susceptible', 'Infected']);
        expect(stats.getSusceptibleCount()).toBe(1);
        expect(stats.getInfectedCount()).toBe(2);
    });

    it('should update statistics when an agent recovers', () => {
        const stats = new Statistics(agents);
        stats.updateStatistics(['Infected', 'Recovered']);
        expect(stats.getInfectedCount()).toBe(0);
        expect(stats.getRecoveredCount()).toBe(2);
    });

    it('should update statistics when an agent dies', () => {
        const stats = new Statistics(agents);
        stats.updateStatistics(['Infected', 'Dead']);
        expect(stats.getInfectedCount()).toBe(0);
        expect(stats.getDeadCount()).toBe(2);
    });
});
