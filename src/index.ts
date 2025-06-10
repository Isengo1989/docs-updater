import * as dotenv from "dotenv";
import { createAgent } from "spinai";
import { DocConfig, ReviewState } from "./types";
import { createFullConfig } from "./config";
import { actions } from "./actions";
import { startServer } from "./server";
import { openai } from "@ai-sdk/openai";

dotenv.config();

export interface CreateDocUpdateAgentOptions {
  config?: Partial<DocConfig>;
  openAiKey?: string;
  githubToken?: string;
  port?: number;
}

export function createDocUpdateAgent(
  options: CreateDocUpdateAgentOptions = {}
) {
  const config = createFullConfig(options.config || {});

  // Validate required credentials
  const openAiKey = options.openAiKey || process.env.OPENAI_API_KEY;
  const githubToken = options.githubToken || process.env.GITHUB_TOKEN;
  if (!openAiKey) throw new Error("OpenAI API key is required");
  if (!githubToken) throw new Error("GitHub token is required");


  // Create the agent
  const agent = createAgent({
    instructions: "Test agent",
    actions: actions,
    model: openai("gpt-4-turbo"),
    spinApiKey: process.env.SPINAI_API_KEY,
    agentId: "choose-any-agent-id-123",
  });

  console.log("Agent created:", agent);
  return agent;
}



export { startServer } from "./server";
export type { DocConfig } from "./types";
export type { ServerOptions } from "./server";

// Start the server when this file is run directly
if (require.main === module) {
  startServer().catch((error: Error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
}
