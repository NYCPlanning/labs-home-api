# labs-api
An express.js api that delivers project-related data from airtable for consumption in planninglabs.nyc

## Dependencies

- MongoDB

## Installation

1. Install MongoDb
  ```
  brew install mongodb
  brew services start mongodb
  ```

2. Copy .env example
  ```
  cp .env-example .env
  ```
  Open the new `.env` file and add your secret keys. You can leave the `MONGO_URL` as it is.

3. Start the server
  ```
  npm start
  ```
## Routes

- `/projects/pipeline.json` - gets projects who's status includes "Pipeline"
