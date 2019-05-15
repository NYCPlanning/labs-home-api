const express = require('express');
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');

const router = express.Router();

router.get('/', async (req, res) => {
  function addProjects(project, jsonarr) {
    const json = {};
    json.name = project.name;
    json.description = project.description;
    json.link = project.link;
    jsonarr.push(json);
  }

  const projectsJSON = [];
  const doc = new GoogleSpreadsheet(`${process.env.GOOGLE_SHEETS_ID}`);
  await promisify(doc.useServiceAccountAuth)({
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
  });
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  const rows = await promisify(sheet.getRows)({
    offset: 1,
  });
  rows.forEach((row) => {
    addProjects(row, projectsJSON);
  });
  res.json(projectsJSON);
});

module.exports = router;
