export class Virus {
    infectionChance: number;
    recoveryChance: number;
    deathChance: number;
    incubationPeriodDuration: number;
    infectionPeriodDuration: number;

    constructor(
        infectionChance: number,
        recoveryChance: number,
        incubationPeriodDuration: number,
        infectionPeriodDuration: number
    ) {
        this.infectionChance = infectionChance;
        this.recoveryChance = recoveryChance;
        this.deathChance = 1 - recoveryChance;
        this.incubationPeriodDuration = incubationPeriodDuration;
        this.infectionPeriodDuration = infectionPeriodDuration;
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

    getIncubationPeriodDuration(): number {
        return this.incubationPeriodDuration;
    }

    getInfectionPeriodDuration(): number {
        return this.infectionPeriodDuration;
    }
}