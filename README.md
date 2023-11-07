# Project Description

Replace the organization information in the `.env` file using CLI.

# Getting Started

Run the following commands on the terminal

1. `npm link` for first time setup only

2. `gde-init`

## Approach

The environment variables are embedded during the build time. Since Create React App produces a static HTML/CSS/JS bundle, it can’t possibly read them at runtime. One way to change the environment variables is to load HTML into memory on the server and replace placeholders in runtime, as described [here](https://create-react-app.dev/docs/title-and-meta-tags/#injecting-data-from-the-server-into-the-page). Another option is to rebuild the app on the server anytime you change them.

However, I do not have a server-side programming background I decided to implement the CLI approach. The CLI will set all the .env variables needed and then we can simply run `npm run build`.
