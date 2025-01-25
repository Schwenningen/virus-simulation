import { Cell } from "./cell";

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
  }