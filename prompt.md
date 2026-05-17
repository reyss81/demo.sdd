Generate a complete implementation-ready SDD as a single Markdown (.md) document.

The output MUST be fully formatted in clean Markdown syntax so it renders correctly inside modern IDEs such as VSCode, IntelliJ IDEA, Cursor, Windsurf, and Gemini Code Assist.

Use:

* Proper Markdown headings (#, ##, ###)
* Markdown tables where appropriate
* Bullet lists
* Code blocks with syntax highlighting
* JSON examples
* Tree/folder structure formatting
* YAML formatting for Spring Boot configs
* Shell command formatting
* Clear visual organization

The Markdown document must look professional, readable, and production-quality when previewed in an IDE Markdown viewer.

---

## PROJECT OVERVIEW

Create a complete professional SDD (Spec-Driven Development) document for a modern full-stack demo application composed of two completely separated cores/modules:

1. demo.backend
2. demo.frontend

The purpose of this project is to demonstrate a modern AI-assisted software engineering workflow, where architecture, orchestration, validation, and rapid iteration are prioritized over manual low-level implementation.

The final SDD must be detailed enough that an AI coding assistant can generate the entire project from the specification alone.

---

## TECH STACK

Backend:

* Java 21
* Spring Boot 3.x
* Maven
* REST API
* MySQL (preferred) or H2 for demo simplicity
* Layered architecture
* JSON-based communication

Frontend:

* React
* Vite
* JavaScript (not TypeScript)
* Axios for API communication
* Modern component-based structure

---

## GENERAL REQUIREMENTS

* The backend and frontend MUST be completely separated projects.

* The backend project name must be:
  demo.backend

* The frontend project name must be:
  demo.frontend

* The backend must run on:
  http://localhost:50001

* The frontend must run on:
  http://localhost:8088

* The frontend must consume the backend API.

* Include professional project structure and separation of concerns.

* Keep the implementation simple, clean, scalable, and demo-friendly.

* Avoid unnecessary enterprise complexity.

* Focus on clarity, maintainability, and realistic architecture.

---

## BACKEND REQUIREMENTS

Create a Spring Boot backend with:

Modules/features:

1. Inventory CRUD
2. Notes CRUD

Requirements:

* RESTful API
* Proper controller/service/repository/entity separation
* DTO layer
* Validation layer
* Global exception handling
* CORS configuration for frontend access
* Standardized API responses
* Proper HTTP status codes
* Simple logging
* Environment configuration

Entities:

InventoryItem

* id
* name
* quantity
* price
* createdAt

Note

* id
* title
* content
* createdAt
* updatedAt

Required endpoints:

* Full CRUD for Inventory
* Full CRUD for Notes

Include:

* API route definitions
* Request/response JSON examples
* Validation rules
* Suggested package structure
* Suggested naming conventions
* Maven dependencies
* application.yml configuration
* Database schema expectations

---

## FRONTEND REQUIREMENTS

Create a React frontend application with:

Pages/components:

1. Dashboard
2. Inventory Manager
3. Note Manager

The frontend must:

* Consume backend APIs using Axios
* Use reusable components
* Include API abstraction/services layer
* Include loading states
* Include error handling
* Include form validation
* Include clean state management
* Use a clean and modern UI layout
* Be optimized for fast demo execution

Required functionality:

Inventory:

* List inventory items
* Create inventory item
* Edit inventory item
* Delete inventory item

Notes:

* List notes
* Create note
* Edit note
* Delete note
* View note details

Frontend structure requirements:

* components/
* pages/
* services/
* hooks/
* layouts/
* styles/

Include:

* Routing structure
* API integration strategy
* Suggested React architecture
* Suggested folder structure
* Startup instructions
* Environment variable strategy

---

## ARCHITECTURE REQUIREMENTS

The SDD must explain:

* Overall system architecture
* Backend/frontend communication flow
* Separation of responsibilities
* Why the architecture is scalable
* Why the architecture is AI-friendly for rapid development
* How AI-assisted workflows accelerate implementation
* How modularization improves maintainability

---

## AI-ASSISTED DEVELOPMENT REQUIREMENTS

Include a dedicated section explaining:

* How AI coding assistants can implement the project incrementally
* Suggested prompting strategy
* Validation workflow
* Iterative development approach
* Spec-driven development workflow
* Rapid prototyping methodology
* Human validation responsibilities

---

## OUTPUT FORMAT

Generate the SDD as a SINGLE professional Markdown document with the following sections:

# 1. Project Overview

# 2. Project Goals

# 3. Non-Goals

# 4. Technology Stack

# 5. System Architecture

# 6. Backend Architecture

# 7. Frontend Architecture

# 8. Data Models

# 9. API Contract

# 10. Validation Rules

# 11. Error Handling Strategy

# 12. Folder Structure

# 13. Environment Configuration

# 14. Local Development Setup

# 15. Build & Run Instructions

# 16. Acceptance Criteria

# 17. AI-Assisted Development Workflow

# 18. Suggested Incremental Implementation Plan

# 19. Future Scalability Possibilities

Important:

* Make the document realistic and professional.
* Write as if this were a real-world technical architecture document.
* Avoid vague explanations.
* Be implementation-oriented.
* Prioritize clarity and modularity.
* The final Markdown SDD should be sufficient for generating the entire project using AI-assisted development tools.
