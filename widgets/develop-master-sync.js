const octokit = require('@octokit/rest')();

octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const compareCommits = (repo, base, head) => octokit.repos.compareCommits({
  owner: 'nycplanning',
  repo,
  base,
  head,
})
  .then(({ data }) => {
    const { status, ahead_by, behind_by } = data;
    return {
      status,
      ahead_by,
      behind_by,
    };
  });

const developMasterSync = id => new Promise(async (resolve) => {
  const attributes = await Promise.all([
    compareCommits(id, 'develop', 'master'),
    compareCommits(id, 'master', 'develop'),
  ])
    .then(([master, develop]) => ({
      master,
      develop,
    }))
    .catch(() => null);

  resolve({
    id: 'master-sync',
    attributes,
  });
});

module.exports = developMasterSync;
