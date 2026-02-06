# Signing
The purpose behind signing is to ensure that the image being used is authentic and hasn't been tampered with. By using a private key when signing a docker image, the authenticity of the image can be validated with the public key to ensure that the image pulled was created with the expected private key. If you add policies to the k8s environment to require signed images, this can add trust that you're working with the correct image

# SBOM
An sbom (software bill of materials) is a list of all of the libraries and package dependencies involved in building the software. Having this list of dependencies involved with the software can allow for easy identification of any vulnerabilities in the software as a whole. For example, if package A has an identified vulnerability with a certain range of versions, comparing against an sbom can quickly determine if the software itself is at risk of that security vulnerability

# Policy Gates
Policy gates are essentially steps in a CI/CD pipeline to stop the process if an issue is identified. Things like the static code analysis against the repo and the docker container looking for software vulnerabilities is a basic example of a policy gate

# Evidence Retention
This concept is around storing and maintaining logs and data to ensure compliance. Like the requirement for financial institutions to keep 7 years of data, software also has policies where they need to retain data. Examples of data we would need to maintain would be log history, user access records, and likely evidence of image history. For example, if we had an image that had code vulnerabilities, and we found months later that it was exploited, we need history to be able to audit how it happened, and we would need all of this data to piece it all together