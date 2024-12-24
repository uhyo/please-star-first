import core from "@actions/core";
import github from "@actions/github";

try {
  const token = core.getInput("token");

  const octokit = github.getOctokit(token);

  // console.log(`The event payload: ${JSON.stringify(github.context.payload, undefined, 2)}`);

  switch (github.context.eventName) {
    case "issues": {
      handleIssues(octokit, github.context.payload).catch((error) => {
        core.setFailed(error.message);
      });
    }
  }
} catch (error) {
  core.setFailed(error.message);
}

/**
 *
 * @param {ReturnType<typeof github.getOctokit>} octokit
 * @param {import("@octokit/webhooks").EventPayloads.WebhookPayloadIssues} payload
 */
async function handleIssues(octokit, payload) {
  if (payload.action !== "opened" && payload.action !== "reopened") {
    return;
  }
  const { sender } = payload;
  if (await isStarredBy(octokit, sender.login)) {
    console.log(`${sender.login} has starred this repository`);
    return;
  }
  console.log(`${sender.login} has not starred this repository`);

  const message = core.getInput("message");
  // opened by non-stargazer
  await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/comments",
    {
      ...github.context.repo,
      issue_number: payload.issue.number,
      body: `<!-- please-star-first: {} -->

${message}`,
    },
  );
  await octokit.request("PATCH /repos/{owner}/{repo}/issues/{issue_number}", {
    ...github.context.repo,
    issue_number: payload.issue.number,
    state: "closed",
  });
}

/**
 * @param {ReturnType<typeof github.getOctokit>} octokit
 * @param {string} user
 */
async function isStarredBy(octokit, user) {
  for (let page = 0; ; page++) {
    const resp = await octokit.request("GET /repos/{owner}/{repo}/stargazers", {
      ...github.context.repo,
      page,
      per_page: 100,
    });
    if (resp.data.some((u) => u.login === user)) {
      return true;
    }
    if (resp.data.length < 100) {
      break;
    }
  }
  return false;
}
