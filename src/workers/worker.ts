import { Agent } from "../core/agent";

self.onmessage = (event) => {
    const agents = event.data.agents;
    agents.forEach((agent: Agent) => agent.updateState());
    self.postMessage({ agents });
};