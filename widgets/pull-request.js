const octokit = require('@octokit/rest')();

octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

// Given a repo, returns object with count of OPEN pull requests
const pullRequestCount = repo => octokit.pulls.list({
  owner: 'nycplanning',
  repo,
  state: 'open',
})
  .then(({ data }) => data.length);

const pullRequestWidget = id => new Promise(async (resolve) => {
  const pullRequests = await pullRequestCount(id);

  resolve({
    id: 'pull-requests',
    pullRequests,
  });
});

module.exports = pullRequestWidget;
