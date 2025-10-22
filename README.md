# Travel Agent CI/CD

A simple, beginner-friendly Node.js + Express app with Docker and GitHub Actions CI/CD.

## Features
- **GET `/`**: Returns a welcome message.
- **GET `/packages`**: Returns a sample list of travel packages as JSON.
- **POST `/book`**: Accepts `{ name, destination, date }` JSON and returns a confirmation message.

## Prerequisites
- Node.js 18+
- npm
- (Optional) Docker and Docker Hub account for containerization and pushing images

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. App runs at `http://localhost:3000`.
   - `GET /` → `Welcome to Travel Agent App`
   - `GET /packages` → JSON list of packages
   - `POST /book` with JSON body `{ "name": "John", "destination": "Paris", "date": "2025-12-01" }`

## Docker: Build and Run Locally
1. Build the image:
   ```bash
   docker build -t travel-agent-app:latest .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 --name travel-agent-app --rm travel-agent-app:latest
   ```
3. Visit `http://localhost:3000`.

## CI/CD with GitHub Actions → Docker Hub
This project includes `.github/workflows/ci.yml` which:
- **Triggers on push to `main`**
- **Installs dependencies** as a quick health check
- **Logs in to Docker Hub** using repo secrets
- **Builds and pushes** the image tagged as `<DOCKER_HUB_USERNAME>/travel-agent-app:latest`

### Setup Steps
1. Create a new GitHub repository and push this project.
2. In your GitHub repo settings → Secrets and variables → Actions, add:
   - `DOCKER_HUB_USERNAME` → your Docker Hub username
   - `DOCKER_HUB_PASSWORD` → your Docker Hub password or access token
3. Push to `main`. The workflow will build and push the image to Docker Hub.

## Deploying the Docker Image to a Server
On your target server (with Docker installed), pull and run the image:
```bash
# Log in to Docker Hub (if required)
docker login -u <DOCKER_HUB_USERNAME>

# Pull the latest image
docker pull <DOCKER_HUB_USERNAME>/travel-agent-app:latest

# Run the container (exposes port 3000)
docker run -d --name travel-agent-app -p 3000:3000 <DOCKER_HUB_USERNAME>/travel-agent-app:latest
```

To update, pull a newer image and restart the container:
```bash
docker pull <DOCKER_HUB_USERNAME>/travel-agent-app:latest
docker rm -f travel-agent-app
docker run -d --name travel-agent-app -p 3000:3000 <DOCKER_HUB_USERNAME>/travel-agent-app:latest
```

## Project Structure
```
.
├── app.js
├── package.json
├── Dockerfile
├── .dockerignore
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```
