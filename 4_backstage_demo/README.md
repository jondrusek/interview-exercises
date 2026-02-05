# [Backstage](https://backstage.io) PoC

The initial goal of this PoC is to demonstrate that we can tie into oauth for logging in, pull data from our github org,
and do basic repo management with validation.

## Getting Started

### Configure the database

Run `docker compose up` in the root folder to start up the postgre database. This will store all relevant configuration
data from github and any backstage configuration.

If you want to view the postgre database, you can go to http://localhost:8080 and log in with the following credentials:

```text
System: PostgreSQL
Server: db
Username: backstage-user
Password: Abcd1234!
Database: backstage-db
```

### Configure Local Settings and Tokens

Create a `.env.local` file in the root of your project. This will hold all configuration values that are specific to 
your local machine, and will not be included in any commits into the repository

The env.local file requires three values to be populated:
```dotenv
POSTGRES_PASSWORD=Abcd1234!
GITHUB_TOKEN=<github personal access token from https://github.com/settings/personal-access-tokens>
GITHUB_CLIENT_ID=<oauth client id from https://github.com/settings/applications/new>
GITHUB_CLIENT_SECRET=<oauth client secret from https://github.com/settings/applications/new>
```

To get the GITHUB_TOKEN, you will need to create a Fine-grained token from 
https://github.com/settings/personal-access-tokens. You will also need to ensure that the resource owner is set to 
`macu-devops` and should have the following permissions:

Repository permissions:
- Actions
- Codespaces
- Codespaces metadata
- Contents
- Custom properties
- Deployments
- Pages
- Pull requests
- Variables
- Webhooks
- Workflows

Organization permissions:
- Custom organizational roles
- Custom properties
- Custom repository roles
- Events
- Members
- Models
- Organization codespaces
- Projects
- Variables
- Webhooks

All accesses should be read-only except for Workflows, which should be read and write. After creating the token, you 
should get a token similar to `github_pat_<random characters>`. Copy this value into the `GITHUB_TOKEN` field in your 
`.env.local` file.

To get the GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET, you will need to create an OAuth application from 
https://github.com/settings/applications/new and populate the following fields:
```text
Application name: Backstage OAuth
Homepage URL: http://127.0.0.1:3000
Authorization callback URL: http://localhost:7007/api/auth/github/handler/frame
Enable Device Flow: true
```

After creating the application, you will be given a Client ID and Client Secret. Copy these values into the `.env.local`
file as well.

### Starting the Application

When first starting the application, you will need to install any missing dependencies and packages. To do this, you
can run:

```sh
yarn install
```

If you do not have yarn installed, run `npm install --global yarn` to install it.

Next, you should be able to start the application by running:

```sh
yarn start
```
