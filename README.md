
# Web Application for Virus Spread Simulation

## Introduction
This web application simulates the spread of a virus in a population using agent-based modeling techniques. It provides a visual and interactive experience to study infection dynamics, allowing users to adjust parameters and observe the results in real-time. The simulation runs entirely on the client side using TypeScript and HTML5 Canvas for visualization.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Simulation Logic](#simulation-logic)
  - [Model Structure](#1-model-structure)
  - [Agent Parameters](#2-agent-parameters-people)
  - [Virus Logic](#3-virus-logic)
  - [Simulation Algorithm](#4-simulation-algorithm)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Real-time visualization:** Observe virus spread dynamically through interactive animations using HTML5 Canvas.
- **Agent-based modeling:** Each individual is represented as an agent with distinct characteristics and behaviors.
- **Two simulation algorithms:**
  - Cellular automaton (grid-based approach)
  - Multi-agent system (free-moving agents)
- **Flexible parameter configuration:** Adjust parameters like infectiousness, incubation period, mortality rate, and more.
- **Statistics tracking:** Monitor key metrics like the number of infected, recovered, and deceased over time.

## Technologies
- **Programming Language:** TypeScript
- **Visualization:** HTML5 Canvas
- **Build Tools:** Webpack or Vite

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/virus-simulation.git
   cd virus-simulation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage
1. Launch the application in your browser.
2. Configure the simulation parameters:
   - Adjust infectiousness, incubation period, mortality, and other variables.
   - Select a simulation algorithm (cellular automaton or multi-agent system).
3. Start the simulation and observe the real-time visualization.
4. Review statistical data and experiment with different configurations to analyze the effects of parameter changes.

## Simulation Logic

### 1. Model Structure
The simulation comprises:
- **Agents:** Represent individuals in the population, each with specific attributes and behaviors.
- **Virus:** The infectious agent transmitted between individuals.
- **Algorithms:** Define infection spread, recovery, death, and immunity processes.

### 2. Agent Parameters (People)
Each agent has the following structure:

```typescript
class Agent {
    private static nextId: number = 0;
    id: number;
    position: { x: number; y: number };
    state: 'Susceptible' | 'Infected' | 'Recovered' | 'Dead' | 'Incubating' = 'Susceptible';
    incubationPeriod: number = 0;
    infectionPeriod: number = 0;
    immune: boolean = false;
    virus: Virus | null = null;
}
```

- **ID:** A unique identifier for each agent.
- **Position:** X and Y coordinates in the simulation space.
- **State:** One of Susceptible, Infected, Recovered, Dead, or Incubating.
- **Timers:** Track the incubation and infection periods.
- **Immunity:** Indicates whether the agent is immune to infection.
- **Virus:** Reference to the virus object when infected.

### 3. Virus Logic
The virus class defines the disease's behavior and characteristics:

```typescript
class Virus {
    infectionChance: number;
    recoveryChance: number;
    deathChance: number;
    incubationPeriodDuration: number;
    infectionPeriodDuration: number;
}
```

Key parameters:
- **Infection chance:** Probability of transmission upon contact.
- **Recovery chance:** Probability of recovering from the infection.
- **Death chance:** Probability of death due to infection.
- **Incubation period duration:** Length of the latent phase.
- **Infection period duration:** Duration of active infection.

### 4. Simulation Algorithm
#### Initialization:
- Generate `N` agents with predefined or randomized parameters.
- Set the initial number of infected agents.
- Configure virus characteristics.

#### Simulation Cycle:
1. Update agent states (infection, recovery, death, etc.).
2. Move agents and simulate interactions.
3. Check for virus transmission between agents in contact.
4. Update the visualization.

#### Termination:
The simulation concludes when all agents have recovered or succumbed to the infection.

## Project Structure
```
/virus-simulation
│── /src
│   ├── /core              # Core simulation logic
│   │   ├── agent.ts       # Agent (person) class
│   │   ├── cell.ts        # Cell for cellular automaton
│   │   ├── grid.ts        # Grid for cellular automaton
│   │   ├── simulation.ts  # Main simulation controller
│   │   ├── simulationManager.ts # Manages simulation state
│   │   ├── statistics.ts  # Data collection and statistics
│   │   ├── virus.ts       # Virus class and logic
│   ├── /ui                # User interface and visualization
│   │   ├── animationState.ts # Manages animation states
│   │   ├── canvas.ts      # Rendering agents and grid
│   │   ├── uiRendering.ts # Rendering user interface
│   ├── /images            # Assets and resources
│   ├── /tests             # Unit tests
│   ├── main.ts            # Entry point of the application
│── .gitignore             # Ignored files for Git
│── index.html             # Main HTML file
```

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

---
