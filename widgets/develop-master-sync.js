const compareCommits = (repo, base, head, octokit) => octokit.repos.compareCommits({
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

const developMasterSync = (id, octokit) => new Promise(async (resolve) => {
  const attributes = await Promise.all([
    compareCommits(id, 'develop', 'master', octokit),
    compareCommits(id, 'master', 'develop', octokit),
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
