apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: spoon-frontend
  name: spoon-frontend
  namespace: spoon
spec:
  selector:
    matchLabels:
      app: spoon-frontend
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: spoon-frontend
    spec:
      containers:
      - image: gcr.io/feisty-return-300415/spoon-fe:1
        name: spoon-frontend
        ports:
        - containerPort: 80
          protocol: TCP
        resources:
          requests:
              memory: "50Mi"
              cpu: "50m"
          limits:
              memory: "250Mi"
              cpu: "250m"