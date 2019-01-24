const express = require('express');
const request = require('request');
const mapObj = require('map-obj');
const camelCase = require('camelcase');
const kebabCase = require('kebab-case');
// const fetch = require('node-fetch');
// const octokit = require('@octokit/rest')();
// const graphql = require('@octokit/graphql');

const developMasterSyncWidget = require('../widgets/develop-master-sync');


const router = express.Router();

router.get('/projects', (req, res) => {
  // product, status, type of project, labs assessment, last engagement, repos, staging url, production url
  const url = `
    https://api.airtable.com/v0/app96dxh8etNgmxsm/Products-Existing%20and%20New\
    ?fields[]=Product\
    &fields[]=Status\
    &fields[]=Type of Project\
    &fields[]=Labs Assessment\
    &fields[]=Last Engagement\
    &fields[]=Repos\
    &fields[]=Staging URL\
    &fields[]=Production URL\
    &filterByFormula=OR(Status='Built',Status='Build In-progress')
    &api_key=${process.env.AIRTABLE_API_KEY}
  `.replace(/\s\s+/g, '');

  request({ url, json: true }, (err, response, body) => {
    if (!err) {
      if (body.error) {
        res.status(500).send(body.error);
      } else {
        const data = body.records.map((obj) => {
          const { fields } = obj;
          const attributes = mapObj(fields, (key, val) => [kebabCase(camelCase(key)), val]);
          const { product: id } = attributes;
          const relationships = {
            repos: {
              data: attributes.repos.map(repo => ({
                type: 'repos',
                id: repo,
              })),
            },
          };


          return {
            type: 'projects',
            id,
            attributes,
            relationships,
          };
        });

        res.send({ data });
      }
    } else {
      res.status(500).send({ error: err });
    }
  });
});

router.get('/repos/:id', (req, res) => {
  const { id } = req.params;

  const promises = [
    developMasterSyncWidget(id),
  ];

  Promise.all(promises)
        .then((response) => {
          res.json({
            data: {
              type: 'repo',
              id,
              attributes: {
                'widget-data': response,
              },
            },
          });
        })
        .catch(() => {
        });
});

module.exports = router;
