import { DocConfig, DocUpdateConfig } from "./types";

export const defaultConfig: Required<DocConfig> = {
  docsPath: "",
  isMonorepo: false,
  docsRepoOwner: "Isengo1989",
  docsRepoName: "docs-1",
  docsBranch: "master",
  sourceRepoOwner: "Isengo1989",
  sourceRepoName: "platform",
  sourceBranch: "master",
  fileTypes: [".mdx", ".md"],
  ignorePaths: ["**/node_modules/**", "**/.git/**"],
  createNewPr: true,
  labels: ["documentation"],
  styleGuide: "",
};

export function createFullConfig(
  userConfig: Partial<DocConfig>
): DocUpdateConfig {
  const config = { ...defaultConfig, ...userConfig };

  return {
    docsPath: config.docsPath,
    docsRepo: config.docsRepoOwner
      ? {
          owner: config.docsRepoOwner,
          repo: config.docsRepoName || "",
          branch: config.docsBranch,
          monorepo: config.isMonorepo,
        }
      : undefined,
    sourceRepo: config.sourceRepoOwner
      ? {
          owner: config.sourceRepoOwner,
          repo: config.sourceRepoName || "",
          branch: config.sourceBranch,
        }
      : undefined,
    matchRules: {
      docExtensions: config.fileTypes,
      ignorePatterns: config.ignorePaths,
    },
    prConfig: {
      updateOriginalPr: !config.createNewPr,
      branchPrefix: "docs/update",
      titleTemplate: "📚 Update documentation for {prTitle}",
      bodyTemplate: `This PR updates documentation to reflect changes in #{prNumber}

## Changes
{changes}

This PR was automatically generated using [SpinAI](https://github.com/Fallomai/spinai).`,
      labels: config.labels,
    },
    llmConfig: config.styleGuide
      ? {
          styleGuide: config.styleGuide,
          temperature: 0.3,
        }
      : undefined,
  };
}
