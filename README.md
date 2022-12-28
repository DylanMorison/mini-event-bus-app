# A mini microservice app

[course link](https://www.udemy.com/course/microservices-with-node-js-and-react/)

## Kubernetes

- **Kubernetes cluster**: A collection of `nodes` + a `master` to manage them.
- **Node**: A virtual machine that will run our containers
- **Pod**: More or less a running container. Technically, a pod can run multiple containers.
- **Deployment**: Monitors a set of pods, make sure they are running aand restarts them if they crash/
- **Service**: Provides an easy to remember URL to access a running container.

### CLI

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
```

### Yaml

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
