import { Grid } from '../src/core/grid';
import { Cell } from '../src/core/cell';
import { Agent } from '../src/core/agent';
import { Virus } from '../src/core/virus';
describe('Grid', () => {
    it('should create a grid with the correct dimensions and cells', () => {
        const width = 3;
        const height = 3;
        const grid = new Grid(width, height);

        expect(grid.getWidth()).toBe(width);
        expect(grid.getHeight()).toBe(height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = grid.getCell(x, y);
                expect(cell).toBeInstanceOf(Cell);
                expect(cell.getX()).toBe(x);
                expect(cell.getY()).toBe(y);
            }
        }
    });

    it('should return all available cells around a given cell', () => {
        const grid = new Grid(3, 3);
        const cell = grid.getCell(1, 1);
        cell.setAgent(Agent.create(1, 1, grid, cell));

        const availableCells = grid.getAvailableCells(1, 1);

        expect(availableCells.length).toBe(8);
        expect(availableCells).toEqual(
            expect.arrayContaining([
                grid.getCell(0, 0),
                grid.getCell(0, 1),
                grid.getCell(0, 2),
                grid.getCell(1, 0),
                grid.getCell(1, 2),
                grid.getCell(2, 0),
                grid.getCell(2, 1),
                grid.getCell(2, 2)
            ])
        );
    });

    it('should return no available cells if all surrounding cells are occupied', () => {
        const grid = new Grid(3, 3);
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                if (x !== 1 || y !== 1) {
                    grid.getCell(x, y).setAgent(Agent.create(x, y, grid, grid.getCell(x, y)));
                }
            }
        }

        const availableCells = grid.getAvailableCells(1, 1);

        expect(availableCells.length).toBe(0);
    });

    it('should return available cells when one surrounding cell is occupied', () => {
        const grid = new Grid(3, 3);
        grid.getCell(1, 1).setAgent(Agent.create(1, 1, grid, grid.getCell(1, 1)));
        grid.getCell(0, 1).setAgent(Agent.create(0, 1, grid, grid.getCell(0, 1))); 

        const availableCells = grid.getAvailableCells(1, 1);

        expect(availableCells.length).toBe(7);
        expect(availableCells).toEqual(
            expect.arrayContaining([
                grid.getCell(0, 0),
                grid.getCell(0, 2),
                grid.getCell(1, 0),
                grid.getCell(1, 2),
                grid.getCell(2, 0),
                grid.getCell(2, 1),
                grid.getCell(2, 2)
            ])
        );
    });

    it('should return available cells when the agent is on the edge of the grid', () => {
        const grid = new Grid(3, 3);
        grid.getCell(0, 0).setAgent(Agent.create(0, 0, grid, grid.getCell(0, 0)));

        const availableCells = grid.getAvailableCells(0, 0);

        expect(availableCells.length).toBe(3);
        expect(availableCells).toEqual(
            expect.arrayContaining([
                grid.getCell(0, 1),
                grid.getCell(1, 0),
                grid.getCell(1, 1)
            ])
        );
    });

    it('should return all surrounding agents around a given cell', () => {
        const grid = new Grid(3, 3);
        const agent1 = Agent.create(0, 0, grid, grid.getCell(0, 0));
        const agent2 = Agent.create(0, 1, grid, grid.getCell(0, 1));
        grid.getCell(0, 0).setAgent(agent1);
        grid.getCell(0, 1).setAgent(agent2);

        const surroundingAgents = grid.getSurroundingAgents(1, 1);

        expect(surroundingAgents.length).toBe(2);
        expect(surroundingAgents).toEqual(expect.arrayContaining([agent1, agent2]));
    });

    it('should return no agents if all surrounding cells are empty', () => {
        const grid = new Grid(3, 3);

        const surroundingAgents = grid.getSurroundingAgents(1, 1);

        expect(surroundingAgents.length).toBe(0);
    });

    it('should return agents when one surrounding cell is occupied', () => {
        const grid = new Grid(3, 3);
        const agent = Agent.create(0, 1, grid, grid.getCell(0, 1));
        grid.getCell(0, 1).setAgent(agent);

        const surroundingAgents = grid.getSurroundingAgents(1, 1);

        expect(surroundingAgents.length).toBe(1);
        expect(surroundingAgents).toEqual(expect.arrayContaining([agent]));
    });

    it('should return agents when the agent is on the edge of the grid', () => {
        const grid = new Grid(3, 3);
        const agent = Agent.create(0, 1, grid, grid.getCell(0, 1));
        grid.getCell(0, 1).setAgent(agent);

        const surroundingAgents = grid.getSurroundingAgents(0, 0);

        expect(surroundingAgents.length).toBe(1);
        expect(surroundingAgents).toEqual(expect.arrayContaining([agent]));
    });

    it('should return all available cells in the grid', () => {
        const grid = new Grid(3, 3);
        grid.getCell(0, 0).setAgent(Agent.create(0, 0, grid, grid.getCell(0, 0)));
        grid.getCell(1, 1).setAgent(Agent.create(1, 1, grid, grid.getCell(1, 1)));

        const availableCells = grid.getAllAvailableCells();

        expect(availableCells.length).toBe(7);
        expect(availableCells).toEqual(
            expect.arrayContaining([
                grid.getCell(0, 1),
                grid.getCell(0, 2),
                grid.getCell(1, 0),
                grid.getCell(1, 2),
                grid.getCell(2, 0),
                grid.getCell(2, 1),
                grid.getCell(2, 2)
            ])
        );
    });

    it('should return no available cells if all cells are occupied', () => {
        const grid = new Grid(3, 3);
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                grid.getCell(x, y).setAgent(Agent.create(x, y, grid, grid.getCell(x, y)));
            }
        }

        const availableCells = grid.getAllAvailableCells();

        expect(availableCells.length).toBe(0);
    });

    it('should return all cells if none are occupied', () => {
        const grid = new Grid(3, 3);

        const availableCells = grid.getAllAvailableCells();

        expect(availableCells.length).toBe(9);
        expect(availableCells).toEqual(
            expect.arrayContaining([
                grid.getCell(0, 0),
                grid.getCell(0, 1),
                grid.getCell(0, 2),
                grid.getCell(1, 0),
                grid.getCell(1, 1),
                grid.getCell(1, 2),
                grid.getCell(2, 0),
                grid.getCell(2, 1),
                grid.getCell(2, 2)
            ])
        );
    });
});