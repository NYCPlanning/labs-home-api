const octokit = require('@octokit/rest')();

octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});


// Given a repo and label, returns object with count of type of label
const issueCount = (repo, labels) => octokit.issues.listForRepo({
  owner: 'nycplanning',
  repo,
  labels,
})
  .then(({ data }) => data.length);

const issuesWidget = id => new Promise(async (resolve) => {
  const labels = ['bug', 'Easy Win'];

  const labelPromises = labels.map(label => issueCount(id, label));
  const issues = await Promise.all(labelPromises)
    .then((counts) => {
      const countResponse = {};
      counts.forEach((count, i) => {
        countResponse[labels[i]] = count;
      });
      return countResponse;
    })
    .catch(() => null);

  resolve({
    id: 'issues',
    issues,
  });
});

module.exports = issuesWidget;
