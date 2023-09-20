// @ts-check

import core from "@actions/core";
import { createAppAuth } from "@octokit/auth-app";

import { main } from "./lib/main.js";
import request from "./lib/request.js";

const appId = core.getInput("app_id");
const privateKey = core.getInput("private_key");
const organization = core.getInput("organization_name");

main(
  appId,
  privateKey,
  organization,
  core,
  createAppAuth,
  request.defaults({
    baseUrl: process.env["GITHUB_API_URL"],
  })
).catch((error) => {
  console.error(error);
  core.setFailed(error.message);
});
