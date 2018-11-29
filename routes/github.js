const express = require('express');
const fetch = require('node-fetch');
const octokit = require('@octokit/rest')();

const router = express.Router();

router.get('/repo-activity', (req, res) => {
  octokit.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });

  const repos = 'https://api.github.com/search/repositories?q=org:nycplanning%20topic:labs&per_page=100';

  fetch(repos)
    .then(d => d.json())
    .then(({ items }) => {
      const names = items.map(d => d.name);
      const promises = [];

      names.forEach((repo) => {
        promises.push(
          octokit.repos.getCommitActivityStats({
            owner: 'nycplanning',
            repo,
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
});

module.exports = router;
