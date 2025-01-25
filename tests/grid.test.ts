import { Grid } from '../src/core/grid';
import { Cell } from '../src/core/cell';

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
});