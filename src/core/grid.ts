import { Cell } from "./cell";
import { Agent } from "./agent";

export class Grid {
    private readonly width: number;
    private readonly height: number;
    private cells: Cell[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => new Cell(x, y)));
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getCell(x: number, y: number): Cell {
        return this.cells[y][x];
    }

    public setCell(x: number, y: number, cell: Cell): void {
        this.cells[y][x] = cell;
    }

    public getAvailableCells(x: number, y: number): Cell[] {
        const directions = [
            { dx: -1, dy: 0 },  // left
            { dx: 1, dy: 0 },   // right
            { dx: 0, dy: -1 },  // up
            { dx: 0, dy: 1 },   // down
        ];
        const availableCells: Cell[] = [];

        for (const { dx, dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height) {
                const cell = this.getCell(newX, newY);
                if (!cell.isOccupied()) {
                    availableCells.push(cell);
                }
            }
        }
        
        return availableCells;
    }

    public getSurroundingAgents(x: number, y: number): Agent[] {
        const directions = [
            { dx: -1, dy: 0 },
            { dx: 1, dy: 0 },
            { dx: 0, dy: -1 },
            { dx: 0, dy: 1 },
            { dx: -1, dy: -1 },
            { dx: 1, dy: -1 },
            { dx: -1, dy: 1 },
            { dx: 1, dy: 1 }
        ];
        const surroundingAgents: Agent[] = [];

        for (const { dx, dy } of directions) {
            const newX = x + dx;
            const newY = y + dy;
            if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height) {
                const cell = this.getCell(newX, newY);
                if (cell.isOccupied()) {
                    const agent = cell.getAgent();
                    if (agent) {
                        surroundingAgents.push(agent);
                    }
                }
            }
        }
        
        return surroundingAgents;
    }

    public getAllAvailableCells(): Cell[] {
        const availableCells: Cell[] = [];

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.getCell(x, y);
                if (!cell.isOccupied()) {
                    availableCells.push(cell);
                }
            }
        }

        return availableCells;
    }
}