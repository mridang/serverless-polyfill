# serverless-polyfill

Uses [polyfill.io](https://polyfill.io/v2/docs/)'s service to generate a Polyfill based on the user agent of the request. Aggressively caches to ensure as few requests as possible.

##### Caching

All the responses are cached for a day and varied by the `User-Agent` header. As the endpoint is the same for all browsers, the `Vary` by `User-Agent` header will ensure that cached payloads are different depending upon the browser.

##### CORS

CORS is enabled by default for all endpoints and allows any origin i.e. `*`

## Getting started

Ensure you have `node` and either `npm` or `yarn` installed globally. Serverless requires Node 8.10.0.

---

##### NVM

If you are using a different version of Node, we recommend using `nvm` to run different versions. Set up the correct Node environment bar running `nvm use`. This will automatically read the contained `.nvmrc` file and set the appropriate version.

---

Run `yarn install`to fetch all  the dependencies and once done, run `yarn serve` to start a local server at `http://localhost:3000`. 

## Deployment

Polyfill allows deployment to AWS Lambda with a single command. Run `sls deploy --stage [STAGE]` to deploy the function. 

**Note:** If the `--stage` parameter is not specified, Serverless will default to `dev`.

**Note:** The `NODE_ENV` variable is always forced to be `production` irrespective of whether the service is running offline or in the cloud. This is so that the Polyfill service will run in production mode. 

This will trigger output that looks something like:

```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (57.17 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............
Serverless: Stack update finished...
Service Information
service: polyfill
stage: production
region: us-west-2
stack: polyfill-production
api keys:
  None
endpoints:
  GET - https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/production/polyfill
functions:
  polyfill: polyfill-production-polyfill
```

## Usage

Place the endpoint URL in a `script` tag in your application's HTML before you load your main JavaScript to get all of the necessary polyfills. Polyfill will use your browser's user-agent to determine all the Polyfills that should be loaded.

##### HTML

View the source of the included `debug.html` file to see how the Polyfill service should be used on a webpage.

##### cURL

```shell
curl -v http://localhost:3000/polyfill.js
```

## Linting

Polyfill uses Prettier to format and lint it's sources. Run `yarn build` to prettify all the sources.

## Testing

Serverless uses Jest for testing. Run the entire test suite by executing `yarn test`. 