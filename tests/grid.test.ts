import { Grid } from '../src/core/grid';
import { Cell } from '../src/core/cell';
import { Agent } from '../src/core/agent';

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
        cell.setAgent(new Agent(1, 1, 1, 1, 1, 1, 1, 1, 1, grid, cell));

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
                    grid.getCell(x, y).setAgent(new Agent(1, 1, 1, 1, 1, 1, 1, 1, 1, grid, grid.getCell(x, y)));
                }
            }
        }

        const availableCells = grid.getAvailableCells(1, 1);

        expect(availableCells.length).toBe(0);
    });

    it('should return available cells when one surrounding cell is occupied', () => {
        const grid = new Grid(3, 3);
        grid.getCell(1, 1).setAgent(new Agent(1, 1, 1, 1, 1, 1, 1, 1, 1, grid, grid.getCell(1, 1)));
        grid.getCell(0, 1).setAgent(new Agent(1, 1, 1, 1, 1, 1, 1, 1, 1, grid, grid.getCell(0, 1))); 

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
        grid.getCell(0, 0).setAgent(new Agent(1, 1, 1, 1, 1, 1, 1, 1, 1, grid, grid.getCell(0, 0)));

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
});