# LangSwarm-UI

A lightweight React-based chat application for interacting with an LLM agent. Built using Vite and deployable to Google Cloud Run.

## Features
- Simple chat interface
- Stateless communication with an external backend

## Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run locally:
   ```bash
   npm run start
   ```

## Build
```bash
npm run build
```

## Deployment
- **Docker**:
  ```bash
  docker build -t chat-workspace .
  docker run -p 8080:80 chat-workspace
  ```
- **Google Cloud Run**:
  Follow instructions in the main repository.
