const express = require('express');
const fetch = require('node-fetch');
const octokit = require('@octokit/rest')();
const graphql = require('@octokit/graphql');

const router = express.Router();

const getLabsRepos = () => {
  const apiCall = 'https://api.github.com/search/repositories?q=org:nycplanning%20topic:labs&per_page=100';
  return fetch(apiCall).then(d => d.json());
};

router.get('/repo-activity', async (req, res) => {
  octokit.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const { items: repos } = await getLabsRepos();
  const names = repos.map(d => d.name);
  const promises = [];

  names.forEach((repoName) => {
    promises.push(
          octokit.repos.getCommitActivityStats({
            owner: 'nycplanning',
            repo: repoName,
          }),
        );
  });

  Promise.all(promises)
        .then((response) => {
          const simplified = names.map((name, i) => {
            const weeklyData = response[i].data.map(({ week, total }) => ({
              week,
              total,
            }));

            return {
              name,
              data: weeklyData,
            };
          });

          res.json(simplified);
        });
});

router.get('/issues', async (req, res) => {
  const { items: repos } = await getLabsRepos();
  const names = repos.map(d => d.name);
  const promises = [];

  names.forEach((repoName) => {
    promises.push(
      graphql(`{
        repository(owner:"nycplanning", name:"${repoName}") {
          openIssues: issues(states:OPEN) {
            totalCount
          }
          openBugs: issues(states:OPEN, labels:bug) {
            totalCount
          }
          openEnhancements: issues(states:OPEN, labels:enhancement) {
            totalCount
          }
        }
      }`, {
        headers: {
          authorization: `token ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
        },
      }),
    );
  });

  Promise.all(promises)
        .then((response) => {
          const transformed = response.map((d, i) => {
            const name = names[i];

            const openIssues = d.data.repository.openIssues.totalCount;
            const openBugs = d.data.repository.openBugs.totalCount;
            const openEnhancements = d.data.repository.openEnhancements.totalCount;

            return {
              name,
              openIssues,
              openBugs,
              openEnhancements,
            };
          });

          res.json(transformed);
        })
        .catch((err) => {
          res.json(err);
        });
});

module.exports = router;
