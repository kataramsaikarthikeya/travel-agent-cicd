#!/usr/bin/env bash
set -euo pipefail

# deploy.sh - Pull and run the latest image from Docker Hub
# Usage:
#   ./deploy.sh <dockerhub-username> [tag]
# Example:
#   ./deploy.sh karthikeya30060 latest
#   ./deploy.sh karthikeya30060 v1.0.0
# If no args are provided, it will read DOCKER_HUB_USERNAME from env and default tag to 'latest'.

USER_NAME=${1:-${DOCKER_HUB_USERNAME:-}}
TAG=${2:-latest}

if [[ -z "${USER_NAME}" ]]; then
  echo "Error: Docker Hub username not provided."
  echo "Provide it as the first argument or set DOCKER_HUB_USERNAME env var."
  exit 1
fi

IMAGE="${USER_NAME}/travel-agent-app:${TAG}"

echo "Pulling image: ${IMAGE}"
docker pull "${IMAGE}"

# Stop and remove existing container if running
if docker ps -a --format '{{.Names}}' | grep -Eq '^travel-agent-app$'; then
  echo "Stopping and removing existing container 'travel-agent-app'"
  docker rm -f travel-agent-app >/dev/null 2>&1 || true
fi

# Run container on port 3000
echo "Starting container from ${IMAGE} on port 3000"
docker run -d --name travel-agent-app -p 3000:3000 "${IMAGE}"

echo "Travel Agent App running at http://localhost:3000"
