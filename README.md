# Travel Agent CI/CD

A simple, beginner-friendly Node.js + Express app with Docker and GitHub Actions CI/CD.

## Features
- **GET `/`**: Returns a welcome message.
- **GET `/packages`**: Returns a sample list of travel packages as JSON.
- **POST `/book`**: Accepts `{ name, destination, date }` JSON and returns a confirmation message.

## Prerequisites
- Node.js 18+
- npm
- (Optional) Docker. CI publishes the image to **GitHub Container Registry (GHCR)** by default.

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```

---

## Step-by-step CI/CD Guide

- **🥇 Push to GitHub and trigger Actions**
  ```bash
  git init
  git add .
  git commit -m "Initial CI/CD setup"
  git branch -M main
  git remote add origin https://github.com/<your-username>/travel-agent-cicd.git
  git push -u origin main
  ```

- **🧩 Add GitHub secrets (Docker Hub)**
  - Repo → Settings → Secrets and variables → Actions → New repository secret
  - Add `DOCKER_HUB_USERNAME` and `DOCKER_HUB_PASSWORD`

- **⚙️ Check GitHub Actions logs**
  - Repo → Actions → select the `CI` workflow → latest run → expand steps

- **🐳 Verify image on Docker Hub**
  - Docker Hub → Repositories → look for `<DOCKER_HUB_USERNAME>/travel-agent-app`

- **🌍 Run locally**
  ```bash
  docker login -u <DOCKER_HUB_USERNAME>
  docker pull <DOCKER_HUB_USERNAME>/travel-agent-app:latest
  docker run -d --name travel-agent-app -p 3000:3000 <DOCKER_HUB_USERNAME>/travel-agent-app:latest
  ```

- **🌍 Run on EC2**
  - See "EC2 quick start" above, or use the helper script:
  ```bash
  chmod +x deploy.sh
  ./deploy.sh <DOCKER_HUB_USERNAME> latest
  ```

- **🧠 Version tags and optional tests**
  - Tag and push: `git tag v1.0.0 && git push --tags`
  - Build with version tag (manual):
    ```bash
    docker build -t <DOCKER_HUB_USERNAME>/travel-agent-app:v1.0.0 .
    docker push <DOCKER_HUB_USERNAME>/travel-agent-app:v1.0.0
    ```
  - Optional tests: add a basic npm test and run `npm test` in the workflow before build

- **✅ Final checklist**
  - Secrets set: `DOCKER_HUB_USERNAME` and `DOCKER_HUB_PASSWORD`
  - Git push to `main` triggers workflow
  - Actions run succeeds: checkout → install → login → build → push
  - Image exists on Docker Hub and runs locally on port 3000
  - EC2 (optional): accessible at `http://<ec2-public-ip>:3000`

## Verification & Deployment Demo (Optional)
- **Example docker run**: `docker run -d -p 3000:3000 <DOCKER_HUB_USERNAME>/travel-agent-app:latest`
- **Example EC2 steps**: Create Ubuntu t2.micro, open port 3000, install Docker, pull & run.
- **GitHub Actions screenshot**: Insert a screenshot of a green `CI` run with the Build and Push steps.
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
- **Logs in to Docker Hub** using repo secrets `DOCKER_HUB_USERNAME` and `DOCKER_HUB_PASSWORD`
- **Builds and pushes** the image tagged as `<DOCKER_HUB_USERNAME>/travel-agent-app:latest`

### Setup Steps
1. Create a new GitHub repository and push this project.
2. In your GitHub repo: Settings → Secrets and variables → Actions → New repository secret
   - `DOCKER_HUB_USERNAME` → your Docker Hub username (Docker ID)
   - `DOCKER_HUB_PASSWORD` → Docker Hub password or Access Token (recommended)
3. Push to `main`. The workflow will build and push the image to Docker Hub.

## Deploying the Docker Image to a Server
On your target server (with Docker installed), pull and run the Docker Hub image:
```bash
# Login to Docker Hub (if required)
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

### EC2 quick start (Ubuntu)
- Update and install Docker: `sudo apt-get update && sudo apt-get install -y docker.io`
- Allow port: open Security Group inbound rule TCP 3000 from 0.0.0.0/0 (or your IP)
- Login and run:
```bash
sudo docker login -u <DOCKER_HUB_USERNAME>
sudo docker pull <DOCKER_HUB_USERNAME>/travel-agent-app:latest
sudo docker run -d --name travel-agent-app -p 3000:3000 <DOCKER_HUB_USERNAME>/travel-agent-app:latest
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
