# Writer's Muse

Writer's Muse is an AI-powered platform designed to assist users in generating high-quality content. It features a range of services, including authentication, chat functionalities, and AI content generation using the LLaMA model. This repository contains the backend code for the platform.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Backend Services](#backend-services)
  - [AuthService](#authservice)
  - [LLaMA Service](#llama-service)
  - [Chat Service](#chat-service)
- [Frontend](#frontend)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Writer's Muse provides a comprehensive solution for content generation, combining a robust backend with a user-friendly frontend. The backend services are built using TypeScript, while the frontend leverages React JavaScript.

## Features

- **Authentication**: Secure user authentication with token-based sessions.
- **AI Content Generation**: Integration with the LLaMA model to generate content based on user prompts.
- **Chat Functionality**: Real-time chat capabilities allowing for interactive conversations with the AI.

## Backend Services

### AuthService

Handles user authentication, including registration, login, and token management.

- **Endpoints**:
  - `POST /auth/register`: Register a new user.
  - `POST /auth/login`: Authenticate a user and issue a token.
  - `POST /auth/refresh`: Refresh an authentication token.

- **Dependencies**:
  - `express`: Web framework.
  - `jsonwebtoken`: Token management.
  - `bcryptjs`: Password hashing.

### LLaMA Service

Integrates with the LLaMA model to generate content based on user prompts.

- **Endpoints**:
  - `POST /llama/generate`: Generate content using the LLaMA model.

- **Dependencies**:
  - `axios`: HTTP requests.
  - `ThetaEdgeCloud`: LLaMA 3 8B model integration.

### Chat Service

Manages chat interactions, including storing and retrieving chat messages and handling conversation states.

- **Endpoints**:
  - `POST /chats/message`: Send a new chat message.
  - `GET /chats/:conversationId/:userId`: Retrieve chat history for a specific conversation.

- **Dependencies**:
  - `mongoose`: MongoDB object modeling.
  - `jsonwebtoken`: Token management.

