# 1. Project Overview
This Software Design Document (SDD) outlines the architecture and implementation strategy for a modern, full-stack demo application designed to illustrate the efficacy of AI-assisted software engineering workflows. The system is intentionally decoupled into two distinct modules: `demo.backend` and `demo.frontend`. This strict separation demonstrates a scalable, Spec-Driven Development (SDD) approach, prioritizing architecture, orchestration, and validation over manual, low-level coding.

# 2. Project Goals
- **Decoupled Architecture:** Ensure absolute separation between the frontend and backend applications to mirror real-world microservices/SOA environments.
- **AI-Assisted Workflow Demonstration:** Provide a comprehensive spec that serves as the prompt payload for autonomous code generation.
- **Clean Code & Modularity:** Implement a clear, layered architectural pattern prioritizing readability, separation of concerns, and maintainability.
- **Rapid Iteration:** Enable fast prototyping and iteration cycles by keeping enterprise complexities out of the demo while maintaining professional standards.

# 3. Non-Goals
- Complex authentication or authorization (e.g., OAuth2, JWT) are out of scope.
- Microservices choreography or distributed caching (e.g., Redis, Kafka).
- CI/CD pipeline automation or cloud deployment configurations.
- Over-engineered design patterns (e.g., CQRS, Event Sourcing) not required for simple CRUD operations.

# 4. Technology Stack
**Backend:**
- Java 21
- Spring Boot 3.x (Web, Data JPA, Validation)
- Maven
- MySQL (Preferred) or H2 (Fallback for pure demo purposes)
- RESTful JSON API

**Frontend:**
- React 18+
- Vite
- JavaScript (ES6+, No TypeScript)
- Axios for API communication
- React Router DOM for routing

# 5. System Architecture
The application employs a standard client-server architecture using a RESTful API for communication over HTTP. 
- **Client (`demo.frontend`):** A Single Page Application (SPA) running locally on `http://localhost:8088`. It manages its own state and renders views dynamically based on data fetched from the backend.
- **Server (`demo.backend`):** A Spring Boot application running on `http://localhost:50001`. It handles business logic, data persistence, and API exposure. 
- **Database:** A relational database (MySQL/H2) managed via Spring Data JPA.

The frontend communicates with the backend exclusively via JSON payloads. The backend enables CORS specifically for the frontend's origin (`http://localhost:8088`) to allow secure cross-origin requests.

# 6. Backend Architecture
The backend follows a strict Layered Architecture to enforce separation of concerns:
- **Controller Layer (`@RestController`):** Handles incoming HTTP requests, validates input, delegates to the Service layer, and formats the HTTP response (DTOs, status codes).
- **Service Layer (`@Service`):** Contains the core business logic. Acts as an intermediary between the Controller and Repository layers.
- **Repository Layer (`@Repository`):** Interfaces with the database using Spring Data JPA.
- **DTO Layer:** Data Transfer Objects are used to pass data between the Controller and the client, preventing internal Entity structures from leaking to the API contract.
- **Entity Layer (`@Entity`):** Represents the database schema and maps directly to tables.
- **Exception Handling (`@ControllerAdvice`):** A global exception handler catches runtime exceptions and translates them into standardized JSON error responses.

# 7. Frontend Architecture
The frontend is structured as a modern React application built with Vite:
- **Pages:** Top-level components representing distinct routes (Dashboard, Inventory Manager, Note Manager).
- **Components:** Reusable, stateless UI blocks (Buttons, Tables, Modals, Forms).
- **Services/API:** Abstraction layer for Axios calls (`inventoryService.js`, `noteService.js`), centralizing API base URLs and error interception.
- **Hooks:** Custom React Hooks to encapsulate data fetching and state management (e.g., `useInventory()`, `useNotes()`).
- **Layouts:** Shared page structures (e.g., Sidebar, Header, Main Content area) to ensure consistent UX.
- **Styles:** Modular CSS/SCSS or utility classes for modern layout designs.

# 8. Data Models

### InventoryItem
| Field | Type | Description |
|-------|------|-------------|
| `id` | Long (PK) | Auto-generated unique identifier |
| `name` | String | Name of the inventory item |
| `quantity` | Integer | Current stock level |
| `price` | BigDecimal | Price of the item |
| `createdAt`| Timestamp | Auto-generated creation timestamp |

### Note
| Field | Type | Description |
|-------|------|-------------|
| `id` | Long (PK) | Auto-generated unique identifier |
| `title` | String | Title of the note |
| `content` | Text/String | Body content of the note |
| `createdAt`| Timestamp | Auto-generated creation timestamp |
| `updatedAt`| Timestamp | Auto-updated modification timestamp |

# 9. API Contract

**Base URL:** `http://localhost:50001/api/v1`

### Inventory Endpoints
- `GET /inventory` - Retrieve all inventory items.
- `GET /inventory/{id}` - Retrieve a specific item.
- `POST /inventory` - Create a new item.
- `PUT /inventory/{id}` - Update an existing item.
- `DELETE /inventory/{id}` - Delete an item.

*Example Payload (`POST /inventory`):*
```json
{
  "name": "Mechanical Keyboard",
  "quantity": 15,
  "price": 129.99
}
```

### Notes Endpoints
- `GET /notes` - Retrieve all notes.
- `GET /notes/{id}` - Retrieve a specific note.
- `POST /notes` - Create a new note.
- `PUT /notes/{id}` - Update an existing note.
- `DELETE /notes/{id}` - Delete a note.

*Example Payload (`POST /notes`):*
```json
{
  "title": "Meeting Agenda",
  "content": "Discuss AI SDD implementation and architecture."
}
```

# 10. Validation Rules
**Backend Validation (`jakarta.validation`):**
- `InventoryItem.name`: Not blank, max 100 characters.
- `InventoryItem.quantity`: Min 0.
- `InventoryItem.price`: Min 0.0, Decimal configuration.
- `Note.title`: Not blank, max 200 characters.
- `Note.content`: Not blank.

**Frontend Validation:**
- HTML5 and React state-based validation mimicking backend constraints prior to form submission.
- Submit buttons disabled while forms are invalid.

# 11. Error Handling Strategy
**Backend:**
Global Exception Handler (`@RestControllerAdvice`) maps exceptions to standardized JSON responses:
```json
{
  "timestamp": "2023-10-27T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed: 'quantity' must be greater than or equal to 0",
  "path": "/api/v1/inventory"
}
```
Standard mappings:
- `400 Bad Request` (Validation errors, malformed JSON)
- `404 Not Found` (Entity not found via ID)
- `500 Internal Server Error` (Unhandled exceptions)

**Frontend:**
- Axios interceptors catch global errors (e.g., network failures) to show toast notifications.
- Component-level catch blocks handle 400 validation errors by mapping them to local form error states.

# 12. Folder Structure

```text
demo.backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/demo/backend/
│   │   │       ├── config/       (CORS, Global Config)
│   │   │       ├── controller/   (REST Endpoints)
│   │   │       ├── dto/          (Request/Response models)
│   │   │       ├── entity/       (JPA Entities)
│   │   │       ├── exception/    (GlobalExceptionHandler, Custom Exceptions)
│   │   │       ├── repository/   (JPA Repositories)
│   │   │       └── service/      (Business Logic)
│   │   └── resources/
│   │       └── application.yml
│   └── pom.xml
```

```text
demo.frontend/
├── src/
│   ├── assets/       (Images, global styles)
│   ├── components/   (Reusable UI parts)
│   ├── hooks/        (Custom React hooks)
│   ├── layouts/      (Structural wrappers)
│   ├── pages/        (Routable views)
│   ├── services/     (Axios configurations and API calls)
│   ├── App.jsx       (Router config)
│   └── main.jsx      (Entry point)
├── package.json
└── vite.config.js
```

# 13. Environment Configuration

### Backend (`application.yml`)
```yaml
server:
  port: 50001
spring:
  datasource:
    url: jdbc:h2:mem:demodb # Or MySQL connection string
    username: sa
    password: 
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
cors:
  allowed-origins: "http://localhost:8088"
```

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:50001/api/v1
```

# 14. Local Development Setup
- **Prerequisites:** JDK 21, Maven 3.8+, Node.js v18+, optionally MySQL.
- Run `mvn clean install` inside `demo.backend` to resolve dependencies.
- Run `npm install` inside `demo.frontend` to resolve Node modules.

# 15. Build & Run Instructions
**To run the Backend:**
```bash
cd demo.backend
mvn spring-boot:run
```
*Ensure it binds to port 50001.*

**To run the Frontend:**
```bash
cd demo.frontend
npm run dev
```
*Ensure Vite exposes the application on port 8088 (`vite --port 8088` in package.json scripts).*

# 16. Acceptance Criteria
- [ ] Backend runs on port 50001.
- [ ] Frontend runs on port 8088.
- [ ] Frontend successfully communicates with backend via Axios (CORS properly configured).
- [ ] User can view, create, edit, and delete Inventory items from the frontend UI.
- [ ] User can view, create, edit, and delete Notes from the frontend UI.
- [ ] Input validation works and displays meaningful error messages on the UI.
- [ ] Folders strictly adhere to the defined separation.

# 17. AI-Assisted Development Workflow
**Spec-Driven Development:**
This document acts as the definitive source of truth. An AI assistant will consume this SDD to generate code autonomously without guessing functional requirements.

**Workflow Phases:**
1. **Scaffolding:** The AI uses the SDD to establish the core directories, dependencies (pom.xml, package.json), and environment configs.
2. **Backend Generation:** Iterative generation of Entities -> Repositories -> Services -> DTOs -> Controllers. The AI applies the strict exception handling strategy natively.
3. **Frontend Generation:** Generation of Axios services matching the API Contract, followed by Hooks, then presentational Components and Pages.
4. **Validation:** The human operator tests the specific acceptance criteria, utilizing the AI purely for localized bug fixes or CSS tweaks.

# 18. Suggested Incremental Implementation Plan
1. **Phase 1 (Foundation):** Initialize `demo.backend` via Spring Initializr and `demo.frontend` via Vite. Configure ports (50001, 8088) and basic CORS.
2. **Phase 2 (Backend Core):** Implement the `InventoryItem` and `Note` Entities and Repositories. Validate H2/MySQL table creation.
3. **Phase 3 (Backend API):** Implement Services and Controllers with global exception handling. Verify via Postman/cURL.
4. **Phase 4 (Frontend Data Layer):** Setup Axios instances and environment variables.
5. **Phase 5 (Frontend UI):** Build Dashboard, Notes, and Inventory pages. Wire them up to Axios hooks.
6. **Phase 6 (Polish):** Add UI loading states, form validations, error toasts, and modern styling.

# 19. Future Scalability Possibilities
While kept simple for demo purposes, this architecture sets a scalable foundation. Future growth paths include:
- Migrating from H2 to a managed PostgreSQL/MySQL cluster.
- Introducing a centralized state management library in the frontend (Redux/Zustand) if component hierarchies deepen.
- Adding Spring Security with JWT for authentication.
- Containerizing both modules via Docker to simulate cloud-native deployment.
