const octokit = require('@octokit/rest')();

octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const issueWidget = id => new Promise(async (resolve) => {
  const issues = await octokit.issues.listForRepo({
    owner: 'nycplanning',
    repo: id,
    labels: 'bug',
  });

  resolve(issues);
});

module.exports = issueWidget;
