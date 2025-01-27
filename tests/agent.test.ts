import { Agent } from "../src/core/agent";
import { Grid } from "../src/core/grid";
import { Cell } from "../src/core/cell";
import { Virus } from "../src/core/virus";

describe('Agent move method', () => {
    let grid: Grid;
    let cell: Cell;
    let agent: Agent;

    beforeEach(() => {
        grid = new Grid(10, 10);
        cell = new Cell(0, 0);
        agent = Agent.create(0, 0, grid, cell);
    });

    it('should move agent to a new cell', () => {
        const initialPosition = { ...agent.getPosition() };
        agent.move();
        const newPosition = agent.getPosition();

        expect(newPosition).not.toEqual(initialPosition);
        expect(agent.cell).not.toBe(cell);
    });

    it('should update the cell information correctly', () => {
        const initialCell = agent.cell;
        agent.move();
        const newCell = agent.cell;

        expect(initialCell.isOccupied()).toBe(false);
        expect(newCell.isOccupied()).toBe(true);
    });

    it('should not move if no available cells', () => {
        jest.spyOn(grid, 'getAvailableCells').mockReturnValue([]);
        const initialPosition = { ...agent.getPosition() };
        agent.move();
        const newPosition = agent.getPosition();

        expect(newPosition).toEqual(initialPosition);
        expect(agent.cell).toBe(cell);
    });
});

describe('Agent infect method', () => {
    let grid: Grid;
    let agent: Agent;
    let susceptibleAgent: Agent;
    let immuneAgent: Agent;
    let virus: Virus;

    beforeEach(() => {
        virus = new Virus(1, 1, 10, 10);
        grid = new Grid(10, 10);
        agent = Agent.create(0, 0, grid, grid.getCell(0, 0));

        susceptibleAgent = Agent.create(1, 0, grid, grid.getCell(1, 0));
        susceptibleAgent.setState('Susceptible');

        immuneAgent = Agent.create(0, 1, grid, grid.getCell(0, 1));
        immuneAgent.setState('Susceptible');
        immuneAgent.setImmune(true);
    });

    it('should infect susceptible agents', () => {
        jest.spyOn(grid, 'getSurroundingAgents').mockReturnValue([susceptibleAgent, immuneAgent]);
        jest.spyOn(susceptibleAgent, 'toGetInfected');

        agent.infect(virus);

        expect(susceptibleAgent.toGetInfected).toHaveBeenCalled();
        expect(susceptibleAgent.state).toBe('Incubating');
    });

    it('should not infect immune agents', () => {
        jest.spyOn(grid, 'getSurroundingAgents').mockReturnValue([susceptibleAgent, immuneAgent]);
        jest.spyOn(immuneAgent, 'toGetInfected');

        agent.infect(virus);

        expect(immuneAgent.toGetInfected).not.toHaveBeenCalled();
        expect(immuneAgent.state).toBe('Susceptible');
    });

    it('should not infect itself', () => {
        agent.infect(virus);
        
        expect(susceptibleAgent.state).toBe('Incubating');
        expect(agent.state).toBe('Susceptible');
        expect(immuneAgent.state).toBe('Susceptible');
    });
});

describe('Agent updateState method', () => {
    let grid: Grid;
    let agent: Agent;
    let virus: Virus;

    beforeEach(() => {
        virus = new Virus(1, 1, 2, 2);
        grid = new Grid(10, 10);
        agent = Agent.create(0, 0, grid, grid.getCell(0, 0));
        agent.setVirus(virus);
    });

    it('should not update state if agent is dead', () => {
        agent.toDie();
        const initialState = agent.state;
        agent.updateState();
        expect(agent.state).toBe(initialState);
    });

    it('should move agent if not dead', () => {
        const initialPosition = { ...agent.getPosition() };
        agent.updateState();
        const newPosition = agent.getPosition();
        expect(newPosition).not.toEqual(initialPosition);
    });

    it('should transition from incubating to infected', () => {
        agent.setState('Incubating');
        agent.updateState();
        agent.updateState();
        expect(agent.state).toBe('Infected');
    });

    it('should infect surrounding agents when infected', () => {
        const susceptibleAgent = Agent.create(1, 0, grid, grid.getCell(1, 0));
        susceptibleAgent.setState('Susceptible');
        jest.spyOn(grid, 'getSurroundingAgents').mockReturnValue([susceptibleAgent]);
        jest.spyOn(susceptibleAgent, 'toGetInfected');

        agent.setState('Infected');
        agent.updateState();

        expect(susceptibleAgent.toGetInfected).toHaveBeenCalled();
    });

    it('should recover or die after infection period', () => {
        agent.setState('Infected');
        agent.infectionPeriod = virus.getInfectionPeriodDuration();
        jest.spyOn(Math, 'random').mockReturnValue(0.5);

        agent.updateState();

        expect(['Recovered', 'Dead']).toContain(agent.state);
    });
});
