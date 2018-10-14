# react-redux-boilerplate

# Getting Started

1. Make sure you have at least Node Version 8.6 installed (available [here](https://nodejs.org/en/))
2. `cd` to the project directory
3. `npm install`

## Building and running

-   `npm run dev` runs the UI in dev mode on port 8888
-   `npm run webpack` builds and bundles the UI into the [dist](./dist/index.html) folder

## Configuration

Checkout the project's [config](./config/index.js) for a few environment variables you can provide to customize the build of the UI.

## Bundling for deployments

-   `npm install`
-   `npm run archive`
    -   Output should be rendered to a zip file with a file name shaped like the following: app.archive.<MD5_Hash>.zip
    -   Contents can then be extracted into a new folder.
        -   Run `npm install --production` in this folder created by the extracted zip
        -   Run `node server` and the UI will start on port 8888

To configure for a given deployment (i.e., venue):

-   Add an env variable for (or modify the string literal values in `config/index.js`) for the following:
    -   `STATIC_SERVER_HOST` and `STATIC_SERVER_PORT`
    -   `API_SERVER_HOST` and `API_SERVER_PORT`
    -   `API_SERVER_PATH` is the path of the API
