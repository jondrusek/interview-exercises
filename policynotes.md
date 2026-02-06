# Golden path

The golden path is essentially the "perfect way" of deploying software with an organization as a person sees it. Below are some factets that I imagine in a golden path as I see it

## Deploy pipeline

100% consistency in pipeline construction between any repository. Any reasonable diversions from the norm can be managed through variables in the pipeline. With 100% pipeline consistency, any updates to the pipeline code can be deployed to all repositories in the org to keep consistency moving forward

All repositories are automatically set up with DNS records, firewall rules, k8s infrastructure for the full lifecycle, dockerfiles, and workflows with SCA and image signing. The process to request these should be simple to follow and have validation to ensure no mistyped data is entered. For the dns records and firewall rules, the dev environment should be able to have these approved without any manual review. This will enable developers to be able to get the ball rolling on their projects. For the other environments, a small level of manual review should be required just to review the tickets. On approval, those changes should be able to automatically apply.

## Initial repository setup

The build pipeline should enforce checks include consistent code style and code coverage requirements. This would ensure that code across the org has a consistent look and feel, so developers working across projects can just focus on the code and not have to adjust to code style differences or coding standards between projects. Pipeline rules could also be implemented to require any public facing endpoints to include summary documentation. This documentation could then be used by the pipeline to build out automatic code level documentation that is easily accessible and consistently accessible between any repository created. Unfortunately, I don't see devs ever keeping documentation up to date unless it's forced in a pipeline.