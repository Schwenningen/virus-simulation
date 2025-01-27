export class Virus {
    infectionChance: number;
    recoveryChance: number;
    deathChance: number;
    incubationTime: number;
    infectionDuration: number;

    constructor(
        infectionChance: number,
        recoveryChance: number,
        deathChance: number,
        incubationTime: number,
        infectionDuration: number
    ) {
        this.infectionChance = infectionChance;
        this.recoveryChance = recoveryChance;
        this.deathChance = deathChance;
        this.incubationTime = incubationTime;
        this.infectionDuration = infectionDuration;
    }

    getInfectionChance(): number {
        return this.infectionChance;
    }

    getRecoveryChance(): number {
        return this.recoveryChance;
    }

    getDeathChance(): number {
        return this.deathChance;
    }

    getIncubationTime(): number {
        return this.incubationTime;
    }

    getInfectionDuration(): number {
        return this.infectionDuration;
    }
}