const octokit = require('@octokit/rest')();

octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

// Given a repo and label, returns object with count of type of label
const pullRequestCount = repo => octokit.pulls.list({
  owner: 'nycplanning',
  repo,
  state: 'open',
})
  .then(({ data }) => data.length);

const pullRequestWidget = id => new Promise(async (resolve) => {
  const pullRequests = await Promise.all([
    pullRequestCount(id),
  ])
      // .then(([id]) => id,
      .catch(() => null);

  resolve({
    id: 'pull-requests',
    pullRequests,
  });
});

module.exports = pullRequestWidget;
