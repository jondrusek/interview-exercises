# Repository structure:

## Relevant files for section 1 (Kubernetes Design & Policy)

| File(s) | Description |
|---|---|
| architecture.md | architecture discussion items |
| policies/labels.yaml | sample kyverno label policies |
| policies/provenance.yaml | sample kyverno signed image enforcement policies |
| policies/security.yaml | sample kyverno privileged container/hostpath policies |
| secrets/example-secretyaml | sample secret |

## Relevant files for section 2 (GitOps & CI/CD)

### GitOps repo can be found at https://github.com/jondrusek/interview-gitops (incomplete setup)

| File(s) | Description |
|---|---|
| .github/workflows/build-and-deploy.yaml | pipeline that does items listed in step 2 |
| Dockerfile | This is just an absolute bare bones dockerfile so I could test the docker image pushing, scanning, and signing |
| security.md | readme describing items in step 4 |

Notes: The gitops repo is unfinished. It has an incomplete argocd structure and does not build properly. This also means the workflow in the project is untested and only has a conceptual flow of steps

## Relevant files for section 3 (Backstage Self-Service Template)

| File(s) | Description |
|---|---|
| backstagedemo/packages/backend/templates/new-microservice/* | Files for a workflow that builds a new repository with variable replacement and created a PR to update the gitops repo with new k8s resources |
| policynotes.md | file describing golden path and policy notes from step 4 |

Notes: Again, the gitops repo is unfinished, and I was unable to figure out a correct folder structure to properly set up a multi-environment argocd cluster, so the k8s yaml files are more conceptual that anything because I was unable to properly test the resources out. Also, I didn't really get the step with the grafana default observability / alert template, so that is missing from the code as well.

## Relevant files for section 4 (Small Backstage feature set)

| File(s) | Description |
|---|---|
| backstagedemo/* | files for running a small backstage demo. Includes a front end plugin (workflow-status) and a backend plugin (music-library) |
| backstagedemo/plugins/workflow-status | files specific to step 1 |
| backstagedemo/plugins/music-library-backend | files specific to step 2 |
| design.md | discussion of design thoughts with backstage |

Notes: The backend plugin is mostly just what backstage made with yarn new. I was going to do some fun stuff, but in looking at it, it already seemed to meet the criteria that was being asked for. I'm not sure if this was intentional or not. I made some changes to it to get a feel for how I like its setup, but out of the box, it just simply seemed to meet the AC of the item, so the changes were more just for me to experiment with how it was designed and get a feel for the backstage best practices more  than anything

# Running backstage poc

1. Open a terminal in the backstagedemo folder
2. Create .env file `touch .env`
3. Create a github PAT and add it to .env file (`GITHUB_TOKEN=<ghp_xxxxx>`). This value is needed for the sample workflow, however, the token you create won't have access to repos to my user, so you may want to update the instances of `jondrusek` in `packages/backend/templates/new-microservice/new-microservice-template.yaml` and also update the gitops repo name as needed. If you do not want to run this through fully, this step can be skipped.
4. Install dependencies: `yarn install`
5. Run backstage: `yarn start`
6. It takes a bit after starting for the catalogs to build out.

## Test frontend plugin

The left dashboard should have a link for Workflow Status. Click this and it should show the most recent status for the workflow

## Test backend plugin

For local testing, navigate to the backend plugin `cd ./plugins/music-library-backend` and run `yarn start` from here. The `dev/index.ts` folder should have curl commands that can be used (this is basically the same idea as the default todos backend service created from `yarn new`. I ran out of time to add fun bells and whistles to it)

## Test workflow

If step 2 was done, you should be able to click Create... and select the Provision Microservice. NOTE: This will create a private repo, so just be aware of that. It will also create a PR on the configured gitops repo to add some sample yaml files