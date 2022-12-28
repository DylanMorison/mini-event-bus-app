# A mini microservice app

[course link](https://www.udemy.com/course/microservices-with-node-js-and-react/)

## Kubernetes

- **Kubernetes cluster**: A collection of `nodes` + a `master` to manage them.
- **Node**: A virtual machine that will run our containers
- **Pod**: More or less a running container. Technically, a pod can run multiple containers.
- **Deployment**: Monitors a set of pods, make sure they are running aand restarts them if they crash/
- **Service**: Provides an easy to remember URL to access a running container.

### k8s CLI

```bash
# Print out information about all the running pods
kubectl get pods

# Execute the given command in a running pod
kubectl exec it [pod_name][cmd]

# Print out logs from the given pod
kubectl logs [pod_name]

# Delete the given pod
kubectl delete pod [pod_name]

# Tell k8s to process the config
kubectl apply -f [config_file_name]

# Print out some information about the running pod
kubectl describe pod [pod_name]

k rollout restart deployment posts-depl
# deployment.apps/posts-depl restarted
```

### Pod Yaml

```yaml
# K8s is extensible - we can add in our own custom objects.  This specifies the set of objects we want k8s to look at
apiVersion: v1
# The type of object we want to create
kind: Pod
# Config options for the object we are about to create
metadata:
  # When the pod is created give it the name `posts`
  name: posts
# The exact attributes we want to apply to the object we are about to create
spec:
  # We can create many containers in a single pod
  containers:
    # Make a container with a name of `posts`
    - name: posts
      # The exact image we want to use
      image: dozer1234/posts:0.0.1
```

### deployment Yaml

The goal of the `selector` and `metadata` in the yaml below is to tell deployments which pods they are supposed to manage.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: posts-depl
spec:
  replicas: 1
  # Take a look at all the different pods that have been created.
  # Find all pods with the label: `app:posts`
  # The label can be anything, such as `LOLOL:LMAOLMAO`
  selector:
    matchLabels:
      app: posts
  # The template is where we specify the exact configuration of a pod that # we want this deployment to create. The below will be applied to the pod # that is created by the deployment.
  template:
    metadata:
      labels:
        app: posts
    spec:
      containers:
        - name: posts
          image: dozer1234/posts:0.0.1
```

### Types of k8s Services

Anytime we think of networking in any way, we are always thinking of services. There are 4 different types of services we will use on a daily basis with k8s.

- **Cluster IP**: Sets up an easy-to-remember URL to access a pod. Only exposes pods _in the cluster_
- **Node Port**: Makes a pod accessible from outside the cluster. Usually only used for dev purposes.
- **Load Balancer**: Makes a pod accessible from _outside the cluster_. This is the right way to expose a pod to the outside world.
- **External Name**: Redirects an in-cluster request to a CNAME url... don't worry about this one...

### Services yaml example

```yaml
apiVersion: v1
kind: Service

metadata:
  name: posts-srv

spec:
  type: NodePort
  selector:
    app: posts
  ports:
    - name: posts
      protocol: TCP
      # address of the `node port service`
      port: 4000
      # `node port service` redirects incoming requests to `targetPort`
      targetPort: 4000
```

```bash
$ k get services
NAME         TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes   ClusterIP   10.96.0.1       <none>        443/TCP          128m
posts-srv    NodePort       <none>        4000:30768/TCP   2m10s
```

In the above snippet, 30768/TCP is a randomly assigned number known as the NodePort, usually ranging from 30k to 32k.

```bash
$ k describe service posts-srv
Name:                     posts-srv
Namespace:                default
Labels:                   <none>
Annotations:              <none>
Selector:                 app=posts
Type:                     NodePort
IP Family Policy:         SingleStack
IP Families:              IPv4
LoadBalancer Ingress:     localhost
Port:                     posts  4000/TCP
TargetPort:               4000/TCP
# Nodeport is how you would access this service from outside in a browser, for example
NodePort:                 posts  30768/TCP
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```
