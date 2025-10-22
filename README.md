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

## CI/CD with GitHub Actions → GitHub Container Registry (GHCR)
This project includes `.github/workflows/ci.yml` which:
- **Triggers on push to `main`**
- **Installs dependencies** as a quick health check
- **Logs in to GHCR** using GitHub’s built-in `GITHUB_TOKEN` (no extra secrets needed)
- **Builds and pushes** the image tagged as `ghcr.io/<your-github-username>/travel-agent-app:latest`

### Setup Steps
1. Create a new GitHub repository and push this project.
2. Push to `main`. The workflow will build and push the image to **GHCR**.
3. Optional: Make the package public so anyone can pull it:
   - Open your package page: `https://github.com/users/<your-github-username>/packages/container/package/travel-agent-app`
   - Go to Package settings → Change visibility to Public.

## Deploying the Docker Image to a Server
On your target server (with Docker installed), pull and run the GHCR image:
```bash
# If the package is public, you can pull without login
docker pull ghcr.io/<your-github-username>/travel-agent-app:latest

# If the package is private, login using a GitHub Personal Access Token (PAT) with scope read:packages
echo <YOUR_GITHUB_PAT> | docker login ghcr.io -u <your-github-username> --password-stdin
docker pull ghcr.io/<your-github-username>/travel-agent-app:latest

# Run the container (exposes port 3000)
docker run -d --name travel-agent-app -p 3000:3000 ghcr.io/<your-github-username>/travel-agent-app:latest
```

To update, pull a newer image and restart the container:
```bash
docker pull ghcr.io/<your-github-username>/travel-agent-app:latest
docker rm -f travel-agent-app
docker run -d --name travel-agent-app -p 3000:3000 ghcr.io/<your-github-username>/travel-agent-app:latest
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
