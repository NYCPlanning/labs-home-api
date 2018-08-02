[![CircleCI](https://circleci.com/gh/NYCPlanning/labs-home-api/tree/develop.svg?style=svg)](https://circleci.com/gh/NYCPlanning/labs-home-api/tree/develop)

# labs-home-api
An express.js api that delivers project data from Airtable and blog post data from Medium for consumption in planninglabs.nyc

## Development Environment

1. Clone this repo & install dependencies
  ```
  git clone https://github.com/NYCPlanning/labs-ideas-api.git
  npm install
  ```

2. Copy .env example
  ```
  cp .env-example .env
  ```
  Open the new `.env` file and add your airtable key.

3. Start the server
  ```
  npm start
  ```

## Routes

- `/projects/pipeline.json` - gets projects who's status includes "Pipeline"
