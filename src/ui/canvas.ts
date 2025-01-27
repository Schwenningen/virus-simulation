export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null;
    private cellSize: number;
    private gridWidth: number;
    private gridHeight: number;
    private padding: number;

    constructor(gridWidth: number, gridHeight: number) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.cellSize = 4800 / gridWidth;
        this.padding = this.cellSize / 2;

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.gridWidth * this.cellSize + this.padding * 2;
        this.canvas.height = this.gridHeight * this.cellSize + this.padding * 2;
        this.canvas.className = "w-full h-full";

        this.ctx = this.canvas.getContext("2d");
        this.drawGrid();
    }

    public drawGrid(): void {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#ffffff";

        this.ctx.strokeStyle = "#029db8";
        this.ctx.imageSmoothingEnabled = false;

        for (let x = 0; x <= this.gridWidth; x++) {
            const xPos = Math.round(x * this.cellSize) + this.padding;
            this.ctx.beginPath();
            this.ctx.moveTo(xPos, this.padding);
            this.ctx.lineTo(xPos, this.canvas.height - this.padding);
            this.ctx.stroke();
        }

        for (let y = 0; y <= this.gridHeight; y++) {
            const yPos = Math.round(y * this.cellSize) + this.padding;
            this.ctx.beginPath();
            this.ctx.moveTo(this.padding, yPos);
            this.ctx.lineTo(this.canvas.width - this.padding, yPos);
            this.ctx.stroke();
        }
    }

    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getCellSize(): number {
        return this.cellSize;
    }

    public getPadding(): number {
        return this.padding;
    }

    public getGridWidth(): number {
        return this.gridWidth;
    }

    public getGridHeight(): number {
        return this.gridHeight;
    }

    public getCanvasWidth(): number {
        return this.canvas.width;
    }

    public getCanvasHeight(): number {
        return this.canvas.height;
    }

    public getCtx(): CanvasRenderingContext2D {
        return this.ctx!;
    }
}
