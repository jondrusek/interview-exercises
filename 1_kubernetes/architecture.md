# HA control plane
Three or more master nodes across different zones/regions with a replicated database for each zone. The worker nodes then communicate with the nodes via a load balancer. This ensures that there is no single point of failure in the design. Since there are multiple worker nodes, any failure in those had redundancy. And for the master nodes across multiple regions, the load balancer can redirect traffic to the running nodes. Once the failed node is back online, the database replication can build properly using a quorum which allows the downed node to update with the same data as the other replicated databases.

# Multi-AZ
Similar to the database replication as part of the HA control plane, multi availability zones ensure that database changes are synchronously replicated to databases in other regions. This also enables automatic failover if the primary database instance fails. Another cool feature is when pulling data, you can pull data from any instance, offering more available transaction throughput.

# Private clusters
This is a security measure for the HA control plane that allows the clusters to be able to communicate over strictly private IP addresses. This restricts any direct external access, requiring things like VPNs or private endpoints to manage.

# Network policies/ingress
K8s network policies allow you to define firewall rules for controlling incoming traffic to pods. This can allow network policies where backend api pods can only allow ingress traffic from corresponding frontend pods. The network policies allow selecting apps by label, which means that even if there are multiple frontend and backend pods created for a deployment, the network policies would allow traffic from any of the frontend pods to any of the backend pods.

# External Secrets
K8s can interface with secrets from external locations like AWS, Azure Key Vault, etc. This can be useful because by default, standard kubernetes secrets are stored as unencrypted base64 data. These can be created with SecretStore or ClusterSecret store resources, which define how to authenticate into wherever the external secrets are stored. You can then use an ExternalSecret resource to interface with the secret store and retrieve any secrets by the secret name.

# Registry
Defines a system for storing container images used by the K8s clusters. It can handle storing, versioning, and accessing container images.

# Backup/restore
Backup and restore is only really needed if any sort of persistent data is being stored in the k8s cluster. If there is persistent data, there are tools such as Valero that allow for creating K8s backups.

# Tenancy and isolation
The concept of tenancy involves separating out resources allow for isolating resources from one another. A common example of tenancy in K8s would be namespaces, where each namespace defines the resources needed to just run that single logical slice. Access can then be managed for the namespaces to ensure that pods across namespaces can't communicate with one another.

# Promotion strategy
The concept of promotion strategy is how you deploy different versions of your code into kubernetes. The default strategy would be a rolling update where the new pods are created and the old pods are gradually drained of traffic until they can be safely removed.

# Separation of duties
Similar to tenancy/isolation, separation of duties minimizes the risk of resources interacting with other resources they shouldn't. With namespaces that logically isolate workloads, role based access control can then be implemented to ensure that only the expected roles are able to work with the correct resources.
