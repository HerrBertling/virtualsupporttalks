#!/usr/bin/env node
import { spawn } from "node:child_process";

const args = [
  "-s",
  process.env.CONTENTFUL_SPACE,
  "-t",
  process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  "-e",
  process.env.CONTENTFUL_ENVIRONMENT,
  "-o",
  "types/generated",
  "-X",
];

spawn("cf-content-types-generator", args, { stdio: "inherit" }).on("exit", (code) => {
  process.exit(code);
});
