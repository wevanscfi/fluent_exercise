# Docker Compose Monitoring Stack

This is a project for meeting the goals of the fluent technical interview task #2.

## Problem Statement
Using docker-compose to define a stack that includes the following docker containers
- Grafana
- Prometheus
- Your choice of web server (e.g. apache, nginx)

Send web server metrics (your choice of metrics) to prometheus and create and define a grafana dashboard to display the prometheus metrics

Your choice on how you deliver the grafana dashboard to me. It can be bundled into the docker-compose stack sent to me or as a standalone file.

## Solution
We will run nginx with stub_status enabled at the standard metrics uri.

We will run the prometheus-nginx-exporter configured to scrape our stub_status nginx endpoint.

We will run prometheus configured to scrape the exporters prom endpoint.

We will run grafana with a pre-configured datasource pointed to prometheus, and the public prometheus-nginx-exporter dashboard.

## Important project file
- [Docker Compose](docker-compose.yml)
- [Grafana Nginx Dashboard](grafana/provisioning/dashboards/nginx.json)

# Deploying the stack with docker compose
```shell
docker compose up
```

## Validating services are up
```shell
$ docker ps
CONTAINER ID   IMAGE                             COMMAND                  CREATED         STATUS         PORTS                    NAMES
0e55bfe81619   prom/prometheus:latest            "/bin/prometheus --c…"   6 minutes ago   Up 6 minutes   0.0.0.0:9090->9090/tcp   prometheus
869530e453c4   nginx/nginx-prometheus-exporter   "/usr/bin/nginx-prom…"   6 minutes ago   Up 6 minutes   0.0.0.0:9113->9113/tcp   exporter
2383c9649639   nginx:latest                      "/docker-entrypoint.…"   6 minutes ago   Up 6 minutes   0.0.0.0:8080->80/tcp     nginx
8a8b4b332be6   grafana/grafana:6.7.2             "/run.sh"                6 minutes ago   Up 6 minutes   0.0.0.0:3000->3000/tcp   grafana
```

### Notes
The nginx dashboard is installed in the provisioning files that we mount into the grafana container.
It will be available in the grafana dashboards list immediately, but it may take a few minutes to populate with data after installing the stack. 

To ensure there are usage metrics, you can visit the [nginx index url](http://localhost:8080) a few times while you wait.
Refresh the dashboard if metrics have not populated.

## Clean Up
```shell
docker compose down --volumes
```

## Services
[Grafana](http://localhost:3000)
[Nginx Index HTML](http://localhost:8080)

## Limitations 
This docker compose stack is a very limited POC. It does not implement any form of TLS or authentication. Nor does it attempt to provide a secure network configuration.

This project is for demonstration purposes only.

